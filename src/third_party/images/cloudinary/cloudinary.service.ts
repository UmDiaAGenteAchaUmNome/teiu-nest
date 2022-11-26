import { CreateImageRequestDTO } from '@apicore/teiu/lib';
import { Injectable } from '@nestjs/common';
import { TransformationOptions, v2 as cloudinary } from 'cloudinary';
import { CloudinaryCredentials } from 'src/config/third_party/images/cloudinary.config';

@Injectable()
export class CloudinaryService {

    public async uploadImage(image: CreateImageRequestDTO, path?: string, transformation?: TransformationOptions): Promise<string> {
        try {
            cloudinary.config(CloudinaryCredentials)

            let uploadResponse = await cloudinary.uploader.upload(image.base64src, {
                folder: path || 'teiu',
                public_id: image.title,
                overwrite: true,
                unique_filename: true,
                transformation: transformation
            })

            return uploadResponse.url
        } catch (error) {
            console.error(error.error.code)
            throw new Error(`Erro no upload da imagem: ${error.error.code}`)
        }
    }

}