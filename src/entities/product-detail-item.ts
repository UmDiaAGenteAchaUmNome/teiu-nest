import { ApiProperty } from "@nestjs/swagger/dist";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "./core/timestamps";
import { ProductDetail } from "./product-detail";

@Entity()
export class ProductDetailItem extends Timestamps {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id?: number

    @Column()
    @ApiProperty()
    title?: string

    @Column({ nullable: true })
    @ApiProperty()
    description?: string

    @ManyToOne(() => ProductDetail, (detail) => detail.details)
    @ApiProperty()
    productDetail?: ProductDetail

}