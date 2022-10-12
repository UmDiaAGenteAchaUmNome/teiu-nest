import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from 'src/entities/typeorm/banner';
import { CloudinaryBannerHelper } from 'src/helpers/cloudinary/CloudinaryBannerHelper';
import { Repository } from 'typeorm';

@Injectable()
export class BannerService {

    constructor(
        @InjectRepository(Banner)
        private readonly bannerRepository: Repository<Banner>,

        private readonly cloudinaryBannerHelper: CloudinaryBannerHelper
    ) {}

    public async listBanners(): Promise<Banner[]> {
        return await this.bannerRepository.find()
    }

    public async findBannerById(bannerId: number): Promise<Banner> {
        return await this.bannerRepository.findOneBy({id: bannerId})
    }

    public async createBanner(banner: Banner): Promise<Banner> {
        banner = await this.cloudinaryBannerHelper.uploadBannerImages(banner)
        return await this.bannerRepository.save(banner)
    }

    public async updateBanner(bannerId: number, banner: Banner): Promise<Banner> {
        banner = await this.cloudinaryBannerHelper.uploadBannerImages(banner)
        await this.bannerRepository.update(bannerId, banner)
        return await this.findBannerById(bannerId)
    }

    public async deleteBanner(bannerId: number): Promise<void> {
        await this.bannerRepository.delete(bannerId)
    }
}
