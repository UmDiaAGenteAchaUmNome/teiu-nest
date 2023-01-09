import { Body, Controller, Delete, Get, Headers, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { Project } from 'src/entities/project';
import { JwtGuard } from 'src/guards/jwt.guard';
import { getLoggedUser } from 'src/helpers/auth/jwt/logged-user.helper';
import { ProjectService } from './project.service';

@ApiTags('Project')
@Controller('project')
export class ProjectController {

    constructor(
        private readonly projectService: ProjectService
    ) { }

    @Get()
    public async searchProjects(@Query() filters?: Project) {
        return await this.projectService.search(filters)
    }

    @Get(':id')
    public async findProjectById(@Param('id') projectId: number) {
        return await this.projectService.findById(projectId)
    }

    @Post()
    @UseGuards(JwtGuard)
    public async createProject(@Body() project: Project, @Headers() headers) {
        project.user = getLoggedUser(headers)
        return await this.projectService.save(project)
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    public async updateProject(@Param('id') projectId: number, @Body() project: Project) {
        return await this.projectService.save(project)
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    public async deleteProject(@Param('id') projectId: number) {
        return await this.projectService.delete(projectId)
    }
}
