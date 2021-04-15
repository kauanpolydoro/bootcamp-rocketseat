import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
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

        const cars = await listAvailableCarsUseCase.execute({});
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

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car 2",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car 3",
            description: "Car 3",
            daily_rate: 3,
            license_plate: "AAA-3333",
            fine_amount: 3,
            brand: "Brand 3",
            category_id: "category 3",
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Brand 3",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car 4",
            description: "Car 4",
            daily_rate: 4,
            license_plate: "AAA-4444",
            fine_amount: 4,
            brand: "Brand 4",
            category_id: "category 4",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "Brand 4",
        });

        expect(cars).toEqual([car]);
    });
});
