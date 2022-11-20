import { Filter, Post } from '@apicore/teiu/lib';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService, Filter],
  imports: [TypeOrmModule.forFeature([Post])]
})
export class PostModule { }
