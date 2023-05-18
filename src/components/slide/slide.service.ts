import { Filter } from '@apicore/nestjs/lib';
import { SlideDTO } from '@apicore/teiu/lib';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from "src/entities/image";
import { Slide } from 'src/entities/slide';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { SaveSlideValidation } from 'src/validations/save-slide.validation';
import { Repository } from 'typeorm';

@Injectable()
export class SlideService {

    private readonly logger = new Logger(SlideService.name)

    constructor(
        @InjectRepository(Slide)
        private readonly slideRepository: Repository<Slide>,
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,
        private readonly cloudinaryService: CloudinaryService,
        private readonly saveSlideValidation: SaveSlideValidation,
        private readonly filter: Filter
    ) { }

    public async listSlides(filters?: Slide) {
        return await this.slideRepository.find({
            relations: ['image', 'bgImage'],
            where: this.filter.build(filters)
        })
    }

    public async listActiveSlides() {
        return await this.slideRepository.find({
            relations: ['image', 'bgImage'],
            where: { active: true }
        })
    }

    public async findSlideById(slideId: number) {
        return await this.slideRepository.findOne({ where: { id: slideId }, relations: ['image', 'bgImage'] })
    }

    public async saveSlide(slide: SlideDTO) {
        await this.saveSlideValidation.validate(slide)

        slide = await this.saveCloudinaryImages(slide)
        return await this.slideRepository.save(slide)
    }

    public async deleteSlide(slideId: number) {
        await this.slideRepository.delete(slideId)
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
