import { Category } from "../infra/typeorm/entities/Category";

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    create(data: ICreateCategoryDTO): Promise<Category>;
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
