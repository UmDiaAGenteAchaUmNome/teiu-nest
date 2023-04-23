import { Filter } from '@apicore/nestjs/lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAmbient } from 'src/entities/product/product-ambient';
import { Repository } from 'typeorm';

@Injectable()
export class AmbientService {

    constructor(
        @InjectRepository(ProductAmbient)
        private readonly repository: Repository<ProductAmbient>,
        private readonly filter: Filter
    ) { }

    public async search(filters?: ProductAmbient) {
        return await this.repository.find({
            where: this.filter.build(filters),
            relations: ['products']
        })
    }

    public async findById(id: number) {
        return await this.repository.findOne({
            where: { id },
            relations: ['products']
        })
    }

    public async save(ambient: ProductAmbient) {
        return await this.repository.save(ambient)
    }

    public async delete(id: number) {
        await this.repository.delete(id)
    }

}
