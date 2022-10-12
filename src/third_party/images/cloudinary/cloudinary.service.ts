import { Injectable } from '@nestjs/common';
import { TransformationOptions, v2 as cloudinary } from 'cloudinary'
import { CloudinaryCredentials } from 'src/config/third_party/images/cloudinary.config';
import { CloudinaryImage } from 'src/entities/images/cloudinary/image.model';

@Injectable()
export class CloudinaryService {

    public async uploadImage(image: CloudinaryImage, transformation?: TransformationOptions): Promise<string> {
        try {
            cloudinary.config(CloudinaryCredentials)

            let uploadResponse = await cloudinary.uploader.upload(image.data, {
                folder: image.path,
                public_id: image.title,
                overwrite: true,
                unique_filename: true,
                transformation: transformation
            })

            return uploadResponse.url
        } catch(error) {
            console.error(error.error.code)
            throw new Error(`Erro no upload da imagem: ${error.error.code}`)
        }
    }
    
}