import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "../core/timestamps";
import { Image } from "../image";
import { Product } from "./product";

@Entity()
export class ProductLine extends Timestamps {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id?: number

    @Column()
    @ApiProperty()
    title?: string

    @OneToOne(() => Image, { cascade: true })
    @ApiProperty()
    @JoinColumn()
    image?: Image

    @OneToMany(() => Product, (product) => product.productLine)
    @ApiProperty()
    products?: Product[]

}