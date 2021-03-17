import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";
import { specificationRouter } from "./routes/specifications.routes";

const app = express();

app.use(express.json());
app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationRouter);

app.listen(3333, () => console.log("✔ Server started on port 3333!"));
