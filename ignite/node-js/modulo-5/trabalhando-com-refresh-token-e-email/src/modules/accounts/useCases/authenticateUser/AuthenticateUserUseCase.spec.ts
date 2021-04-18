import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-mermory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AppError } from "@shared/errors/AppError";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
        authenticateUserUseCase = new AuthenticateUserUseCase(
            userRepositoryInMemory
        );
    });
    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            name: "Teste",
            email: "user@teste.com",
            password: "123",
            driver_license: "123456",
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate nonexistent user", async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: "nonexisting@mail.com",
                password: "123",
            })
        ).rejects.toEqual(new AppError("Email or password incorret!"));
    });

    it("should not be able to authenticate with incorret password", async () => {
        const user: ICreateUserDTO = {
            name: "Teste",
            email: "user@teste.com",
            password: "123",
            driver_license: "123456",
        };

        await createUserUseCase.execute(user);

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: "wrong_password",
            })
        ).rejects.toEqual(new AppError("Email or password incorret!"));
    });
});
