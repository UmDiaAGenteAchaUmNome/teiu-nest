import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "./scaffold/timestamps";

@Entity()
export class Product extends Timestamps {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    subtitle: string

    @Column("text")
    description: string

    @Column()
    image: string

    @Column()
    bannerImage?: string

    @Column()
    routerLink?: string

    @Column()
    altDescription?: string
}