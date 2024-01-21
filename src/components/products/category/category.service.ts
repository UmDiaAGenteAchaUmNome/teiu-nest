import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageService } from 'src/components/language/language.service';
import { ProductCategory } from 'src/entities/product/product-category';
import { Filter } from 'src/helpers/filter/filter';
import { SaveCategoryValidation } from 'src/validations/save-category.validation';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

    private readonly logger = new Logger(CategoryService.name)
    private readonly relations: string[] = ["products", 'language', 'language.flagImage', 'products.details', 'products.details.image']

    constructor(
        @InjectRepository(ProductCategory)
        private readonly repository: Repository<ProductCategory>,
        private readonly filter: Filter,
        private readonly saveCategoryValidator: SaveCategoryValidation,
        private readonly languageService: LanguageService
    ) { }

    public async search(filters?: ProductCategory) {
        return await this.repository.find({
            where: this.filter.build(filters),
            relations: this.relations
        })
    }

    public async findById(id: number) {
        return await this.repository.findOne({
            where: { id },
            relations: this.relations
        })
    }

    public async save(category: ProductCategory) {
        await this.saveCategoryValidator.validate(category)
        return await this.repository.save(category)
    }

    public async update(id: number, category: ProductCategory) {
        await this.repository.update(id, category)
        return await this.findById(id)
    }

    public async delete(id: number) {
        await this.repository.delete(id)
    }

}
