import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "./core/timestamps";
import { Image } from "./image";
import { Language } from "./language";

@Entity()
export class InstagramPost extends Timestamps {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id?: number

    @OneToOne(() => Image, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn()
    // @ApiProperty()
    image?: Image

    @Column()
    @ApiProperty()
    postLink?: string

    @Column({ default: true })
    @ApiProperty()
    isActive?: boolean

    @ManyToOne(() => Language, language => language.instagramPosts)
    language?: Language
}