import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectCategory } from 'src/entities/project/project-category';
import { Filter } from 'src/helpers/filter/filter';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectCategoryService {

    private readonly relations: string[] = ['projects', 'language', 'language.flagImage']

    constructor(
        @InjectRepository(ProjectCategory)
        private readonly repository: Repository<ProjectCategory>,
        private readonly filter: Filter
    ) { }

    public async search(filters?: ProjectCategory) {
        return await this.repository.find({
            where: this.filter.build(filters),
            relations: this.relations
        })
    }

    public async findById(id: number) {
        return await this.repository.findOne({
            where: { id },
            relations: this.relations
        })
    }

    public async save(category: ProjectCategory) {
        return await this.repository.save(category)
    }

    public async delete(id: number) {
        return await this.repository.delete(id)
    }

}
