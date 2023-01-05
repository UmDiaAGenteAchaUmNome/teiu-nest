import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { Ambient } from 'src/entities/ambient';
import { AmbientService } from './ambient.service';

@Controller('ambient')
export class AmbientController {

    constructor(
        private readonly service: AmbientService
    ) { }

    @Get()
    public async searchAmbient(@Query() filters?: Ambient) {
        return await this.service.search(filters)
    }

    @Get(':id')
    public async findAmbientById(@Param('id') id: number) {
        return await this.service.findById(id)
    }

    @Post()
    public async saveAmbient(@Body() ambient: Ambient) {
        return await this.service.save(ambient)
    }

    @Delete(':id')
    public async deleteAmbient(@Param('id') id: number) {
        return await this.service.delete(id)
    }

}
