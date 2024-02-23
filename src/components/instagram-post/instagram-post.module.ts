import { Filter } from '@apidevteam/core-nestjs/lib/helpers/index';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstagramPost } from 'src/entities/instagram-post';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { InstagramPostController } from './instagram-post.controller';
import { InstagramPostService } from './instagram-post.service';

@Module({
  controllers: [InstagramPostController],
  providers: [InstagramPostService, Filter, CloudinaryService],
  imports: [TypeOrmModule.forFeature([InstagramPost])]
})
export class InstagramPostModule { }
