import { ApiProperty } from "@nestjs/swagger"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./product"

@Entity()
export class Brand {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id?: number

    @Column()
    @ApiProperty()
    title?: string

    @OneToMany(() => Product, (product) => product.brand)
    @ApiProperty()
    products: Product[]
}