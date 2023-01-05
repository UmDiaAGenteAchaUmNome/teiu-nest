import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Query } from '@nestjs/common/decorators';
import { Brand } from 'src/entities/brand';
import { BrandService } from './brand.service';

@Controller('brand')
export class BrandController {

    constructor(
        private readonly service: BrandService
    ) { }

    @Get()
    public async searchBrands(@Query() filters?: Brand) {
        return await this.service.search(filters)
    }

    @Get(':id')
    public async findBrandById(@Param('id') id: number) {
        return await this.service.findById(id)
    }

    @Post()
    public async saveBrand(@Body() brand: Brand) {
        return await this.service.save(brand)
    }

    @Delete(':id')
    public async deleteBrand(@Param('id') id: number) {
        return await this.service.delete(id)
    }

}
