import { Filter } from '@apicore/nestjs/lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstagramPost } from 'src/entities/instagram-post';
import { Repository } from 'typeorm';

@Injectable()
export class InstagramPostService {

    constructor(
        @InjectRepository(InstagramPost)
        private readonly instagramPostRepository: Repository<InstagramPost>,
        private readonly filter: Filter
    ) { }

    public async search(filters?: InstagramPost) {
        return await this.instagramPostRepository.find({
            where: this.filter.build(filters)
        })
    }

    public async findById(id: number) {
        return await this.instagramPostRepository.findOne({
            where: { id }
        })
    }

    public async save(instagramPost: InstagramPost) {
        return await this.instagramPostRepository.save(instagramPost)
    }

    public async delete(id: number) {
        return await this.instagramPostRepository.delete(id)
    }

}
