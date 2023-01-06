import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccordionItem } from "src/entities/accordion-item";
import { Ambient } from "src/entities/ambient";
import { Brand } from "src/entities/brand";
import { Category } from "src/entities/category";
import { GalleryItem } from "src/entities/gallery-item";
import { Highlight } from "src/entities/highlight";
import { Image } from "src/entities/image";
import { Post } from "src/entities/post";
import { Product } from "src/entities/product";
import { ProductDetail } from "src/entities/product-detail";
import { ProductDetailItem } from "src/entities/product-detail-item";
import { Slide } from "src/entities/slide";
import { Tip } from "src/entities/tip";
import { User } from "src/entities/user";
@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_SCHEMA,
            synchronize: true,
            entities: [
                Product,
                Slide,
                User,
                Category,
                Post,
                Tip,
                GalleryItem,
                AccordionItem,
                Image,
                ProductDetail,
                ProductDetailItem,
                Brand,
                Ambient,
                Highlight
            ]
        }),
    ],
    exports: [
        TypeOrmModule
    ]
})
export class OrmConfig { }