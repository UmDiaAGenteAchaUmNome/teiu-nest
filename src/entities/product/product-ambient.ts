import { ApiProperty } from "@nestjs/swagger"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Timestamps } from "../core/timestamps"
import { Product } from "./product"

@Entity()
export class ProductAmbient extends Timestamps {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id?: number

    @ApiProperty()
    @Column()
    title?: string

    @OneToMany(() => Product, (product) => product.ambient)
    @ApiProperty()
    products?: Product[]
}