import { Filter } from '@apidevteam/core-nestjs/lib/helpers/index';
import { ProjectDTO } from '@apidevteam/core-teiu/lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project/project';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {

    private readonly relations: string[] = ["language", "language.flagImage", "image", "user"]

    constructor(
        @InjectRepository(Project)
        private readonly repository: Repository<Project>,
        private readonly filter: Filter,
        private readonly cloudinaryService: CloudinaryService,
    ) { }

    public async search(filters?: Project) {
        return await this.repository.find({ where: this.filter.build(filters), relations: this.relations })
    }

    public async findById(id: number) {
        return await this.repository.findOne({ where: { id }, relations: this.relations })
    }

    public async save(project: ProjectDTO) {
        await this.uploadCloudinaryImages(project)
        return await this.repository.save(project)
    }

    public async delete(id: number) {
        await this.repository.delete(id)
    }

    public async findLatestProject(limit?: number) {
        return await this.repository.find({
            order: {
                updatedAt: 'DESC'
            },
            relations: ['image', 'user'],
            take: limit || 5
        })
    }

    private async uploadCloudinaryImages(project: ProjectDTO) {
        if (project.image.base64src) {
            project.image = await this.cloudinaryService.uploadImageDto(
                project.image,
                `/projects/${project.title}`
            )

            return project
        }

        return project
    }

}
