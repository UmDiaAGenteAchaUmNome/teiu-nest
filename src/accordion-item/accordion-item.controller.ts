import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AccordionItem } from 'src/entities/accordion-item';
import { JwtGuard } from 'src/guards/jwt.guard';
import { AccordionItemService } from './accordion-item.service';

@Controller('accordion-item')
export class AccordionItemController {

    constructor(
        private readonly accordionItemService: AccordionItemService
    ) { }

    @Get()
    public async searchAccordionItems(@Query() filters?: AccordionItem) {
        return await this.accordionItemService.search(filters)
    }

    @Get(':id')
    public async findAccordionItemById(@Param('id') accordionItemId: number) {
        return await this.accordionItemService.findById(accordionItemId)
    }

    @Post()
    @UseGuards(JwtGuard)
    public async createAccordionItem(@Body() accordionItem: AccordionItem) {
        return await this.accordionItemService.save(accordionItem)
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    public async updateAccordionItem(@Param('id') accordionItemId: number, @Body() accordionItem: AccordionItem) {
        return await this.accordionItemService.update(accordionItemId, accordionItem)
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    public async deleteAccordionItem(@Param('id') accordionItemId: number) {
        await this.accordionItemService.delete(accordionItemId)
    }
}
