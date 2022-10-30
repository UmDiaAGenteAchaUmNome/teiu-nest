import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from "src/entities/typeorm/banner";
import { Product } from "src/entities/typeorm/product";
import { User } from "src/entities/typeorm/user";

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
                Banner,
                User
            ]
        }),
    ],
    exports: [
        TypeOrmModule
    ]
})
export class OrmConfig {}