import { Filter } from '@apicore/nestjs/lib';
import { HighlightDTO } from '@apicore/teiu/lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Highlight } from 'src/entities/highlight';
import { Image } from 'src/entities/image';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';

@Injectable()
export class HighlightService {

    constructor(
        @InjectRepository(Highlight)
        private readonly repository: Repository<Highlight>,
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,
        private readonly filter: Filter,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    public async search(filters?: Highlight) {
        return await this.repository.find({
            where: this.filter.build(filters),
            relations: ['image']
        })
    }

    public async findById(id: number) {
        return await this.repository.findOne({
            where: { id },
            relations: ['image']
        })
    }

    public async save(highlight: HighlightDTO) {
        return await this.repository.save(highlight)
    }

    public async delete(id: number) {
        return await this.repository.delete(id)
    }

    private async saveImage(highlight: HighlightDTO) {
        if (highlight.image.link && !highlight.image.base64src) {
            highlight.image = await this.cloudinaryService.uploadImageDto(
                highlight.image,
                `teiu/destaques`
            )
            await this.imageRepository.save(highlight.image)
        }
    }

}
