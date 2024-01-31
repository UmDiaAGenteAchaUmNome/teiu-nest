import { SlideDTO } from '@apicore/teiu/lib';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { Slide } from 'src/entities/slide';
import { JwtGuard } from 'src/guards/jwt.guard';
import { SlideService } from './slide.service';

@ApiTags('Slide')
@Controller('slide')
export class SlideController {

    constructor(
        private readonly slideService: SlideService
    ) { }

    @Get()
    public async listSlides(@Query() filters?: SlideDTO): Promise<Slide[]> {
        return await this.slideService.listSlides(filters)
    }

    @Get(':id')
    public async findSlideById(@Param('id') slideId: number): Promise<Slide> {
        return await this.slideService.findSlideById(slideId)
    }

    @Post()
    @UseGuards(JwtGuard)
    public async createSlide(@Body() slide: SlideDTO): Promise<Slide> {
        //TODO: Tratar Atributos vazios
        slide.routerLink = ""
        slide.altDescription = ""
        return await this.slideService.saveSlide(slide)
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    public async updateSlide(@Param('id') slideId: number, @Body() slide: SlideDTO): Promise<Slide> {
        return await this.slideService.saveSlide(slide)
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    public async deleteSlide(@Param('id') slideId: number): Promise<void> {
        await this.slideService.deleteSlide(slideId)
    }


}
