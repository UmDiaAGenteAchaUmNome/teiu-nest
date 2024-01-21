import { ApiProperty } from "@nestjs/swagger/dist";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "../core/timestamps";
import { Image } from "../image";
import { Language } from "../language";
import { User } from "../user";
import { ProjectCategory } from "./project-category";

@Entity()
export class Project extends Timestamps {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    @ApiProperty()
    title?: string;

    @Column()
    subtitle?: string;

    @Column()
    description?: string;

    @Column()
    author?: string;

    @Column({ type: 'longtext' })
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

    @ManyToOne(() => ProjectCategory, (projectCategory) => projectCategory.projects)
    projectCategory?: ProjectCategory

    @ManyToOne(() => Language, language => language.projects)
    language?: Language
};