import { inject, injectable } from "tsyringe";

import { ICreateCarSpecificationDTO } from "@modules/cars/dtos/ICreateCarSpecificationDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,

        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute({
        car_id,
        specifications_id,
    }: ICreateCarSpecificationDTO): Promise<Car> {
        const car = await this.carsRepository.findById(car_id);

        if (!car) {
            throw new AppError("Car does not exists!");
        }

        const specifications = await this.specificationsRepository.findByIds(
            specifications_id
        );

        car.specifications = specifications;

        await this.carsRepository.create(car);

        return car;
    }
}

export { CreateCarSpecificationUseCase };
