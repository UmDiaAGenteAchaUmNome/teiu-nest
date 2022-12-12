import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Timestamps } from "./core/timestamps"
import { Product } from "./product"

@Entity()
export class Category extends Timestamps {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    title?: string

    @OneToMany(() => Product, (product) => product.category)
    products?: Product[]
}