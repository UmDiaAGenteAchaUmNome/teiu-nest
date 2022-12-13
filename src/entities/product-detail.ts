import { ApiProperty } from "@nestjs/swagger/dist";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "./core/timestamps";
import { Product } from "./product";
import { ProductDetailItem } from "./product-detail-item";

@Entity()
export class ProductDetail extends Timestamps {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id?: number

    @Column()
    @ApiProperty()
    title?: string

    @ManyToOne(() => Product, (product) => product.details, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @ApiProperty()
    product?: Product

    @OneToMany(() => ProductDetailItem, (item) => item.productDetail, {
        cascade: true,
        onUpdate: 'CASCADE'
    })
    @ApiProperty()
    @JoinColumn({ name: "detailId" })
    details?: ProductDetailItem[]
}