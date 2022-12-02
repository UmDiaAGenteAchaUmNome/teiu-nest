import { TipDTO } from '@apicore/teiu/lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Filter } from 'src/entities/core/filter';
import { Tip } from 'src/entities/tip';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';

@Injectable()
export class TipService {

    constructor(
        @InjectRepository(Tip)
        private readonly repository: Repository<Tip>,
        private readonly filter: Filter,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    public async search(filters?: Tip) {
        return await this.repository.find({ where: this.filter.build(filters), relations: ["image", "user"] })
    }

    public async findById(id: number) {
        return await this.repository.findOne({ where: { id }, relations: ["image", "user"] })
    }

    public async save(tip: TipDTO) {
        await this.uploadCloudinaryImages(tip)
        return await this.repository.save(tip)
    }

    public async delete(id: number) {
        await this.repository.delete(id)
    }

    private async uploadCloudinaryImages(tip: TipDTO) {
        if (tip.image.base64src) {
            tip.image.link = await this.cloudinaryService.uploadImage(
                tip.image,
                `teiu/tips/${tip.image.title}`
            )

            return tip
        }

        return tip
    }
}
