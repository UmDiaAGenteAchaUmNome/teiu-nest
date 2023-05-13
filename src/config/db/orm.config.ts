import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccordionItem } from "src/entities/accordion-item";
import { Featured } from "src/entities/featured";
import { GalleryItem } from "src/entities/gallery-item";
import { Image } from "src/entities/image";
import { Post } from "src/entities/post";
import { Product } from "src/entities/product/product";
import { ProductAmbient } from "src/entities/product/product-ambient";
import { ProductBrand } from "src/entities/product/product-brand";
import { ProductCategory } from "src/entities/product/product-category";
import { ProductDetail } from "src/entities/product/product-detail";
import { Project } from "src/entities/project/project";
import { ProjectCategory } from "src/entities/project/project-category";
import { Slide } from "src/entities/slide";
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
                ProductDetail,
                ProductAmbient,
                ProductCategory,
                ProductBrand,
                Slide,
                User,
                Post,
                Project,
                ProjectCategory,
                GalleryItem,
                AccordionItem,
                Image,
                Featured
            ]
        }),
    ],
    exports: [
        TypeOrmModule
    ]
})
export class OrmConfig { }