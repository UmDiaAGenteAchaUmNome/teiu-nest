import { Filter } from '@apicore/nestjs/lib';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/entities/image';
import { Slide } from 'src/entities/slide';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { SaveSlideValidation } from 'src/validations/save-slide.validation';
import { SlideController } from './slide.controller';
import { SlideService } from './slide.service';

@Module({
  controllers: [SlideController],
  providers: [SlideService, CloudinaryService, SaveSlideValidation, Filter],
  imports: [TypeOrmModule.forFeature([Slide, Image])],
  exports: [TypeOrmModule]
})
export class SlideModule { }
