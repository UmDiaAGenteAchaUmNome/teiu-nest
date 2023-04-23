import { Filter } from '@apicore/nestjs/lib';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities/project/project';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, Filter, CloudinaryService],
  imports: [TypeOrmModule.forFeature([Project])]
})
export class ProjectModule { }
