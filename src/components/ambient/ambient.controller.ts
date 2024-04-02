import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductAmbient } from 'src/entities/product/product-ambient';
import { JwtGuard } from 'src/guards/jwt.guard';
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
    @UseGuards(JwtGuard)
    public async saveAmbient(@Body() ambient: ProductAmbient) {
        return await this.service.save(ambient)
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    public async deleteAmbient(@Param('id') id: number) {
        return await this.service.delete(id)
    }

}
