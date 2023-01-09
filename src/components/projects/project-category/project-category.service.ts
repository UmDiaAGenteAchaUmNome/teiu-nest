import { Filter } from '@apicore/nestjs/lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectCategory } from 'src/entities/project-category';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectCategoryService {

    constructor(
        @InjectRepository(ProjectCategory)
        private readonly repository: Repository<ProjectCategory>,
        private readonly filter: Filter
    ) { }

    public async search(filters?: ProjectCategory) {
        return await this.repository.find({
            where: this.filter.build(filters),
            relations: ['projects']
        })
    }

    public async findById(id: number) {
        return await this.repository.findOne({
            where: { id },
            relations: ['projects']
        })
    }

    public async save(category: ProjectCategory) {
        return await this.repository.save(category)
    }

    public async delete(id: number) {
        return await this.repository.delete(id)
    }

}
