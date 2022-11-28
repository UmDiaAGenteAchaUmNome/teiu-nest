import { Slide } from '@apicore/teiu/lib/typeorm';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guards/jwt.guard';
import { SlideService } from './slide.service';

@Controller('slide')
export class SlideController {

    constructor(
        private readonly slideService: SlideService
    ) { }

    @Get()
    public async listSlides(): Promise<Slide[]> {
        return await this.slideService.listSlides()
    }

    @Get(':id')
    public async findSlideById(@Param('id') slideId: number): Promise<Slide> {
        return await this.slideService.findSlideById(slideId)
    }

    @Post()
    @UseGuards(JwtGuard)
    public async createSlide(@Body() slide: Slide): Promise<Slide> {
        return await this.slideService.createSlide(slide)
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    public async updateSlide(@Param('id') slideId: number, @Body() slide: Slide): Promise<Slide> {
        return await this.slideService.updateSlide(slideId, slide)
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    public async deleteSlide(@Param('id') slideId: number): Promise<void> {
        await this.slideService.deleteSlide(slideId)
    }


}
