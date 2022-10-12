import { Injectable } from "@nestjs/common"
import { CloudinaryImage } from "src/entities/images/cloudinary/image.model"
import { Banner } from "src/entities/typeorm/banner"
import { CloudinaryService } from "src/third_party/images/cloudinary/cloudinary.service"
import { CloudinaryHelper } from "./CloudinaryHelper"

@Injectable()
export class CloudinaryBannerHelper extends CloudinaryHelper {

    private banner: Banner

    constructor(
        private cloudinaryService: CloudinaryService
    ) {
        super()
    }

    public async uploadBannerImages(banner: Banner): Promise<Banner> {
        this.banner = banner

        const bannerImage = this.buildCloudinaryImage(this.banner.title, this.banner.image)
        const bgImage = this.buildCloudinaryImage(this.banner.title.concat('_bg'), this.banner.bgImage)

        // if(banner.image)
            banner.image = await this.cloudinaryService.uploadImage(bannerImage)

        // if(banner.bgImage)
            banner.bgImage = await this.cloudinaryService.uploadImage(bgImage)

        return banner
    }

    private buildCloudinaryImage(title: string, image: string): CloudinaryImage {
        const cloudinaryImage: CloudinaryImage = {
            title: this.buildImageTitle(title),
            data: image,
            path: `teiu/banners/${this.buildImageTitle(this.banner.title)}`
        }

        return cloudinaryImage
    }

}