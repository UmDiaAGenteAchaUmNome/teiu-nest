import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Timestamps } from "./core/timestamps"
import { Image } from "./image"

@Entity()
export class Slide extends Timestamps {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    title?: string

    @Column()
    subtitle?: string

    @Column("text")
    description?: string

    @Column()
    colorSubtitle?: string

    @Column()
    color?: string

    @Column()
    btnTitle?: string

    @Column()
    btnColor?: string

    @Column()
    btnBgColor?: string

    @OneToOne(() => Image, { cascade: true })
    @JoinColumn()
    image?: Image

    @OneToOne(() => Image, { cascade: true })
    @JoinColumn()
    bgImage?: Image

    @Column({ default: true })
    active?: boolean

    @Column()
    routerLink?: string

    @Column()
    altDescription?: string
}   