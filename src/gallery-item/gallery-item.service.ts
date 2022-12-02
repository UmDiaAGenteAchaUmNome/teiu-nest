import { ServiceContract } from '@apicore/teiu/lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Filter } from 'src/entities/core/filter';
import { GalleryItem } from 'src/entities/gallery-item';
import { Repository } from 'typeorm';

@Injectable()
export class GalleryItemService implements ServiceContract {

    constructor(
        @InjectRepository(GalleryItem)
        private readonly repository: Repository<GalleryItem>,
        private readonly filter: Filter
    ) { }

    public async search(filters?: GalleryItem) {
        return await this.repository.find({ where: this.filter.build(filters) })
    }

    public async findById(id: number) {
        return await this.repository.findOne({ where: { id } })
    }

    public async create(galleryItem: GalleryItem) {
        return await this.repository.save(galleryItem)
    }

    public async update(id: number, galleryItem: GalleryItem) {
        return await this.repository.update(id, galleryItem)
    }

    public async delete(id: number) {
        return await this.repository.delete(id)
    }
}
