import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "./core/timestamps";
import { Product } from "./product";
import { ProductDetailItem } from "./product-detail-item";

@Entity()
export class ProductDetail extends Timestamps {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    title?: string

    @ManyToOne(() => Product, (product) => product.details, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    product?: Product

    @OneToMany(() => ProductDetailItem, (item) => item.productDetail, {
        cascade: true,
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: "detailId" })
    details?: ProductDetailItem[]
}