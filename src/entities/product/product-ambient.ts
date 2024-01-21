import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Timestamps } from "../core/timestamps"
import { Language } from "../language"
import { Product } from "./product"

@Entity()
export class ProductAmbient extends Timestamps {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    title?: string

    @OneToMany(() => Product, (product) => product.ambient)
    products?: Product[]

    @ManyToOne(() => Language, language => language.productAmbients)
    @JoinColumn()
    language?: Language
}