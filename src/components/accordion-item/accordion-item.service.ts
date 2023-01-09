import { Filter } from '@apicore/nestjs/lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccordionItem } from 'src/entities/accordion-item';
import { Repository } from 'typeorm';

@Injectable()
export class AccordionItemService {

    constructor(
        @InjectRepository(AccordionItem)
        private readonly repository: Repository<AccordionItem>,
        private readonly filter: Filter
    ) { }

    public async search(filters?: AccordionItem) {
        return await this.repository.find({ where: this.filter.build(filters) })
    }

    public async findById(id: number) {
        return await this.repository.findOne({ where: { id } })
    }

    public async save(accordionItem: AccordionItem) {
        return await this.repository.save(accordionItem)
    }

    public async update(id: number, accordionItem: AccordionItem) {
        await this.repository.update(id, accordionItem)
        return await this.findById(id)
    }

    public async delete(id: number) {
        await this.repository.delete(id)
    }
}
