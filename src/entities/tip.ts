import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "./core/timestamps";
import { Image } from "./image";
import { User } from "./user";

@Entity()
export class Tip extends Timestamps {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    title?: string;

    @Column()
    subtitle?: string;

    @Column()
    description?: string;

    @Column()
    author?: string;

    @Column({ type: 'text' })
    post?: string;

    @OneToOne(() => Image, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn()
    image?: Image

    @Column()
    routerLink?: string;

    @ManyToOne(() => User)
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user?: User
};