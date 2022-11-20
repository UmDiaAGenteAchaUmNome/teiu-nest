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

    public async listProducts(filters?: Product) {
        return await this.productRepository.find({
            where: this.filter.build(filters),
            relations: ["category"]
        })
    }

    public async findProductById(productId: number) {
        return await this.productRepository.findOne({
            where: { id: productId },
            relations: ["category"]
        })
    }

    public async createProduct(product: Product) {
        product = await this.cloudinaryProductHelper.uploadProductImages(product)
        await this.productRepository.save(product)
        return product
    }

    public async updateProduct(productId: number, product: Product) {
        product = await this.cloudinaryProductHelper.uploadProductImages(product)
        await this.productRepository.update(productId, product)
        return await this.findProductById(productId)
    }

    public async deleteProduct(productId: number) {
        await this.productRepository.delete(productId)
    }
}
