import { ApiProperty } from "@nestjs/swagger/dist"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Timestamps } from "./core/timestamps"
import { Product } from "./product"

@Entity()
export class Category extends Timestamps {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id?: number

    @Column()
    @ApiProperty()
    title?: string

    @OneToMany(() => Product, (product) => product.category)
    @ApiProperty()
    products?: Product[]
}