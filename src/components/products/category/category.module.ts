import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageModule } from 'src/components/language/language.module';
import { ProductCategory } from 'src/entities/product/product-category';
import { Filter } from 'src/helpers/filter/filter';
import { SaveCategoryValidation } from 'src/validations/save-category.validation';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, Filter, SaveCategoryValidation],
  imports: [TypeOrmModule.forFeature([ProductCategory]), LanguageModule]
})
export class CategoryModule { }
