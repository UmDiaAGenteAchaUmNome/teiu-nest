import { ImageDTO } from '@apidevteam/core-teiu/lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/entities/image';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {

    constructor(
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    public async getImageById(imageId: number) {
        return await this.imageRepository.findOneBy({ id: imageId })
    }

    public async deleteImage(image: ImageDTO) {
        try {
            const cloudinaryDestroyExecution = await this.cloudinaryService.deleteCloudinaryImage(image)
            console.log(cloudinaryDestroyExecution)

            await this.imageRepository.delete(image.id)
        } catch (error) {
            console.error(error)
            console.log("do something...")
        }
    }

    public async deleteCloudinaryImage(image: ImageDTO) {
        try {
            const cloudinaryDestroyExecution = await this.cloudinaryService.deleteCloudinaryImage(image)
            console.log(cloudinaryDestroyExecution)
        } catch (error) {
            console.error(error)
            console.log("do something...")
        }
    }



}
