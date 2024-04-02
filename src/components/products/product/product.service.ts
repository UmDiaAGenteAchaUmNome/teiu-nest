import { Filter } from '@apidevteam/core-nestjs/lib/helpers/index';
import { ProductDTO } from '@apidevteam/core-teiu/lib';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/entities/image';
import { Product } from 'src/entities/product/product';
import { ProductDetail } from 'src/entities/product/product-detail';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { ILike, In, Like, Repository } from 'typeorm';

@Injectable()
export class ProductService {

    private readonly logger = new Logger(ProductService.name)
    private readonly relations: string[] = ["language", "language.flagImage", "category", "details", "details.image", "brand", "ambient"]

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

    public async listProducts(filters?: any) {
        const queryParams = {
            ambient: filters.ambients ? In(filters.ambients.split(',')) : null,
            brand: filters.brands ? In(filters.brands.split(',')) : null,
            category: filters.categories ? In(filters.categories.split(',')) : null || filters.categoryId ? { id: Like(`%${filters.categoryId}%`) } : null,
            title: filters.title ? ILike(`%${filters.title}%`) : null,
            language: (filters.language || filters.languageId) ? { id: Like(`%${filters.language || filters.languageId}%`) } : null
        }

        const processedFilters = this.checkFilters(queryParams)

        return await this.productRepository.find({
            where: processedFilters,
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
                    detail.image = await this.cloudinaryService.uploadImageDto(detail.image, `/products/${product.title}`)
                    detail.image = await this.imageRepository.save(detail.image)
                    return detail
                } else {
                    return detail
                }
            })
        )

        return uploadedImages
    }

    private checkFilters(filters?: any) {
        Object.keys(filters).forEach((attr) => {
            if (!filters[attr]) {
                this.logger.debug(`Atributo ${attr}. Valor: ${filters[attr]}`)
                delete filters[attr];
                return;
            }
        });

        return filters
    }
}
