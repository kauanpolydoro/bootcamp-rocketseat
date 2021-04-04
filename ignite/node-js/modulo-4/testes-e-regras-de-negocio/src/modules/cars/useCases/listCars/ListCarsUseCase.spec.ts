import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car 1",
            description: "Car 1",
            daily_rate: 1,
            license_plate: "AAA-1111",
            fine_amount: 1,
            brand: "Brand 1",
            category_id: "category 1",
        });

        const cars = await listCarsUseCase.execute({});
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car 2",
            description: "Car 2",
            daily_rate: 2,
            license_plate: "AAA-2222",
            fine_amount: 2,
            brand: "Brand 2",
            category_id: "category 2",
        });

        const cars = await listCarsUseCase.execute({
            brand: "Brand 2",
            category_id: "category 2",
            name: "Car 2",
        });

        expect(cars).toEqual([car]);
    });
});
