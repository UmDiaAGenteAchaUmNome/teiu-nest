import { GalleryItem } from '@apicore/teiu/lib';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
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
    public async createGalleryItem(@Body() galleryItem: GalleryItem) {
        return await this.galleryItemService.create(galleryItem)
    }

    @Put(':id')
    public async updateGalleryItem(@Param('id') galleryItemId: number, @Body() galleryItem) {
        return await this.galleryItemService.update(galleryItemId, galleryItem)
    }

    @Delete(':id')
    public async deleteGalleryItem(@Param('id') galleryItemId: number) {
        await this.galleryItemService.delete(galleryItemId)
    }

}
