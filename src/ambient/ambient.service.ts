import { Filter } from '@apicore/nestjs/lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ambient } from 'src/entities/ambient';
import { Repository } from 'typeorm';

@Injectable()
export class AmbientService {

    constructor(
        @InjectRepository(Ambient)
        private readonly repository: Repository<Ambient>,
        private readonly filter: Filter
    ) { }

    public async search(filters?: Ambient) {
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

    public async save(ambient: Ambient) {
        return await this.repository.save(ambient)
    }

    public async delete(id: number) {
        await this.repository.delete(id)
    }

}
