import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

const rentalsRouter = Router();

rentalsRouter.post("/", ensureAuthenticated, createRentalController.handle);
rentalsRouter.post(
    "/devolution/:id",
    ensureAuthenticated,
    devolutionRentalController.handle
);

rentalsRouter.get(
    "/user",
    ensureAuthenticated,
    listRentalsByUserController.handle
);

export { rentalsRouter };
