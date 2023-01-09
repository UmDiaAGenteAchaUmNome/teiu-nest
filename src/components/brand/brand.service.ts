import { Filter } from '@apicore/nestjs/lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/entities/brand';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {

    constructor(
        @InjectRepository(Brand)
        private readonly repository: Repository<Brand>,
        private readonly filter: Filter
    ) { }

    public async search(filters?: Brand) {
        return await this.repository.find({
            where: this.filter.build(filters),
            relations: ['products', 'products.images']
        })
    }

    public async findById(id: number) {
        return await this.repository.findOne({
            where: { id },
            relations: ['products', 'products.images']
        })
    }

    public async save(brand: Brand) {
        return await this.repository.save(brand)
    }

    public async delete(id: number) {
        return await this.repository.delete(id)
    }

}
