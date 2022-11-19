import { Slide } from '@apicore/teiu/lib/typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryBannerHelper } from 'src/helpers/cloudinary/CloudinarySlideHelper';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { SlideController } from './slide.controller';
import { SlideService } from './slide.service';

@Module({
  controllers: [SlideController],
  providers: [SlideService, CloudinaryService, CloudinaryBannerHelper],
  imports: [TypeOrmModule.forFeature([Slide])],
  exports: [TypeOrmModule]
})
export class SlideModule { }
