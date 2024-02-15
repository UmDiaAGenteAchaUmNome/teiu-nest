import { Filter } from '@apidevteam/core-nestjs/lib/helpers/index';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductBrand } from 'src/entities/product/product-brand';
import { SaveBrandValidation } from 'src/validations/save-brand.validation';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {

    private readonly relations: string[] = ['language', 'language.flagImage', 'products', 'products.details', 'products.details.image']

    constructor(
        @InjectRepository(ProductBrand)
        private readonly repository: Repository<ProductBrand>,
        private readonly filter: Filter,
        private readonly saveBrandValidation: SaveBrandValidation
    ) { }

    public async search(filters?: ProductBrand) {
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

    public async save(brand: ProductBrand) {
        await this.saveBrandValidation.validate(brand)

        return await this.repository.save(brand)
    }

    public async delete(id: number) {
        return await this.repository.delete(id)
    }

}
