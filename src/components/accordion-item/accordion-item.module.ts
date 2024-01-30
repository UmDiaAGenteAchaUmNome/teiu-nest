import { Filter } from '@apicore/nestjs/lib/helpers/index';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccordionItem } from 'src/entities/accordion-item';
import { AccordionItemController } from './accordion-item.controller';
import { AccordionItemService } from './accordion-item.service';

@Module({
  controllers: [AccordionItemController],
  providers: [AccordionItemService, Filter],
  imports: [TypeOrmModule.forFeature([AccordionItem])]
})
export class AccordionItemModule { }
