import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Banner } from 'src/entities/typeorm/banner';
import { BannerService } from './banner.service';

@Controller('banner')
export class BannerController {

    constructor(
        private readonly bannerService: BannerService
    ) { }

    @Get()
    public async listBanners(): Promise<Banner[]> {
        return await this.bannerService.listBanners()
    }

    @Get(':id')
    public async findBannerById(@Param('id') bannerId: number): Promise<Banner> {
        return await this.bannerService.findBannerById(bannerId)
    }

    @Post()
    // @UseGuards(JwtGuard)
    public async createBanner(@Body() banner: Banner): Promise<Banner> {
        return await this.bannerService.createBanner(banner)
    }

    @Put(':id')
    // @UseGuards(JwtGuard)
    public async updateBanner(@Param('id') bannerId: number, @Body() banner: Banner): Promise<Banner> {
        return await this.bannerService.updateBanner(bannerId, banner)
    }

    @Delete(':id')
    // @UseGuards(JwtGuard)
    public async deleteBanner(@Param('id') bannerId: number): Promise<void> {
        await this.bannerService.deleteBanner(bannerId)
    }


}
