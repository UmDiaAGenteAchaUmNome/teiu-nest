import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category';
import { Filter } from 'src/entities/core/filter';
import { SaveCategoryValidation } from 'src/validations/save-category.validation';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private readonly repository: Repository<Category>,
        private readonly filter: Filter,
        private readonly saveCategoryValidator: SaveCategoryValidation
    ) { }

    public async search(filters?: Category) {
        return await this.repository.find({
            where: this.filter.build(filters),
            relations: ["products", "products.images"]
        })
    }

    public async findById(id: number) {
        return await this.repository.findOne({
            where: { id },
            relations: ["products", "products.images"]
        })
    }

    public async save(category: Category) {
        await this.saveCategoryValidator.validate(category)
        return await this.repository.save(category)
    }

    public async update(id: number, category: Category) {
        await this.repository.update(id, category)
        return await this.findById(id)
    }

    public async delete(id: number) {
        await this.repository.delete(id)
    }

}
