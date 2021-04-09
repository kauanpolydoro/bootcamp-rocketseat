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
    }: IRequest): Promise<void> {
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
    }
}

export { CreateRentalUseCase };
