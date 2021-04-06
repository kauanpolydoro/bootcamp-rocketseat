import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

const carRoutes = Router();

carRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);

carRoutes.get("/available", listAvailableCarsController.handle);
carRoutes.post(
    "/specifications/:id",
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle
);

export { carRoutes };
