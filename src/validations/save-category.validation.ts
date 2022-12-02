import { CategoryDTO } from "@apicore/teiu/lib";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/category";
import { Repository } from "typeorm";

@Injectable()
export class SaveCategoryValidation {

    category: Category | CategoryDTO

    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) { }

    public async validate(category: Category | CategoryDTO) {
        this.category = category

        await this.validateTitle()
    }

    private async validateTitle() {
        if (!this.category.title)
            throw new BadRequestException('Título da categoria não pode ser nulo')

        const matchingCategories = await this.categoryRepository.findBy({ title: this.category.title })

        if (matchingCategories.length > 0)
            throw new BadRequestException('Não é possível cadastrar duas categorias com o mesmo nome')
    }
}