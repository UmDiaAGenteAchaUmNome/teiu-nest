import { Filter } from '@apicore/nestjs/lib';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstagramPost } from 'src/entities/instagram-post';
import { InstagramPostController } from './instagram-post.controller';
import { InstagramPostService } from './instagram-post.service';

@Module({
  controllers: [InstagramPostController],
  providers: [InstagramPostService, Filter],
  imports: [TypeOrmModule.forFeature([InstagramPost])]
})
export class InstagramPostModule { }
