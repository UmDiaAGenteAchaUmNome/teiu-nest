import { ImageDTO } from '@apidevteam/core-teiu/lib';
import { Injectable, Logger } from '@nestjs/common';
import { TransformationOptions, UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import envConfig from 'src/config/env/env.config';

@Injectable()
export class CloudinaryService {

    private readonly logger = new Logger(CloudinaryService.name)

    public async uploadImageDto(image: ImageDTO, path?: string, transformation?: TransformationOptions): Promise<ImageDTO> {
        try {
            cloudinary.config(this.initCloudinaryCredentials())

            let uploadResponse: UploadApiResponse = await cloudinary.uploader.upload(image.base64src, {
                folder: envConfig().thirdParty.cloudinary.rootFolder.concat(path.trim()) || envConfig().thirdParty.cloudinary.rootFolder,
                public_id: image.title.trim(),
                overwrite: true,
                unique_filename: true,
                transformation: transformation
            })

            return {
                link: uploadResponse.url,
                title: image.title,
                id: image.id,
                publicId: uploadResponse.public_id
            }

        } catch (error) {
            console.error(error)
            throw new Error(`Erro no upload da imagem: ${error.code}`)
        }
    }

    public async deleteCloudinaryImage(image: ImageDTO) {
        try {
            cloudinary.config(this.initCloudinaryCredentials())

            let deleteResponse = await cloudinary.uploader.destroy(image.publicId)
            return deleteResponse
        } catch (error) {
            console.error(error)
            throw new Error(`Erro ao apagar imagem: ${error.code}`)
        }
    }

    private initCloudinaryCredentials() {
        return {
            cloud_name: envConfig().thirdParty.cloudinary.name,
            api_key: envConfig().thirdParty.cloudinary.key,
            api_secret: envConfig().thirdParty.cloudinary.secret
        }
    }

}