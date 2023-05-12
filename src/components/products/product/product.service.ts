import { Filter } from '@apicore/nestjs/lib';
import { ProductDTO } from '@apicore/teiu/lib';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/entities/image';
import { Product } from 'src/entities/product/product';
import { ProductDetail } from 'src/entities/product/product-detail';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

    private readonly logger = new Logger(ProductService.name)
    private readonly relations: string[] = ["category", "details", "details.image", "brand", "ambient", "productLine"]

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(ProductDetail)
        private readonly productDetailRepository: Repository<ProductDetail>,

        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,

        private cloudinaryService: CloudinaryService,
        private filter: Filter
    ) { }

    public async listProducts(filters?: Product) {
        return await this.productRepository.find({
            where: this.filter.build(filters),
            relations: this.relations,
            order: {
                category: {
                    title: "ASC"
                }
            }
        })
    }

    public async findProductById(productId: number) {
        return await this.productRepository.findOne({
            where: { id: productId },
            relations: this.relations
        })
    }

    public async saveProduct(product: ProductDTO) {
        product.details = await this.uploadCloudinaryImages(product)
        console.log((product as Product).details)
        product.altDescription = ""
        await this.productRepository.save(product as Product)

        return product
    }

    public async deleteProduct(productId: number) {
        const product = await this.findProductById(productId)
        const queryRunner = this.productRepository.manager.connection.createQueryRunner()

        product.details.forEach(async detail => {
            queryRunner.startTransaction()
            await queryRunner.query("DELETE FROM product_detail WHERE id = ?", [detail.id])
            queryRunner.commitTransaction()
        })

        queryRunner.startTransaction()
        await queryRunner.query("DELETE FROM product WHERE id = ?", [product.id])
        queryRunner.commitTransaction()
    }

    private async uploadCloudinaryImages(product: ProductDTO) {
        let uploadedImages = await Promise.all(
            product.details.map(async (detail) => {
                if (detail.image.base64src) {
                    detail.image = await this.cloudinaryService.uploadImageDto(detail.image, `teiu/products/${product.title}`)
                    detail.image = await this.imageRepository.save(detail.image)
                    return detail
                } else {
                    return detail
                }
            })
        )

        return uploadedImages
    }
}
