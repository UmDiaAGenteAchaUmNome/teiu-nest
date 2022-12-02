import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "./core/timestamps";
import { ProductDetail } from "./product-detail";

@Entity()
export class ProductDetailItem extends Timestamps {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    title?: string

    @Column()
    description?: string

    @ManyToOne(() => ProductDetail, (detail) => detail.details)
    productDetail?: ProductDetail

}