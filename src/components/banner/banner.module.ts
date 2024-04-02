import { Filter } from '@apidevteam/core-nestjs/lib';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from 'src/entities/banner';
import { Image } from 'src/entities/image';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { ImageService } from '../image/image.service';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';

@Module({
  controllers: [BannerController],
  providers: [BannerService, ImageService, Filter, CloudinaryService],
  imports: [TypeOrmModule.forFeature([Banner, Image])]
})
export class BannerModule { }
