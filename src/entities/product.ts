import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category";
import { Timestamps } from "./core/timestamps";
import { Image } from "./image";
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

    @ManyToMany(() => Image, { cascade: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinTable()
    images?: Image[]

    @Column()
    routerLink?: string

    @Column()
    altDescription?: string

    @ManyToOne(() => Category, (category) => category.products)
    category?: Category

    @OneToMany(() => ProductDetail, (detail) => detail.product)
    details?: ProductDetail[]

}