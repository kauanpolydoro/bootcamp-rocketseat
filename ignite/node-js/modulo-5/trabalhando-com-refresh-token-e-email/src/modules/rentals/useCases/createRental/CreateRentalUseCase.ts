import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const minimumRentalHour = 24;

        const unavailableCar = await this.rentalsRepository.findOpenRentalByCar(
            car_id
        );

        if (unavailableCar) {
            throw new AppError("Car is unavailable");
        }

        const openRentalToUser = await this.rentalsRepository.findOpenRentalByUser(
            user_id
        );

        if (openRentalToUser) {
            throw new AppError("There's a rental in progress for this user");
        }

        const compare = this.dateProvider.compareInHours(
            this.dateProvider.dateNow(),
            expected_return_date
        );

        if (compare < minimumRentalHour) {
            throw new AppError(
                `Rental must have ${minimumRentalHour} hours or more`
            );
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        await this.carsRepository.updateAvailability(car_id, false);

        return rental;
    }
}

export { CreateRentalUseCase };
