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
        const rental = await createRentalUseCase.execute({
            user_id: "1",
            car_id: "1",
            expected_return_date: tomorrow,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create two rentals to the same user", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "1",
                car_id: "1",
                expected_return_date: tomorrow,
            });

            await createRentalUseCase.execute({
                user_id: "1",
                car_id: "2",
                expected_return_date: tomorrow,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create two rentals to the same car", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "1",
                car_id: "1",
                expected_return_date: tomorrow,
            });

            await createRentalUseCase.execute({
                user_id: "2",
                car_id: "1",
                expected_return_date: tomorrow,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new rental with invalid return time", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "1",
                car_id: "1",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
