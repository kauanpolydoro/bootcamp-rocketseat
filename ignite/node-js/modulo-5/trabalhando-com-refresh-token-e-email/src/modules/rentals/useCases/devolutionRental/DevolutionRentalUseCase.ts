import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({ id, user_id }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id);
        const minimum_daily = 1;

        if (!rental) {
            throw new AppError("Rental does not exists!");
        }

        const car = await this.carsRepository.findById(rental.car_id);

        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            rental.expected_return_date
        );

        daily = Math.max(minimum_daily, daily);

        const delay = this.dateProvider.compareInDays(
            this.dateProvider.dateNow(),
            rental.expected_return_date
        );

        let total: number;

        if (delay > 0) {
            total = delay * car.fine_amount;
        }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailability(car.id, true);

        return rental;
    }
}

export { DevolutionRentalUseCase };
