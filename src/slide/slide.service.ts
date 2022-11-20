import { Slide } from '@apicore/teiu/lib/typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryBannerHelper } from 'src/helpers/cloudinary/CloudinarySlideHelper';
import { Repository } from 'typeorm';

@Injectable()
export class SlideService {

    constructor(
        @InjectRepository(Slide)
        private readonly slideRepository: Repository<Slide>,

        private readonly cloudinarySlideHelper: CloudinaryBannerHelper
    ) { }

    public async listSlides() {
        return await this.slideRepository.find()
    }

    public async findSlideById(slideId: number) {
        return await this.slideRepository.findOneBy({ id: slideId })
    }

    public async createSlide(slide: Slide) {
        slide = await this.cloudinarySlideHelper.uploadBannerImages(slide)
        return await this.slideRepository.save(slide)
    }

    public async updateSlide(slideId: number, slide: Slide) {
        slide = await this.cloudinarySlideHelper.uploadBannerImages(slide)
        await this.slideRepository.update(slideId, slide)
        return await this.findSlideById(slideId)
    }

    public async deleteSlide(slideId: number) {
        await this.slideRepository.delete(slideId)
    }
}
