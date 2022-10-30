import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Product } from 'src/entities/typeorm/product';
import { JwtGuard } from 'src/guards/jwt.guard';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(
        private readonly productService: ProductService
    ) {}

    @Get()
    public async listProducts(@Query() filters?: Product): Promise<Product[]> {
        return await this.productService.listProducts(filters)
    }
    
    @Get(':id')
    public async findProductById(@Param('id') productId: number): Promise<Product> {
        return await this.productService.findProductById(productId)
    }
    
    @Post()
    @UseGuards(JwtGuard)
    public async createProduct(@Body() product: Product): Promise<Product> {
        return await this.productService.createProduct(product)
    }
    
    @Put(':id')
    @UseGuards(JwtGuard)
    public async updateProduct(@Param('id') productId: number, @Body() product: Product): Promise<Product> {
        return await this.productService.updateProduct(productId, product)
    }
    
    @Delete(':id')
    @UseGuards(JwtGuard)
    public async deleteProduct(@Param('id') idProduto: number): Promise<void> {
        await this.productService.deleteProduct(idProduto)
    }

}
