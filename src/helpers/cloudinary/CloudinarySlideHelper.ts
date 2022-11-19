import { CloudinaryImage } from "@apicore/teiu/lib/third-party"
import { Slide } from "@apicore/teiu/lib/typeorm"
import { Injectable } from "@nestjs/common"
import { CloudinaryService } from "src/third_party/images/cloudinary/cloudinary.service"
import { CloudinaryHelper } from "./CloudinaryHelper"

@Injectable()
export class CloudinaryBannerHelper extends CloudinaryHelper {

    private slide: Slide

    constructor(
        private cloudinaryService: CloudinaryService
    ) {
        super()
    }

    public async uploadBannerImages(slide: Slide): Promise<Slide> {
        this.slide = slide

        const bannerImage = this.buildCloudinaryImage(this.slide.title, this.slide.image)
        const bgImage = this.buildCloudinaryImage(this.slide.title.concat('_bg'), this.slide.bgImage)

        // if(banner.image)
        slide.image = await this.cloudinaryService.uploadImage(bannerImage)

        // if(banner.bgImage)
        slide.bgImage = await this.cloudinaryService.uploadImage(bgImage)

        return slide
    }

    private buildCloudinaryImage(title: string, image: string): CloudinaryImage {
        const cloudinaryImage: CloudinaryImage = {
            title: this.buildImageTitle(title),
            data: image,
            path: `teiu/slides/${this.buildImageTitle(this.slide.title)}`
        }

        return cloudinaryImage
    }

}