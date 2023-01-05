import { ApiProperty } from "@nestjs/swagger/dist";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ambient } from "./ambient";
import { Category } from "./category";
import { Timestamps } from "./core/timestamps";
import { Image } from "./image";
import { ProductDetail } from "./product-detail";

@Entity()
export class Product extends Timestamps {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id?: number

    @Column()
    @ApiProperty()
    title?: string

    @Column()
    @ApiProperty()
    subtitle?: string

    @Column("text")
    @ApiProperty()
    description?: string

    @ManyToMany(() => Image, { cascade: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinTable()
    @ApiProperty()
    images?: Image[]

    @Column()
    @ApiProperty()
    routerLink?: string

    @Column()
    @ApiProperty()
    altDescription?: string

    @ManyToOne(() => Category, (category) => category.products)
    @ApiProperty()
    category?: Category

    @ManyToOne(() => Ambient, (ambient) => ambient.products)
    @ApiProperty()
    ambient?: Ambient

    @OneToMany(() => ProductDetail, (detail) => detail.product)
    @ApiProperty()
    details?: ProductDetail[]

}