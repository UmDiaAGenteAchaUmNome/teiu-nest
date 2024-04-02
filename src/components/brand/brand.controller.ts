import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { ProductBrand } from 'src/entities/product/product-brand';
import { JwtGuard } from 'src/guards/jwt.guard';
import { BrandService } from './brand.service';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {

    constructor(
        private readonly service: BrandService
    ) { }

    @Get()
    public async searchBrands(@Query() filters?: ProductBrand) {
        return await this.service.search(filters)
    }

    @Get(':id')
    public async findBrandById(@Param('id') id: number) {
        return await this.service.findById(id)
    }

    @Post()
    @UseGuards(JwtGuard)
    public async saveBrand(@Body() brand: ProductBrand) {
        return await this.service.save(brand)
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    public async deleteBrand(@Param('id') id: number) {
        return await this.service.delete(id)
    }

}
