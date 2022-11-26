import { SaveProductRequestDTO } from '@apicore/teiu/lib';
import { Product } from '@apicore/teiu/lib/typeorm';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(
        private readonly productService: ProductService
    ) { }

    @Get()
    public async listProducts(@Query() filters?: Product): Promise<Product[]> {
        return await this.productService.listProducts(filters)
    }

    @Get(':id')
    public async findProductById(@Param('id') productId: number): Promise<Product> {
        return await this.productService.findProductById(productId)
    }

    @Post()
    // @UseGuards(JwtGuard)
    public async createProduct(@Body() product: SaveProductRequestDTO): Promise<Product> {
        return await this.productService.saveProduct(product)
    }

    @Put()
    // @UseGuards(JwtGuard)
    public async updateProduct(@Body() product: SaveProductRequestDTO): Promise<Product> {
        return await this.productService.saveProduct(product)
    }

    @Delete(':id')
    // @UseGuards(JwtGuard)
    public async deleteProduct(@Param('id') idProduto: number): Promise<void> {
        await this.productService.deleteProduct(idProduto)
    }

}
