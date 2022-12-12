import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "./core/timestamps";

@Entity()
export class Image extends Timestamps {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    title?: string

    @Column()
    link?: string

}