import { Filter, ServiceContract, Tip } from '@apicore/teiu/lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TipService implements ServiceContract {

    constructor(
        @InjectRepository(Tip)
        private readonly repository: Repository<Tip>,
        private readonly filter: Filter
    ) { }

    public async search(filters?: Tip) {
        return await this.repository.find({ where: this.filter.build(filters) })
    }

    public async findById(id: number) {
        return await this.repository.findOne({ where: { id } })
    }

    public async create(tip: Tip) {
        return await this.repository.save(tip)
    }

    public async update(id: number, tip: Tip) {
        await this.repository.update(id, tip)
        return await this.findById(id)
    }

    public async delete(id: number) {
        await this.repository.delete(id)
    }
}
