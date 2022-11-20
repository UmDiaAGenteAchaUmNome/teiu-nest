import { AccordionItem, Filter } from '@apicore/teiu/lib';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccordionItemController } from './accordion-item.controller';
import { AccordionItemService } from './accordion-item.service';

@Module({
  controllers: [AccordionItemController],
  providers: [AccordionItemService, Filter],
  imports: [TypeOrmModule.forFeature([AccordionItem])]
})
export class AccordionItemModule { }
