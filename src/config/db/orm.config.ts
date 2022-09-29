import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from "src/entities/typeorm/produto";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            // password: process.env.DB_PASS,
            database: process.env.DB_SCHEMA,
            synchronize: true,
            entities: [
                Produto
            ]
        }),
    ],
    exports: [
        TypeOrmModule
    ]
})
export class OrmConfig {}