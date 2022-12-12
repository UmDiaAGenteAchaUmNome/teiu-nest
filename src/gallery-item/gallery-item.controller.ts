import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { GalleryItem } from 'src/entities/gallery-item';
import { JwtGuard } from 'src/guards/jwt.guard';
import { GalleryItemService } from './gallery-item.service';

@Controller('gallery-item')
export class GalleryItemController {

    constructor(private readonly galleryItemService: GalleryItemService) { }

    @Get()
    public async searchGalleryItems(@Query() filters?: GalleryItem) {
        return await this.galleryItemService.search(filters)
    }

    @Get(':id')
    public async findGalleryItemById(@Param('id') galleryItemId: number) {
        return await this.galleryItemService.findById(galleryItemId)
    }

    @Post()
    @UseGuards(JwtGuard)
    public async createGalleryItem(@Body() galleryItem: GalleryItem) {
        return await this.galleryItemService.save(galleryItem)
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    public async updateGalleryItem(@Param('id') galleryItemId: number, @Body() galleryItem) {
        return await this.galleryItemService.save(galleryItem)
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    public async deleteGalleryItem(@Param('id') galleryItemId: number) {
        await this.galleryItemService.delete(galleryItemId)
    }

}
