import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";

import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    userTokens: UserTokens[] = [];

    async create({
        user_id,
        refresh_token,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = new UserTokens();

        Object.assign(userToken, user_id, refresh_token, expires_date);

        this.userTokens.push(userToken);

        return userToken;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens> {
        const userToken = this.userTokens.find(
            (userToken) =>
                userToken.user_id === user_id &&
                userToken.refresh_token === refresh_token
        );

        return userToken;
    }
    async deleteTokenById(id: string): Promise<void> {
        const index = this.userTokens.findIndex(
            (userToken) => userToken.id === id
        );

        this.userTokens.splice(index);
    }
    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userToken = this.userTokens.find(
            (userToken) => userToken.refresh_token === refresh_token
        );

        return userToken;
    }
}

export { UsersTokensRepositoryInMemory };
