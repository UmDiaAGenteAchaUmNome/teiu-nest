import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filter } from 'src/entities/typeorm/filter/filter.orm';
import { Product } from 'src/entities/typeorm/product';
import { CloudinaryProductHelper } from 'src/helpers/cloudinary/CloudinaryProductHelper';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
    controllers: [ProductController],
    providers: [ProductService, CloudinaryService, CloudinaryProductHelper, Filter],
    imports: [TypeOrmModule.forFeature([Product])],
    exports: [TypeOrmModule]
})
export class ProductModule {}
