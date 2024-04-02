import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccordionItem } from "./accordion-item";
import { Banner } from "./banner";
import { Timestamps } from "./core/timestamps";
import { Featured } from "./featured";
import { Image } from './image';
import { InstagramPost } from "./instagram-post";
import { Product } from "./product/product";
import { ProductAmbient } from "./product/product-ambient";
import { ProductBrand } from "./product/product-brand";
import { ProductCategory } from "./product/product-category";
import { Project } from "./project/project";
import { ProjectCategory } from "./project/project-category";
import { Slide } from "./slide";

@Entity()
export class Language extends Timestamps {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id?: number

    @Column()
    @ApiProperty()
    title?: string

    @Column()
    @ApiProperty()
    acronym?: string

    @OneToOne(() => Image, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn()
    flagImage?: Image

    /*Unnecessary Relations*/

    /*Products*/
    @OneToMany(() => ProductCategory, productCategory => productCategory.language)
    productCategories?: ProductCategory[]

    @OneToMany(() => ProductAmbient, productAmbient => productAmbient.language)
    productAmbients?: ProductAmbient[]

    @OneToMany(() => ProductBrand, productBrand => productBrand.language)
    productBrands?: ProductBrand[]

    @OneToMany(() => Product, product => product.language)
    products?: Product[]

    @OneToMany(() => Slide, slide => slide.language)
    slides?: Slide[]

    @OneToMany(() => InstagramPost, instagramPost => instagramPost.language)
    instagramPosts?: InstagramPost[]

    @OneToMany(() => Featured, featured => featured.language)
    featuredProducts?: Featured[]

    @OneToMany(() => AccordionItem, accordionItem => accordionItem.language)
    accordionItems?: AccordionItem[]

    /*Projects*/
    @OneToMany(() => Project, project => project.language)
    projects?: Project[]

    @OneToMany(() => ProjectCategory, projectCategory => projectCategory.language)
    projectCategories?: ProjectCategory[]

    @OneToMany(() => Banner, banner => banner.language)
    banner?: Banner[]
}