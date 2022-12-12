import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filter } from 'src/entities/core/filter';
import { GalleryItem } from 'src/entities/gallery-item';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { GalleryItemController } from './gallery-item.controller';
import { GalleryItemService } from './gallery-item.service';

@Module({
  controllers: [GalleryItemController],
  providers: [GalleryItemService, Filter, CloudinaryService],
  imports: [TypeOrmModule.forFeature([GalleryItem])]
})
export class GalleryItemModule { }
