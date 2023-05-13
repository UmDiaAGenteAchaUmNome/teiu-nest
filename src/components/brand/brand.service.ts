import { Filter } from '@apicore/nestjs/lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductBrand } from 'src/entities/product/product-brand';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {

    constructor(
        @InjectRepository(ProductBrand)
        private readonly repository: Repository<ProductBrand>,
        private readonly filter: Filter
    ) { }

    public async search(filters?: ProductBrand) {
        return await this.repository.find({
            where: this.filter.build(filters),
            relations: ['products', 'products.details', 'products.details.image']
        })
    }

    public async findById(id: number) {
        return await this.repository.findOne({
            where: { id },
            relations: ['products', 'products.details', 'products.details.image']
        })
    }

    public async save(brand: ProductBrand) {
        return await this.repository.save(brand)
    }

    public async delete(id: number) {
        return await this.repository.delete(id)
    }

}
