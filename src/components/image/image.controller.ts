import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';

@ApiTags('Image')
@Controller('image')
export class ImageController {

    constructor(
        private readonly imageService: ImageService
    ) { }

    @Delete('/cloudinary/:id')
    public async deleteCloudinaryImage(@Param('id') imageId: number) {
        console.log(imageId)
        const image = await this.imageService.getImageById(imageId)

        console.log(image)

        await this.imageService.deleteCloudinaryImage(image)
    }

}
