import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
    const tomorrow = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory
        );
    });

    it("should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car name",
            description: "Car Description",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });

        const rental = await createRentalUseCase.execute({
            user_id: "1",
            car_id: car.id,
            expected_return_date: tomorrow,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create two rentals to the same user", async () => {
        const rental = await rentalsRepositoryInMemory.create({
            car_id: "1",
            user_id: "1",
            expected_return_date: tomorrow,
        });

        await expect(
            createRentalUseCase.execute({
                user_id: rental.user_id,
                car_id: "2",
                expected_return_date: tomorrow,
            })
        ).rejects.toEqual(
            new AppError("There's a rental in progress for this user")
        );
    });

    it("should not be able to create two rentals to the same car", async () => {
        const rental = await rentalsRepositoryInMemory.create({
            user_id: "1",
            car_id: "1",
            expected_return_date: tomorrow,
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "2",
                car_id: rental.car_id,
                expected_return_date: tomorrow,
            })
        ).rejects.toEqual(new AppError("Car is unavailable"));
    });

    it("should not be able to create a new rental with invalid return time", async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: "1",
                car_id: "1",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError("Rental must have 24 hours or more"));
    });
});
