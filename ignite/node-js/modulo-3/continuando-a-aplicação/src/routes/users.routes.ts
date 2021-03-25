import { Router } from "express";

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";

const createUserController = new CreateUserController();

const usersRoutes = Router();

usersRoutes.post("/", createUserController.handle);

export { usersRoutes };
