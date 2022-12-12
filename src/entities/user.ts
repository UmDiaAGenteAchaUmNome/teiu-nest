import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "./core/timestamps";

@Entity()
export class User extends Timestamps {

    @PrimaryGeneratedColumn()
    id?: number

    @Column({ nullable: false })
    user?: string

    @Column({ nullable: false, length: 100 })
    password?: string

    @Column({ nullable: false })
    name?: string

    @Column()
    phone?: string

}