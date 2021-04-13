import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { files } = request;

        const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

        await importCategoryUseCase.execute(files);

        return response.status(201).send();
    }
}

export { ImportCategoryController };
