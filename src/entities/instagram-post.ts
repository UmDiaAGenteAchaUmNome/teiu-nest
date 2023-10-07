import { ApiProperty } from "@nestjs/swagger";
import { Column, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "./core/timestamps";

export class InstagramPost extends Timestamps {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id?: number

    @Column()
    @ApiProperty()
    postThumb?: string

    @Column()
    @ApiProperty()
    postLink?: string

    @Column()
    @ApiProperty()
    isActive?: boolean
}