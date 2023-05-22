import { ApiProperty } from "@nestjs/swagger/dist"
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Timestamps } from "./core/timestamps"
import { Image } from "./image"

@Entity()
export class Slide extends Timestamps {

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

    @Column()
    @ApiProperty()
    colorSubtitle?: string

    @Column()
    @ApiProperty()
    color?: string

    @Column()
    @ApiProperty()
    btnTitle?: string

    @Column()
    @ApiProperty()
    btnColor?: string

    @Column()
    @ApiProperty()
    btnBgColor?: string

    @OneToOne(() => Image, {onDelete: 'CASCADE'})
    @JoinColumn()
    @ApiProperty()
    image?: Image

    @OneToOne(() => Image)
    @JoinColumn()
    @ApiProperty()
    bgImage?: Image

    @Column({ default: true })
    @ApiProperty()
    active?: boolean

    @Column()
    @ApiProperty()
    routerLink?: string

    @Column()
    @ApiProperty()
    altDescription?: string
}   