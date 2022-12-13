import { ApiProperty } from "@nestjs/swagger/dist";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "./core/timestamps";

@Entity()
export class User extends Timestamps {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id?: number

    @Column({ nullable: false })
    @ApiProperty()
    user?: string

    @Column({ nullable: false, length: 100 })
    @ApiProperty()
    password?: string

    @Column({ nullable: false })
    @ApiProperty()
    name?: string

    @Column()
    @ApiProperty()
    phone?: string

}