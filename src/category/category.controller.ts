import { Category } from '@apicore/teiu/lib';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @Get()
    public async searchCategories(@Query() filters?: Category) {
        return await this.categoryService.search(filters)
    }

    @Get(':id')
    public async findCategoryById(@Param('id') id: number) {
        return await this.categoryService.findById(id)
    }

    @Post()
    public async createCategory(@Body() category: Category) {
        return await this.categoryService.create(category)
    }

    @Put(':id')
    public async updateCategory(@Param('id') id: number, @Body() category: Category) {
        return await this.categoryService.create(category)
    }

    @Delete(':id')
    public async deleteCategory(@Param('id') id) {
        await this.categoryService.delete(id)
    }

}
