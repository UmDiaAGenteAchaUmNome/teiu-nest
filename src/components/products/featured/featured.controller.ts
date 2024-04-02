import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Featured } from 'src/entities/featured';
import { JwtGuard } from 'src/guards/jwt.guard';
import { FeaturedService } from './featured.service';

@Controller('featured')
@ApiTags('Featured Products')
export class FeaturedController {

    constructor(
        private readonly service: FeaturedService
    ) { }

    @Get()
    public async searchFeatured(@Query() filters?: Featured) {
        return await this.service.search(filters)
    }

    @Get(':id')
    public async findFeaturedById(@Param('id') id: number) {
        return await this.service.findById(id)
    }

    @Post()
    @UseGuards(JwtGuard)
    public async saveFeatured(@Body() featuredProduct) {
        return await this.service.save(featuredProduct)
    }

    @Put(":id")
    @UseGuards(JwtGuard)
    public async updateFeatured(@Param("id") id: number, @Body() featuredProduct) {
        return await this.service.update(id, featuredProduct)
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    public async deleteFeatured(@Param('id') id: number) {
        return await this.service.delete(id)
    }

}
