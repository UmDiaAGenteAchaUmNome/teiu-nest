import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Timestamps } from "./scaffold/timestamps"

@Entity()
export class Banner extends Timestamps {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    subtitle: string

    @Column("text")
    description: string

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

    @Column()
    bgImage: string

    @Column()
    image: string

    @Column()
    active: boolean = true

    @Column()
    routerLink: string

    @Column()
    altDescription?: string
}   