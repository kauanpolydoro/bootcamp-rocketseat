import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/infra/typeorm/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc);

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalUseCase {
    constructor(private rentalsRepository: IRentalsRepository) {}

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

        const expectedReturnDataFormat = dayjs(expected_return_date)
            .utc()
            .local()
            .format();

        const dateNow = dayjs().utc().local().format();

        const compare = dayjs(expectedReturnDataFormat).diff(dateNow, "hours");

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

        return rental;
    }
}

export { CreateRentalUseCase };
