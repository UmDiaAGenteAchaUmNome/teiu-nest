import { AccordionItem } from '@apicore/teiu/lib';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
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
    public async createAccordionItem(@Body() accordionItem: AccordionItem) {
        return await this.accordionItemService.create(accordionItem)
    }

    @Put(':id')
    public async updateAccordionItem(@Param('id') accordionItemId: number, @Body() accordionItem: AccordionItem) {
        return await this.accordionItemService.update(accordionItemId, accordionItem)
    }

    @Delete(':id')
    public async deleteAccordionItem(@Param('id') accordionItemId: number) {
        await this.accordionItemService.delete(accordionItemId)
    }
}
