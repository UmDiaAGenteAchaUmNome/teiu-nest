import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "./core/timestamps";
import { Image } from "./image";

@Entity()
export class Post extends Timestamps {
    @PrimaryGeneratedColumn()
    id?: number

    @OneToOne(() => Image)
    image?: Image;

    @Column()
    routerLink?: string;
}