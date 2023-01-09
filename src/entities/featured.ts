import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "./core/timestamps";
import { Image } from "./image";

@Entity()
export class Featured extends Timestamps {

    @PrimaryGeneratedColumn()
    id?: number

    @OneToOne(() => Image, { cascade: true })
    @ApiProperty()
    @JoinColumn()
    image?: Image

    @Column()
    title?: string

    @Column()
    subtitle?: string
}