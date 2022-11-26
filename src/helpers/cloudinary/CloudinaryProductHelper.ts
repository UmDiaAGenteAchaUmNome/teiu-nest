import { CreateImageRequestDTO, CreateProductRequestDTO } from "@apicore/teiu/lib"
import { CloudinaryImage } from "@apicore/teiu/lib/third-party"
import { Product } from "@apicore/teiu/lib/typeorm"
import { Injectable } from "@nestjs/common"
import { CloudinaryService } from "src/third_party/images/cloudinary/cloudinary.service"
import { CloudinaryHelper } from "./CloudinaryHelper"

@Injectable()
export class CloudinaryProductHelper extends CloudinaryHelper {

    private product: Product

    constructor(
        private cloudinaryService: CloudinaryService
    ) {
        super()
    }

    public async uploadProductImages(product: CreateProductRequestDTO): Promise<Product> {
        this.product = product

        const productImage = this.buildCloudinaryImage(this.product.image)
        const bannerImage = this.buildCloudinaryImage(this.product.bannerImage)

        if (product.image)
            product.image.link = await this.cloudinaryService.uploadImage(productImage)

        if (product.bannerImage)
            product.bannerImage.link = await this.cloudinaryService.uploadImage(bannerImage)

        return product
    }

    private buildCloudinaryImage(image: CreateImageRequestDTO): CloudinaryImage {
        if (image) {
            const cloudinaryImage: CloudinaryImage = {
                title: this.buildImageTitle(image.title),
                data: image.base64src,
                path: `teiu/produtos/${this.buildImageTitle(this.product.title)}_${this.buildImageTitle(this.product.subtitle)}`
            }

            return cloudinaryImage
        }
    }

}