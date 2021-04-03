import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

const createCarController = new CreateCarController();

const carRoutes = Router();

carRoutes.post("/", createCarController.handle);

export { carRoutes };
