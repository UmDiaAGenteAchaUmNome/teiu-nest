import { ApiProperty } from "@nestjs/swagger/dist";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "./core/timestamps";
import { Image } from "./image";

@Entity()
export class GalleryItem extends Timestamps {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id?: number

    @OneToOne(() => Image, { cascade: true })
    @ApiProperty()
    @JoinColumn()
    image?: Image

    @Column()
    @ApiProperty()
    title?: string;
};