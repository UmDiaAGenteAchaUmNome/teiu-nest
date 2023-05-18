import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/entities/image'

@Module({
  controllers: [ImageController],
  providers: [ImageService, CloudinaryService],
  imports: [TypeOrmModule.forFeature([Image])],
  exports: [TypeOrmModule]
})
export class ImageModule {}
