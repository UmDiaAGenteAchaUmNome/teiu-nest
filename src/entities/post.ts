import { ApiProperty } from "@nestjs/swagger/dist";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "./core/timestamps";
import { Image } from "./image";

@Entity()
export class Post extends Timestamps {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id?: number

    @OneToOne(() => Image)
    @ApiProperty()
    image?: Image;

    @Column()
    @ApiProperty()
    routerLink?: string;
}