import { ProductBrandDTO } from "@apidevteam/core-teiu/lib";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductBrand } from "src/entities/product/product-brand";
import { Repository } from "typeorm";

@Injectable()
export class SaveBrandValidation {

    private productBrand: ProductBrand | ProductBrandDTO

    constructor(
        @InjectRepository(ProductBrand)
        private readonly productBrandRepository: Repository<ProductBrand>
    ) { }

    public async validate(productBrand: ProductBrand | ProductBrandDTO) {
        this.productBrand = productBrand

        await this.validateTitle()
    }

    private async validateTitle() {
        if (!this.productBrand.title)
            throw new BadRequestException('O título da marca deve ser informado')

        const matchingBrands = await this.productBrandRepository.find({
            where: {
                title: this.productBrand.title,
                language: {
                    id: this.productBrand.language.id
                }
            }
        })

        if (matchingBrands.length > 0)
            throw new BadRequestException('Não é possível cadastrar duas marcas com o mesmo nome')
    }
}