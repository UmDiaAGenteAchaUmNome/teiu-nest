import { Product } from '@apicore/teiu/lib/typeorm';
import { Filter } from '@apicore/teiu/lib/typeorm/core/filter';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryProductHelper } from 'src/helpers/cloudinary/CloudinaryProductHelper';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,

        private cloudinaryProductHelper: CloudinaryProductHelper,
        private filter: Filter
    ) { }

    public async listProducts(filters?: Product): Promise<Product[]> {
        return await this.productRepository.findBy(this.filter.build(filters))
    }

    public async findProductById(productId: number): Promise<Product> {
        return await this.productRepository.findOneBy({ id: productId })
    }

    public async createProduct(product: Product): Promise<Product> {
        product = await this.cloudinaryProductHelper.uploadProductImages(product)
        await this.productRepository.save(product)
        return product
    }

    public async updateProduct(productId: number, product: Product): Promise<Product> {
        product = await this.cloudinaryProductHelper.uploadProductImages(product)
        await this.productRepository.update(productId, product)
        return await this.findProductById(productId)
    }

    public async deleteProduct(productId: number): Promise<void> {
        await this.productRepository.delete(productId)
    }
}
