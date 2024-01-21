import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectCategory } from 'src/entities/project/project-category';
import { Filter } from 'src/helpers/filter/filter';
import { ProjectCategoryController } from './project-category.controller';
import { ProjectCategoryService } from './project-category.service';

@Module({
  controllers: [ProjectCategoryController],
  providers: [ProjectCategoryService, Filter],
  imports: [TypeOrmModule.forFeature([ProjectCategory])]
})
export class ProjectCategoryModule { }
