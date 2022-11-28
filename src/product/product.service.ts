import { SaveProductRequestDTO } from '@apicore/teiu/lib';
import { Product, ProductDetail, ProductDetailItem } from '@apicore/teiu/lib/typeorm';
import { Filter } from '@apicore/teiu/lib/typeorm/core/filter';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

    private readonly logger = new Logger(ProductService.name)

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(ProductDetail)
        private readonly productDetailRepository: Repository<ProductDetail>,

        @InjectRepository(ProductDetailItem)
        private readonly productDetailItemRepository: Repository<ProductDetailItem>,

        private cloudinaryService: CloudinaryService,
        private filter: Filter
    ) { }

    public async listProducts(filters?: Product) {
        return await this.productRepository.find({
            where: this.filter.build(filters),
            relations: ["category", "images", "details", "details.details"]
        })
    }

    public async findProductById(productId: number) {
        return await this.productRepository.findOne({
            where: { id: productId },
            relations: ["category", "images", "details", "details.details"]
        })
    }

    public async saveProduct(product: SaveProductRequestDTO) {
        product.images = await this.uploadCloudinaryImages(product)

        let details = product.details
        delete product.details

        await this.productRepository.save(product)

        details.forEach(detail => detail.product = product)
        await this.productDetailRepository.save(details)

        return await this.findProductById(product.id)
    }

    public async deleteProduct(productId: number) {
        const product = await this.findProductById(productId)
        const queryRunner = this.productRepository.manager.connection.createQueryRunner()

        product.details.forEach(async detail => {
            detail.details.forEach(async item => {
                queryRunner.startTransaction()
                await queryRunner.query("DELETE FROM product_detail_item WHERE id = ?", [item.id])
                queryRunner.commitTransaction()
            })

            queryRunner.startTransaction()
            await queryRunner.query("DELETE FROM product_detail WHERE id = ?", [detail.id])
            queryRunner.commitTransaction()
        })

        queryRunner.startTransaction()
        await queryRunner.query("DELETE FROM product WHERE id = ?", [product.id])
        queryRunner.commitTransaction()
    }

    private async uploadCloudinaryImages(product: SaveProductRequestDTO) {
        return await Promise.all(
            product.images.map(async (image) => {
                if (image.base64src) return await this.cloudinaryService.uploadImageDto(image)
                else return image
            })
        )
    }
}
