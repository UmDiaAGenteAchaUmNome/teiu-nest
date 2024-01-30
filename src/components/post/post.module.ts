import { Filter } from '@apicore/nestjs/lib/helpers/index';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService, Filter],
  imports: [TypeOrmModule.forFeature([Post])]
})
export class PostModule { }
