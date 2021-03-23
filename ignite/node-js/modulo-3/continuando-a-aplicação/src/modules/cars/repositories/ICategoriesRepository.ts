import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    create(data: ICreateCategoryDTO): void;
    findByName(name: string): Category;
    list(): Category[];
}

export { ICategoriesRepository, ICreateCategoryDTO };
