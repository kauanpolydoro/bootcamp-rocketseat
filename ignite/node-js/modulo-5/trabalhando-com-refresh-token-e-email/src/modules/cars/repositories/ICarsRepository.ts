import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IListAvailableCarsDTO } from "../dtos/IListAvailableCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    findAllAvailable(data: IListAvailableCarsDTO): Promise<Car[]>;
    findById(id: string): Promise<Car>;
    updateAvailability(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
