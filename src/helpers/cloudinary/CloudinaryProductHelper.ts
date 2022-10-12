import { Injectable } from "@nestjs/common"
import { CloudinaryImage } from "src/entities/images/cloudinary/image.model"
import { Product } from "src/entities/typeorm/product"
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

    public async uploadProductImages(product: Product): Promise<Product> {
        this.product = product

        const productImage = this.buildCloudinaryImage(this.product.title, this.product.image)
        const bannerImage = this.buildCloudinaryImage(this.product.title.concat('_banner'), this.product.bannerImage)

        if(product.image)
            product.image = await this.cloudinaryService.uploadImage(productImage)

        if(product.bannerImage)
            product.bannerImage = await this.cloudinaryService.uploadImage(bannerImage)

        return product
    }

    private buildCloudinaryImage(title: string, image: string): CloudinaryImage {
        const cloudinaryImage: CloudinaryImage = {
            title: this.buildImageTitle(title),
            data: image,
            path: `teiu/produtos/${this.buildImageTitle(this.product.title)}_${this.buildImageTitle(this.product.subtitle)}`
        }

        return cloudinaryImage
    }

}