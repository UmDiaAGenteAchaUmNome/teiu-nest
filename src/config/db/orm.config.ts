import { AccordionItem, Category, GalleryItem, Post, Product, Slide, Tip, User } from "@apicore/teiu/lib/typeorm";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
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
                AccordionItem
            ]
        }),
    ],
    exports: [
        TypeOrmModule
    ]
})
export class OrmConfig { }