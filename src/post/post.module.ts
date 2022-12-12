import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filter } from 'src/entities/core/filter';
import { Post } from 'src/entities/post';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService, Filter],
  imports: [TypeOrmModule.forFeature([Post])]
})
export class PostModule { }
