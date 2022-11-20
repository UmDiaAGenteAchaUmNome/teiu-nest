import { Filter, Post, ServiceContract } from '@apicore/teiu/lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService implements ServiceContract {

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

    public async create(post: Post) {
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
