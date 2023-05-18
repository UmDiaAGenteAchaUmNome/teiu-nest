import { Module } from '@nestjs/common';
import { ProductDetailController } from './product-detail.controller';
import { ProductDetailService } from './product-detail.service';
import { ImageService } from 'src/components/image/image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetail } from 'src/entities/product/product-detail';
import { Image } from 'src/entities/image';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';

@Module({
  controllers: [ProductDetailController],
  providers: [ProductDetailService, ImageService, CloudinaryService],
  imports: [TypeOrmModule.forFeature([ProductDetail, Image])],
  exports: [TypeOrmModule]
})
export class ProductDetailModule {}
