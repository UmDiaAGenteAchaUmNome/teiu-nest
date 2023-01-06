import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { Highlight } from 'src/entities/highlight';
import { HighlightService } from './highlight.service';

@Controller('highlight')
export class HighlightController {

    constructor(
        private readonly service: HighlightService
    ) { }

    @Get()
    public async searchHighlight(@Query() filters?: Highlight) {
        return await this.service.search(filters)
    }

    @Get(':id')
    public async findHighlightById(@Param('id') id: number) {
        return await this.service.findById(id)
    }

    @Post()
    public async saveHighlight(@Body() highlight) {
        return await this.service.save(highlight)
    }

    @Delete(':id')
    public async deleteHighlight(@Param('id') id: number) {
        return await this.service.delete(id)
    }

}
