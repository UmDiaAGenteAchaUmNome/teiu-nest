import { Tip } from '@apicore/teiu/lib';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TipService } from './tip.service';

@Controller('tip')
export class TipController {

    constructor(private readonly tipService: TipService) { }

    @Get()
    public async searchTips(@Query() filters?: Tip) {
        return await this.tipService.search(filters)
    }

    @Get(':id')
    public async findTipById(@Param('id') tipId: number) {
        return await this.tipService.findById(tipId)
    }

    @Post()
    public async createTip(@Body() tip: Tip) {
        return await this.tipService.create(tip)
    }

    @Put(':id')
    public async updateTip(@Param('id') tipId: number, @Body() tip: Tip) {
        return await this.tipService.update(tipId, tip)
    }

    @Delete(':id')
    public async deleteTip(@Param('id') tipId: number) {
        return await this.tipService.delete(tipId)
    }
}
