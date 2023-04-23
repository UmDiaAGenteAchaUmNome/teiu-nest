import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "../core/timestamps";
import { ProductAmbient } from "./product-ambient";
import { ProductBrand } from "./product-brand";
import { ProductCategory } from "./product-category";
import { ProductDetail } from "./product-detail";
import { ProductLine } from "./product-line";

@Entity()
export class Product extends Timestamps {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id?: number

    @Column()
    @ApiProperty()
    title?: string

    @Column()
    @ApiProperty()
    subtitle?: string

    @Column("text")
    @ApiProperty()
    description?: string

    @Column()
    @ApiProperty()
    altDescription?: string

    @ManyToOne(() => ProductCategory, (category) => category.products)
    @ApiProperty()
    category?: ProductCategory

    @ManyToOne(() => ProductLine, (productLine) => productLine.products)
    @ApiProperty()
    productLine?: ProductLine

    @ManyToOne(() => ProductAmbient, (ambient) => ambient.products)
    @ApiProperty()
    ambient?: ProductAmbient

    @ManyToOne(() => ProductBrand, (brand) => brand.products)
    @ApiProperty()
    brand?: ProductBrand

    @OneToMany(() => ProductDetail, (detail) => detail.product, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @ApiProperty()
    details?: ProductDetail[]

}