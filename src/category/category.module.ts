import { Category, Filter } from '@apicore/teiu/lib';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, Filter],
  imports: [TypeOrmModule.forFeature([Category])]
})
export class CategoryModule { }
