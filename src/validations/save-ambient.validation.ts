import { ProductAmbientDTO } from "@apidevteam/core-teiu/lib";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductAmbient } from "src/entities/product/product-ambient";
import { Repository } from "typeorm";

@Injectable()
export class SaveAmbientValidation {

    private ambient: ProductAmbient | ProductAmbientDTO

    constructor(
        @InjectRepository(ProductAmbient)
        private readonly productAmbientRepository: Repository<ProductAmbient>
    ) { }

    public async validate(ambient: ProductAmbient | ProductAmbientDTO) {
        this.ambient = ambient

        await this.validateTitle()
    }

    private async validateTitle() {
        if (!this.ambient.title)
            throw new BadRequestException('Título do ambiente deve ser informado')

        const duplicatedAmbients = await this.productAmbientRepository.find({
            where: {
                title: this.ambient.title,
                language: {
                    id: this.ambient.language.id
                }
            }
        })

        if (duplicatedAmbients.length > 0)
            throw new BadRequestException('Não é possível cadastrar dois ambientes com o mesmo nome')
    }
}