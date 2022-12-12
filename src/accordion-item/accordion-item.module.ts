import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccordionItem } from 'src/entities/accordion-item';
import { Filter } from 'src/entities/core/filter';
import { AccordionItemController } from './accordion-item.controller';
import { AccordionItemService } from './accordion-item.service';

@Module({
  controllers: [AccordionItemController],
  providers: [AccordionItemService, Filter],
  imports: [TypeOrmModule.forFeature([AccordionItem])]
})
export class AccordionItemModule { }
