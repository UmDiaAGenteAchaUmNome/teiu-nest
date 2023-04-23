
import { ProductDTO } from '@apicore/teiu/lib';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { Product } from 'src/entities/product/product';
import { JwtGuard } from 'src/guards/jwt.guard';
import { ProductService } from './product.service';

@ApiTags('Product')
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
    @UseGuards(JwtGuard)
    public async createProduct(@Body() product: ProductDTO): Promise<ProductDTO> {
        return await this.productService.saveProduct(product)
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    public async updateProduct(@Param('id') productId, @Body() product: ProductDTO): Promise<ProductDTO> {
        return await this.productService.saveProduct(product)
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    public async deleteProduct(@Param('id') idProduto: number): Promise<void> {
        await this.productService.deleteProduct(idProduto)
    }

}
