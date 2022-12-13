import { ApiProperty } from "@nestjs/swagger/dist";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "./core/timestamps";

@Entity()
export class Image extends Timestamps {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id?: number

    @Column()
    @ApiProperty()
    title?: string

    @Column()
    @ApiProperty()
    link?: string

}