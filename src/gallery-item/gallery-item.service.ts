import { Filter } from '@apicore/nestjs/lib';
import { GalleryItemDTO } from '@apicore/teiu/lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GalleryItem } from 'src/entities/gallery-item';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';

@Injectable()
export class GalleryItemService {

    constructor(
        @InjectRepository(GalleryItem)
        private readonly repository: Repository<GalleryItem>,
        private readonly filter: Filter,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    public async search(filters?: GalleryItem) {
        return await this.repository.find({ where: this.filter.build(filters), relations: ['image'] })
    }

    public async findById(id: number) {
        return await this.repository.findOne({ where: { id }, relations: ['image'] })
    }

    public async save(galleryItem: GalleryItem) {
        await this.uploadCloudinaryImages(galleryItem)
        return await this.repository.save(galleryItem)
    }

    public async delete(id: number) {
        return await this.repository.delete(id)
    }

    private async uploadCloudinaryImages(galleryItem: GalleryItemDTO) {
        if (galleryItem.image.base64src) {
            galleryItem.image = await this.cloudinaryService.uploadImageDto(
                galleryItem.image, `teiu/gallery`
            )
        }

        return galleryItem
    }
}
