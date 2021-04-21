import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetUserPasswordUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokenRepository: IUsersTokensRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokenRepository.findByRefreshToken(
            token
        );

        if (!userToken) {
            throw new AppError("Invalid token");
        }

        if (
            this.dateProvider.compareItBefore(
                userToken.expires_date,
                this.dateProvider.dateNow()
            )
        ) {
            throw new AppError("Expired token");
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.usersTokenRepository.deleteTokenById(userToken.id);
    }
}

export { ResetUserPasswordUseCase };
