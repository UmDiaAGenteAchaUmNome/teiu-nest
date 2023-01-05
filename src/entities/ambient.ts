import { ApiProperty } from "@nestjs/swagger"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./product"

@Entity()
export class Ambient {
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