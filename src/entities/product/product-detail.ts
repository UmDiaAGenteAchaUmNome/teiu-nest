import { ApiProperty } from "@nestjs/swagger/dist";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "../core/timestamps";
import { Image } from "../image";
import { Product } from "./product";

@Entity()
export class ProductDetail extends Timestamps {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id?: number

    @Column()
    @ApiProperty()
    title?: string

    @Column({ type: 'text' })
    description?: string

    @ManyToOne(() => Product, (product) => product.details)
    @ApiProperty()
    product?: Product

    @OneToOne(() => Image, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @ApiProperty()
    @JoinColumn()
    image?: Image

}