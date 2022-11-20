import { Filter, GalleryItem } from '@apicore/teiu/lib';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryItemController } from './gallery-item.controller';
import { GalleryItemService } from './gallery-item.service';

@Module({
  controllers: [GalleryItemController],
  providers: [GalleryItemService, Filter],
  imports: [TypeOrmModule.forFeature([GalleryItem])]
})
export class GalleryItemModule { }
