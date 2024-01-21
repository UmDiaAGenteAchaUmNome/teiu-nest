import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "../core/timestamps";
import { Language } from "../language";
import { Project } from "./project";

@Entity()
export class ProjectCategory extends Timestamps {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    title?: string

    @OneToMany(() => Project, (project) => project.projectCategory)
    projects?: Project[]

    @ManyToOne(() => Language, language => language.projectCategories)
    language?: Language
}