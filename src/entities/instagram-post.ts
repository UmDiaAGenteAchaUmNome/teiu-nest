import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "./core/timestamps";
import { Image } from "./image";

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

    @Column()
    @ApiProperty()
    isActive?: boolean
}