import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-mermory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
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

    it("should not be able to authenticate nonexistent user", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "nonexisting@mail.com",
                password: "123",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate with incorret password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "Teste",
                email: "user@teste.com",
                password: "123",
                driver_license: "123456",
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "wrong_password",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
