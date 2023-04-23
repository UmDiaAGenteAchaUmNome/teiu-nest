import { ApiProperty } from "@nestjs/swagger/dist";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "../core/timestamps";
import { Image } from "../image";
import { User } from "../user";
import { ProjectCategory } from "./project-category";

@Entity()
export class Project extends Timestamps {
    @PrimaryGeneratedColumn()
    // @ApiProperty()
    id?: number

    @Column()
    @ApiProperty()
    title?: string;

    @Column()
    // @ApiProperty()
    subtitle?: string;

    @Column()
    // @ApiProperty()
    description?: string;

    @Column()
    // @ApiProperty()
    author?: string;

    @Column({ type: 'mediumtext' })
    // @ApiProperty()
    post?: string;

    @OneToOne(() => Image, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn()
    // @ApiProperty()
    image?: Image

    @Column()
    // @ApiProperty()
    routerLink?: string;

    @ManyToOne(() => User)
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    // @ApiProperty()
    user?: User

    @ManyToOne(() => ProjectCategory, (projectCategory) => projectCategory.projects)
    // @ApiProperty()
    projectCategory?: ProjectCategory
};