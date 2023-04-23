import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { ProductCategory } from 'src/entities/product/product-category';
import { JwtGuard } from 'src/guards/jwt.guard';
import { CategoryService } from './category.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @Get()
    public async searchCategories(@Query() filters?: ProductCategory) {
        return await this.categoryService.search(filters)
    }

    @Get(':id')
    public async findCategoryById(@Param('id') categoryId: number) {
        return await this.categoryService.findById(categoryId)
    }

    @Post()
    @UseGuards(JwtGuard)
    public async createCategory(@Body() category: ProductCategory) {
        return await this.categoryService.save(category)
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    public async updateCategory(@Param('id') categoryId: number, @Body() category: ProductCategory) {
        return await this.categoryService.save(category)
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    public async deleteCategory(@Param('id') categoryId) {
        await this.categoryService.delete(categoryId)
    }

}
