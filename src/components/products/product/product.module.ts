import { Filter } from '@apicore/nestjs/lib';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product';
import { ProductDetail } from 'src/entities/product-detail';
import { ProductDetailItem } from 'src/entities/product-detail-item';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
    controllers: [ProductController],
    providers: [ProductService, CloudinaryService, Filter],
    imports: [TypeOrmModule.forFeature([Product, ProductDetail, ProductDetailItem])],
    exports: [TypeOrmModule]
})
export class ProductModule { }
