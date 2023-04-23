import { Filter } from '@apicore/nestjs/lib';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/entities/image';
import { Product } from 'src/entities/product/product';
import { ProductDetail } from 'src/entities/product/product-detail';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
    controllers: [ProductController],
    providers: [ProductService, CloudinaryService, Filter],
    imports: [TypeOrmModule.forFeature([Product, ProductDetail, Image])],
    exports: [TypeOrmModule]
})
export class ProductModule { }
