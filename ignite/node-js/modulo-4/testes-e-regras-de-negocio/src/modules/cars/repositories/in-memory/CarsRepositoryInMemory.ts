import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IListCarDTO } from "@modules/cars/dtos/IListCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = this.cars.find(
            (car) => car.license_plate === license_plate
        );

        return car;
    }

    async findAllAvailable({
        category_id,
        brand,
        name,
    }: IListCarDTO): Promise<Car[]> {
        const availableCars = this.cars.filter((car) => {
            if (
                car.available === true &&
                ((category_id && car.category_id === category_id) ||
                    (brand && car.brand === brand) ||
                    (name && car.name === name))
            ) {
                return true;
            }
            return null;
        });

        return availableCars;
    }
}

export { CarsRepositoryInMemory };
