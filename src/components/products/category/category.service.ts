import { Filter } from '@apicore/nestjs/lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from 'src/entities/product/product-category';
import { SaveCategoryValidation } from 'src/validations/save-category.validation';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(ProductCategory)
        private readonly repository: Repository<ProductCategory>,
        private readonly filter: Filter,
        private readonly saveCategoryValidator: SaveCategoryValidation
    ) { }

    public async search(filters?: ProductCategory) {
        return await this.repository.find({
            where: this.filter.build(filters),
            relations: ["products", 'products.details', 'products.details.image']
        })
    }

    public async findById(id: number) {
        return await this.repository.findOne({
            where: { id },
            relations: ["products", 'products.details', 'products.details.image']
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
