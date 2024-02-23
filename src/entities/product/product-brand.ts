import { ApiProperty } from "@nestjs/swagger"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Timestamps } from "../core/timestamps"
import { Language } from "../language"
import { Product } from "./product"

@Entity()
export class ProductBrand extends Timestamps {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id?: number

    @Column()
    @ApiProperty()
    title?: string

    @OneToMany(() => Product, (product) => product.brand)
    @ApiProperty()
    products: Product[]

    @ManyToOne(() => Language, language => language.productBrands)
    language?: Language
}