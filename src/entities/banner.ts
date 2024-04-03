import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "./image";
import { Language } from "./language";

@Entity()
export class Banner {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    title?: string

    @Column({ nullable: true })
    link?: string

    @Column({ nullable: true })
    buttonColor?: string

    @Column({ nullable: true })
    buttonText?: string

    @Column({ nullable: true })
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