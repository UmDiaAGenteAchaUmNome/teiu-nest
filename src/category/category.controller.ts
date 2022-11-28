import { Category } from '@apicore/teiu/lib';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guards/jwt.guard';
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
    public async findCategoryById(@Param('id') categoryId: number) {
        return await this.categoryService.findById(categoryId)
    }

    @Post()
    @UseGuards(JwtGuard)
    public async createCategory(@Body() category: Category) {
        return await this.categoryService.create(category)
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    public async updateCategory(@Param('id') categoryId: number, @Body() category: Category) {
        return await this.categoryService.create(category)
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    public async deleteCategory(@Param('id') categoryId) {
        await this.categoryService.delete(categoryId)
    }

}
