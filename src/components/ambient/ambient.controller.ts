import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductAmbient } from 'src/entities/product/product-ambient';
import { AmbientService } from './ambient.service';

@ApiTags('Ambient')
@Controller('ambient')
export class AmbientController {

    constructor(
        private readonly service: AmbientService
    ) { }

    @Get()
    public async searchAmbient(@Query() filters?: ProductAmbient) {
        return await this.service.search(filters)
    }

    @Get(':id')
    public async findAmbientById(@Param('id') id: number) {
        return await this.service.findById(id)
    }

    @Post()
    public async saveAmbient(@Body() ambient: ProductAmbient) {
        return await this.service.save(ambient)
    }

    @Delete(':id')
    public async deleteAmbient(@Param('id') id: number) {
        return await this.service.delete(id)
    }

}
