import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "./image";
import { Language } from "./language";

@Entity()
export class Banner {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    title?: string

    @Column()
    link?: string

    @Column()
    buttonColor?: string

    @Column()
    buttonText?: string

    @Column()
    buttonTextColor?: string

    @Column({ default: true })
    isActive?: boolean

    @OneToOne(() => Image, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn()
    image?: Image

    @ManyToOne(() => Language, language => language.banner)
    language?: Language

}