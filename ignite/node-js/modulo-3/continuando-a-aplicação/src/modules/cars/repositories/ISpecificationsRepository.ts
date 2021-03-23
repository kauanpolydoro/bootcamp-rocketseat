import { Specification } from "../entities/Specification";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    create(data: ICreateSpecificationDTO): void;
    findByName(name: string): Specification;
    // list(): Specification[];
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
