import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute(file: any): void {
        console.log(file);
    }
}

export { ImportCategoryUseCase };
