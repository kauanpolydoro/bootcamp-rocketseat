import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory
        );
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "123123123",
            expected_return_date: new Date(),
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create two rentals to the same user", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "1",
                car_id: "1",
                expected_return_date: new Date(),
            });

            await createRentalUseCase.execute({
                user_id: "1",
                car_id: "2",
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create two rentals to the same car", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "1",
                car_id: "1",
                expected_return_date: new Date(),
            });

            await createRentalUseCase.execute({
                user_id: "2",
                car_id: "1",
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
