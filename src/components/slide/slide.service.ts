import { Filter } from '@apidevteam/core-nestjs/lib/helpers/index';
import { SlideDTO } from '@apidevteam/core-teiu/lib';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from "src/entities/image";
import { Slide } from 'src/entities/slide';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { SaveSlideValidation } from 'src/validations/save-slide.validation';
import { Repository } from 'typeorm';
import { ImageService } from '../image/image.service';

@Injectable()
export class SlideService {

    private readonly logger = new Logger(SlideService.name)

    private readonly relations: string[] = ['language', 'language.flagImage', 'image', 'bgImage']

    constructor(
        @InjectRepository(Slide)
        private readonly slideRepository: Repository<Slide>,
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,
        private readonly cloudinaryService: CloudinaryService,
        private readonly saveSlideValidation: SaveSlideValidation,
        private readonly filter: Filter,
        private readonly imageService: ImageService
    ) { }

    public async listSlides(filters?: Slide) {
        return await this.slideRepository.find({
            relations: this.relations,
            where: this.filter.build(filters)
        })
    }

    public async findSlideById(slideId: number) {
        return await this.slideRepository.findOne({ where: { id: slideId }, relations: this.relations })
    }

    public async saveSlide(slide: SlideDTO) {
        await this.saveSlideValidation.validate(slide)

        slide = await this.saveCloudinaryImages(slide)
        return await this.slideRepository.save(slide)
    }

    public async deleteSlide(slideId: number) {
        const slide: Slide = await this.findSlideById(slideId)
        const slideImages = [slide.image, slide.bgImage]

        if (!slide)
            throw new BadRequestException("Produto inválido")

        await this.slideRepository.delete(slideId)

        await this.imageService.deleteImage(slide.image)
        await this.imageService.deleteImage(slide.bgImage)

    }

    private async saveCloudinaryImages(slide: SlideDTO) {
        if (slide.image.base64src) {
            slide.image.title = slide.title.concat(`_${slide.image.title}`)
            slide.image = await this.cloudinaryService.uploadImageDto(slide.image, `/slides/${slide.title}`)
            await this.imageRepository.save(slide.image)
        }

        if (slide.bgImage.base64src) {
            slide.bgImage.title = slide.title.concat(`_${slide.bgImage.title}`)
            slide.bgImage = await this.cloudinaryService.uploadImageDto(slide.bgImage, `/slides/${slide.title}`)
            await this.imageRepository.save(slide.bgImage)
        }

        return slide
    }
}
