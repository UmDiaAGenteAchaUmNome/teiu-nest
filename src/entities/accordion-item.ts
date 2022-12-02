import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "./core/timestamps";

@Entity()
export class AccordionItem extends Timestamps {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    icon?: string;

    @Column()
    title: string;

    @Column()
    description: string;
};