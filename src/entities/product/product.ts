import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "../core/timestamps";
import { Language } from "../language";
import { ProductAmbient } from "./product-ambient";
import { ProductBrand } from "./product-brand";
import { ProductCategory } from "./product-category";
import { ProductDetail } from "./product-detail";

@Entity()
export class Product extends Timestamps {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    title?: string

    @Column()
    subtitle?: string

    @Column("text")
    description?: string

    @Column()
    altDescription?: string

    @ManyToOne(() => ProductCategory, (category) => category.products)
    category?: ProductCategory

    @ManyToOne(() => ProductAmbient, (ambient) => ambient.products)
    ambient?: ProductAmbient

    @ManyToOne(() => ProductBrand, (brand) => brand.products)
    brand?: ProductBrand

    @OneToMany(() => ProductDetail, (detail) => detail.product, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    details?: ProductDetail[]

    @ManyToOne(() => Language, language => language.products)
    language?: Language

}