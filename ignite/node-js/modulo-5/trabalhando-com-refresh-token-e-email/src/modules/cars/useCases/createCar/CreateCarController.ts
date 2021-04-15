import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            brand,
            category_id,
            license_plate,
            fine_amount,
            daily_rate,
            description,
        } = request.body;

        const createCarUseCase = container.resolve(CreateCarUseCase);

        const car = await createCarUseCase.execute({
            name,
            brand,
            category_id,
            license_plate,
            fine_amount,
            daily_rate,
            description,
        });

        return response.status(201).json(car);
    }
}

export { CreateCarController };
