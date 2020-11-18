import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepositories';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;
    const usersRepository = new UsersRepository();

    const authenticateUserService = new AuthenticateUserService(
        usersRepository,
    );

    const { user, token } = await authenticateUserService.excute({
        email,
        password,
    });

    delete user.password;

    return response.json({ user, token });
});

export default sessionsRouter;
