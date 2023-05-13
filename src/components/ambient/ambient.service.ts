import { Filter } from '@apicore/nestjs/lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAmbient } from 'src/entities/product/product-ambient';
import { Repository } from 'typeorm';

@Injectable()
export class AmbientService {

    private readonly relations: string[] = ['products', 'products.details', 'products.details.image']

    constructor(
        @InjectRepository(ProductAmbient)
        private readonly repository: Repository<ProductAmbient>,
        private readonly filter: Filter
    ) { }

    public async search(filters?: ProductAmbient) {
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

    public async save(ambient: ProductAmbient) {
        return await this.repository.save(ambient)
    }

    public async delete(id: number) {
        await this.repository.delete(id)
    }

}
