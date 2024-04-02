import { Filter } from '@apidevteam/core-nestjs/lib';
import { BannerDTO } from '@apidevteam/core-teiu/lib';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from 'src/entities/banner';
import { Image } from 'src/entities/image';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ImageService } from '../image/image.service';

@Injectable()
export class BannerService {

    private readonly relations: string[] = ['image', 'language']

    constructor(
        @InjectRepository(Banner)
        private readonly repository: Repository<Banner>,

        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,
        private readonly filter: Filter,
        private readonly cloudinaryService: CloudinaryService,
        private readonly imageService: ImageService
    ) { }

    public async search(filters?: Banner) {
        return await this.repository.find({ where: this.filter.build(filters), relations: this.relations })
    }

    public async findById(id: number) {
        return await this.repository.findOne({ where: { id: id }, relations: this.relations })
    }

    public async save(banner: BannerDTO) {
        banner = await this.saveCloudinaryImages(banner)
        return await this.repository.save(banner)
    }

    public async delete(bannerId: number) {
        const banner: Banner = await this.findById(bannerId)

        if (!banner)
            throw new BadRequestException("Banner Inválido")

        await this.repository.delete(bannerId)

        await this.imageService.deleteImage(banner.image)
    }

    private async saveCloudinaryImages(banner: BannerDTO) {
        const bannerId = uuid()

        if (banner.image.base64src) {
            banner.image.title = `${banner.image.title}_${bannerId}`
            banner.image = await this.cloudinaryService.uploadImageDto(banner.image, `/banners/${banner.title}`)

            await this.imageRepository.save(banner.image)
        }

        return banner
    }

}