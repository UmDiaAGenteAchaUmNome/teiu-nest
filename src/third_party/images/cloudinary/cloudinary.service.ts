import { ImageDTO } from '@apicore/teiu/lib';
import { Injectable, Logger } from '@nestjs/common';
import { TransformationOptions, v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {

    private readonly logger = new Logger(CloudinaryService.name)

    public async uploadImage(image: ImageDTO, path?: string, transformation?: TransformationOptions): Promise<string> {
        try {
            cloudinary.config(this.initCloudinaryCredentials())

            let uploadResponse = await cloudinary.uploader.upload(image.base64src, {
                folder: path.trim() || 'teiu',
                public_id: image.title.trim(),
                overwrite: true,
                unique_filename: true,
                transformation: transformation
            })

            this.logger.log(`Image Uploaded: ${image.title}. Link: ${uploadResponse.url}`)
            return uploadResponse.url
        } catch (error) {
            console.error(error.error.code)
            throw new Error(`Erro no upload da imagem: ${error.error.code}`)
        }
    }

    public async uploadImageDto(image: ImageDTO, path?: string, transformation?: TransformationOptions): Promise<ImageDTO> {
        try {
            cloudinary.config(this.initCloudinaryCredentials())

            let uploadResponse = await cloudinary.uploader.upload(image.base64src, {
                folder: path.trim() || 'teiu',
                public_id: image.title.trim(),
                overwrite: true,
                unique_filename: true,
                transformation: transformation
            })

            return {
                link: uploadResponse.url,
                title: image.title,
                id: image.id
            }

        } catch (error) {
            console.error(error)
            throw new Error(`Erro no upload da imagem: ${error.code}`)
        }
    }

    private initCloudinaryCredentials() {
        return {
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET
        }
    }

}