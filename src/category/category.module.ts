import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category';
import { Filter } from 'src/entities/core/filter';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, Filter],
  imports: [TypeOrmModule.forFeature([Category])]
})
export class CategoryModule { }
