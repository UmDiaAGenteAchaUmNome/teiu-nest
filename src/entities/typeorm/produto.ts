import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "./scaffold/timestamps";

@Entity()
export class Produto extends Timestamps {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    titulo: string

    @Column("text")
    descricao: string

    @Column()
    imagem: string

    @Column()
    imagemBanner?: string

    @Column()
    linkMarketplace?: string
}