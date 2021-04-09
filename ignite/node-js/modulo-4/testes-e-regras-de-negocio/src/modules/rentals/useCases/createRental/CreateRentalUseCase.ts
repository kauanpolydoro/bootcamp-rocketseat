import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/infra/typeorm/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

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

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalUseCase };
