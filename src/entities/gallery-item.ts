import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "./core/timestamps";
import { Image } from "./image";

@Entity()
export class GalleryItem extends Timestamps {
    @PrimaryGeneratedColumn()
    id?: number

    @OneToOne(() => Image)
    image?: Image

    @Column()
    title?: string;
};