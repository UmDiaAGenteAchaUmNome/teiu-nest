import { ApiProperty } from "@nestjs/swagger/dist"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Timestamps } from "../core/timestamps"
import { Language } from "../language"
import { Product } from "./product"

@Entity()
export class ProductCategory extends Timestamps {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id?: number

    @Column()
    @ApiProperty()
    title?: string

    @OneToMany(() => Product, (product) => product.category)
    @ApiProperty()
    products?: Product[]

    @ManyToOne(() => Language, language => language.productCategories)
    language?: Language
}