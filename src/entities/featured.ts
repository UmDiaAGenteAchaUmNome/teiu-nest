import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "./core/timestamps";
import { Image } from "./image";
import { ProductCategory } from "./product/product-category";

@Entity()
export class Featured extends Timestamps {

    @PrimaryGeneratedColumn()
    id?: number

    @OneToOne(() => Image, { cascade: true })
    @ApiProperty()
    @JoinColumn()
    image?: Image

    @Column()
    title?: string

    @Column()
    subtitle?: string

    @Column()
    description?: string

    @ManyToOne(() => ProductCategory, (category) => category.products)
    // @ApiProperty()
    category?: ProductCategory
}