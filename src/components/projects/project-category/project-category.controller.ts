import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectCategory } from 'src/entities/project/project-category';
import { ProjectCategoryService } from './project-category.service';

@Controller('project-category')
@ApiTags('Project Category')
export class ProjectCategoryController {

    constructor(
        private readonly service: ProjectCategoryService
    ) { }

    @Get()
    public async searchProjectCategory(@Query() filters?: ProjectCategory) {
        console.log('got here')
        return await this.service.search(filters)
    }

    @Get(':id')
    public async findProjectCategoryById(@Param('id') id: number) {
        console.log('teste')
        return await this.service.findById(id)
    }

    @Post()
    public async saveProjectCategory(@Body() projectCategory: ProjectCategory) {
        return await this.service.save(projectCategory)
    }

    @Delete(':id')
    public async deleteProjectCategory(id: number) {
        return await this.service.delete(id)
    }
}
