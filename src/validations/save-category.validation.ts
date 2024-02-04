import { ProductCategoryDTO } from "@apidevteam/core-teiu/lib";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductCategory } from "src/entities/product/product-category";
import { Repository } from "typeorm";

@Injectable()
export class SaveCategoryValidation {

    category: ProductCategory | ProductCategoryDTO

    constructor(
        @InjectRepository(ProductCategory)
        private readonly categoryRepository: Repository<ProductCategory>
    ) { }

    public async validate(category: ProductCategory | ProductCategoryDTO) {
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