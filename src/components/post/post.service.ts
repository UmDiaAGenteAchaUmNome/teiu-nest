import { Filter } from '@apidevteam/core-nestjs/lib/helpers/index';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(Post)
        private readonly repository: Repository<Post>,
        private readonly filter: Filter
    ) { }

    public async search(filters?: Post) {
        return await this.repository.find(this.filter.build(filters))
    }

    public async findById(id: number) {
        return await this.repository.findOne({ where: { id } })
    }

    public async save(post: Post) {
        return await this.repository.save(post)
    }

    public async update(id: number, post: Post) {
        await this.repository.update(id, post)
        return await this.findById(id)
    }

    public async delete(id: number) {
        await this.repository.delete(id)
    }
}
