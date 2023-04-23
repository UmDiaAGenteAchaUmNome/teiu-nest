import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "../core/timestamps";
import { Project } from "./project";

@Entity()
export class ProjectCategory extends Timestamps {

    @PrimaryGeneratedColumn()
    // @ApiProperty()
    id?: number

    @Column()
    // @ApiProperty()
    title?: string

    @OneToMany(() => Project, (project) => project.projectCategory)
    // @ApiProperty()
    projects?: Project[]
}