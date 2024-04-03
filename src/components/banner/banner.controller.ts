import { BannerDTO } from '@apidevteam/core-teiu/lib';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/guards/jwt.guard';
import { BannerService } from './banner.service';

@ApiTags('Banner')
@Controller('banner')
export class BannerController {

    constructor(
        private readonly bannerService: BannerService
    ) { }

    @Get()
    public async listBanners(@Query() filters?: BannerDTO) {
        return await this.bannerService.search(filters)
    }

    @Get(':id')
    public async findBannerById(@Param('id') bannerId: number) {
        return await this.bannerService.findById(bannerId)
    }

    @Post()
    @UseGuards(JwtGuard)
    public async saveSlide(@Body() banner: BannerDTO) {
        return await this.bannerService.save(banner)
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    public async updateSlide(@Param('id') bannerId: number, @Body() banner: BannerDTO) {
        banner.id = bannerId
        return await this.bannerService.save(banner)
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    public async deleteSlide(@Param('id') bannerId) {
        return await this.bannerService.delete(bannerId)
    }

}
