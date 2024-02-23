import { Filter } from '@apidevteam/core-nestjs/lib/helpers/index';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductBrand } from 'src/entities/product/product-brand';
import { SaveBrandValidation } from 'src/validations/save-brand.validation';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';

@Module({
  controllers: [BrandController],
  providers: [BrandService, Filter, SaveBrandValidation],
  imports: [TypeOrmModule.forFeature([ProductBrand])]
})
export class BrandModule { }
