import { Filter } from '@apicore/nestjs/lib/helpers/index';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductBrand } from 'src/entities/product/product-brand';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';

@Module({
  controllers: [BrandController],
  providers: [BrandService, Filter],
  imports: [TypeOrmModule.forFeature([ProductBrand])]
})
export class BrandModule { }
