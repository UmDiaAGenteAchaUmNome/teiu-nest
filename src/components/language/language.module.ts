import { Filter } from '@apicore/nestjs/lib/helpers/index';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/entities/image';
import { Language } from 'src/entities/language';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { ImageService } from '../image/image.service';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';

@Module({
  controllers: [LanguageController],
  providers: [LanguageService, ImageService, CloudinaryService, Filter],
  imports: [TypeOrmModule.forFeature([Language, Image])],
  exports: [TypeOrmModule, CloudinaryService, ImageService, LanguageService]
})
export class LanguageModule { }
