import { Filter } from '@apidevteam/core-nestjs/lib/helpers/index';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstagramPost } from 'src/entities/instagram-post';
import { InstagramPostDTO } from 'src/entities/tmp/dtos/instagram-post.dto';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';

@Injectable()
export class InstagramPostService {

    constructor(
        @InjectRepository(InstagramPost)
        private readonly instagramPostRepository: Repository<InstagramPost>,
        private readonly filter: Filter,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    private relations: string[] = ['image']

    public async search(filters?: InstagramPost) {
        return await this.instagramPostRepository.find({
            where: this.filter.build(filters),
            relations: this.relations
        })
    }

    public async findById(id: number) {
        return await this.instagramPostRepository.findOne({
            where: { id },
            relations: this.relations
        })
    }

    public async save(instagramPost: InstagramPostDTO) {
        await this.uploadCloudinaryImages(instagramPost)

        console.log(instagramPost)
        return await this.instagramPostRepository.save(instagramPost)
    }

    public async delete(id: number) {
        return await this.instagramPostRepository.delete(id)
    }

    private async uploadCloudinaryImages(instagramPost: InstagramPostDTO) {
        if (instagramPost.image.base64src) {
            instagramPost.image = await this.cloudinaryService.uploadImageDto(
                instagramPost.image,
                `/posts/instagram/${instagramPost.image.title}`
            )

            return instagramPost
        }

        return instagramPost
    }

}
