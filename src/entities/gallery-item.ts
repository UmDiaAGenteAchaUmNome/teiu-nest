import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "./core/timestamps";
import { Image } from "./image";

@Entity()
export class GalleryItem extends Timestamps {
    @PrimaryGeneratedColumn()
    id?: number

    @OneToOne(() => Image, { cascade: true })
    @JoinColumn()
    image?: Image

    @Column()
    title?: string;
};