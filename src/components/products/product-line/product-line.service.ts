import { Filter } from '@apicore/nestjs/lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductLine } from 'src/entities/product/product-line';
import { Repository } from 'typeorm';

@Injectable()
export class ProductLineService {

    constructor(
        @InjectRepository(ProductLine)
        private readonly repository: Repository<ProductLine>,
        private readonly filter: Filter
    ) { }

    public async search(filters?: ProductLine) {
        return await this.repository.find({
            where: this.filter.build(filters),
            relations: ['products', 'image']
        })
    }

    public async findById(id: number) {
        return await this.repository.findOne({
            where: { id },
            relations: ['products', 'image']
        })
    }

    public async save(productLine: ProductLine) {
        return await this.repository.save(productLine)
    }

    public async delete(id: number) {
        await this.repository.delete(id)
    }

}
