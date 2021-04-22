import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-mermory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-mermory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { FakeMailProvider } from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: FakeMailProvider;

describe("Send Forgot Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProvider = new FakeMailProvider();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "1",
            email: "test1@test.com",
            name: "test1",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute("test1@test.com");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send a forgot password mail to a nonexistent user", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("nonexistent@user.com")
        ).rejects.toEqual(new AppError("User does not exists"));
    });

    it("should be able to create an users token", async () => {
        const generateTokenMail = spyOn(
            usersTokensRepositoryInMemory,
            "create"
        );

        await usersRepositoryInMemory.create({
            driver_license: "2",
            email: "test2@test.com",
            name: "test2",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute("test2@test.com");

        expect(generateTokenMail).toHaveBeenCalled();
    });
});
