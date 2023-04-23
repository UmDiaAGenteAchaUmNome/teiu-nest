import { Filter } from '@apicore/nestjs/lib';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductLine } from 'src/entities/product/product-line';
import { ProductLineController } from './product-line.controller';
import { ProductLineService } from './product-line.service';

@Module({
  controllers: [ProductLineController],
  providers: [ProductLineService, Filter],
  imports: [TypeOrmModule.forFeature([ProductLine])]
})
export class ProductLineModule { }
