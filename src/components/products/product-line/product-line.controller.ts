import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductLine } from 'src/entities/product/product-line';
import { ProductLineService } from './product-line.service';

@Controller('product-line')
@ApiTags("Product Line")
export class ProductLineController {

    constructor(
        private readonly service: ProductLineService
    ) { }

    @Get()
    public async searchProductLines(@Query() filters?: ProductLine) {
        return await this.service.search(filters)
    }

    @Get(':id')
    public async getProductLineId(@Param('id') productLineId: number) {
        return await this.service.findById(productLineId)
    }

    @Post()
    public async saveProductLine(@Body() productLine: ProductLine) {
        return await this.service.save(productLine)
    }

    @Delete(':id')
    public async deleteProductLine(@Param('id') productLineId) {
        await this.service.delete(productLineId)
    }

}
