import { Body, Controller, Delete, Get, Headers, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Tip } from 'src/entities/tip';
import { JwtGuard } from 'src/guards/jwt.guard';
import { getLoggedUser } from 'src/helpers/auth/jwt/logged-user.helper';
import { TipService } from './tip.service';

@Controller('tip')
export class TipController {

    constructor(
        private readonly tipService: TipService
    ) { }

    @Get()
    public async searchTips(@Query() filters?: Tip) {
        return await this.tipService.search(filters)
    }

    @Get(':id')
    public async findTipById(@Param('id') tipId: number) {
        return await this.tipService.findById(tipId)
    }

    @Post()
    @UseGuards(JwtGuard)
    public async createTip(@Body() tip: Tip, @Headers() headers) {
        tip.user = getLoggedUser(headers)
        return await this.tipService.save(tip)
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    public async updateTip(@Param('id') tipId: number, @Body() tip: Tip) {
        return await this.tipService.save(tip)
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    public async deleteTip(@Param('id') tipId: number) {
        return await this.tipService.delete(tipId)
    }
}
