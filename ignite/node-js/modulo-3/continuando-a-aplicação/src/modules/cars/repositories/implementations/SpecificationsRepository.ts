import { Specification } from "../../model/Specification";
import {
    ISpecificationsRepository,
    ICreateSpecificationDTO,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private specification: Specification[];

    constructor() {
        this.specification = [];
    }

    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });

        this.specification.push(specification);
    }

    list(): Specification[] {
        return this.specification;
    }

    findByName(name: string): Specification | undefined {
        const specification = this.specification.find(
            (specification) => specification.name === name
        );

        return specification;
    }
}

export { SpecificationsRepository };
