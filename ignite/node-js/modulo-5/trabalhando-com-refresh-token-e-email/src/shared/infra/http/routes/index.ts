import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { passwordRoutes } from "./password.routes";
import { rentalsRouter } from "./rental.routes";
import { specificationRouter } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use(authenticateRoutes);
router.use("/categories", categoriesRoutes);
router.use("/cars", carRoutes);
router.use("/specifications", specificationRouter);
router.use("/users", usersRoutes);
router.use("/rentals", rentalsRouter);
router.use("/password", passwordRoutes);

export { router };
