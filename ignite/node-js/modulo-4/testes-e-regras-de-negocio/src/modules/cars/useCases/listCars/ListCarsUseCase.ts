import { inject, injectable } from "tsyringe";

import { IListCarDTO } from "@modules/cars/dtos/IListCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

@injectable()
class ListCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({ category_id, brand, name }: IListCarDTO): Promise<Car[]> {
        const cars = this.carsRepository.findAllAvailable({
            category_id,
            brand,
            name,
        });

        return cars;
    }
}

export { ListCarsUseCase };
