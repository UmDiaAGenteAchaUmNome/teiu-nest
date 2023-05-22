import { SlideDTO } from "@apicore/teiu/lib";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Image } from "src/entities/image";
import { Slide } from "src/entities/slide";
import { Repository } from "typeorm";

@Injectable()
export class SaveSlideValidation {

    slide: SlideDTO

    constructor(
        @InjectRepository(Slide)
        private readonly slideRepository: Repository<Slide>,
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>
    ) { }

    public async validate(slide: Slide | SlideDTO): Promise<void> {
        this.slide = slide

        await this.validateTitle()
        this.validateSubtitle()
        this.validateDescription()
        this.validateSubtitleColor()
        this.validateTitleColor()
        this.validateButtonTitle()
        this.validateButtonColor()
        this.validateButtonBackgroundColor()
        await this.validateBackgroundImage()
        await this.validateImage()
    }

    private async validateTitle() {
        if (!this.slide.title)
            throw new BadRequestException('Título do slide não pode estar vazio')

        const matchingSlides = await this.slideRepository.find({ where: { title: this.slide.title } })

        if (matchingSlides.length > 0 && matchingSlides[0].id != this.slide.id)
            throw new BadRequestException('Não é possível ter slides com nomes duplicados')
    }

    private validateSubtitle() {
        if (!this.slide.subtitle)
            throw new BadRequestException('Subtítulo do slide não pode estar vazio')
    }

    private validateDescription() {
        if (!this.slide.description)
            throw new BadRequestException('Descrição do slide não pode estar vazia')
    }

    private validateSubtitleColor() {
        if (!this.slide.colorSubtitle)
            throw new BadRequestException('Cor do Subtítulo não pode estar vazia')
    }

    private validateTitleColor() {
        if (!this.slide.colorSubtitle)
            throw new BadRequestException('Cor do Título não pode estar vazia')
    }

    private validateButtonTitle() {
        if (!this.slide.btnTitle)
            throw new BadRequestException('Título do Botão não pode estar vazio')
    }

    private validateButtonColor() {
        if (!this.slide.colorSubtitle)
            throw new BadRequestException('Cor do Botão não pode estar vazia')
    }

    private validateButtonBackgroundColor() {
        if (!this.slide.colorSubtitle)
            throw new BadRequestException('Cor de fundo do Botão não pode estar vazia')
    }

    private async validateBackgroundImage() {
        if (!this.slide.bgImage)
            throw new BadRequestException('Imagem de fundo do slide não pode estar vazia')

        if (!this.slide.bgImage.base64src && !this.slide.bgImage.link)
            throw new BadRequestException('Imagem de fundo do slide não pode estar vazia')

        if (!this.slide.bgImage.title)
            throw new BadRequestException('Título da imagem de fundo do slide não pode ser vazio')

        const matchingImages = await this.imageRepository.findBy({ title: `${this.slide.title}_${this.slide.bgImage.title}` })

        if (matchingImages.length > 0) {
            if (!this.slide.bgImage.id) {
                throw new BadRequestException('Não é possível cadastrar a mesma imagem mais de uma vez')
            }

            matchingImages.forEach(matchingImage => {

                if (matchingImage.id != this.slide.bgImage.id)
                    throw new BadRequestException('Não é possível cadastrar a mesma imagem mais de uma vez')
            })
        }
    }

    private async validateImage() {
        if (!this.slide.image)
            throw new BadRequestException('Imagem de fundo do slide não pode estar vazia')

        if (!this.slide.image.base64src && !this.slide.image.link)
            throw new BadRequestException('Imagem de fundo do slide não pode estar vazia')

        if (!this.slide.image.title)
            throw new BadRequestException('Título da imagem de fundo do slide não pode ser vazio')

        const matchingImages = await this.imageRepository.findBy({ title: `${this.slide.title}_${this.slide.image.title}` })

        if (matchingImages.length > 0) {
            if (!this.slide.image.id) {
                console.log('id')
                throw new BadRequestException('Não é possível cadastrar a mesma imagem mais de uma vez')
            }

            matchingImages.forEach(matchingImage => {
                console.log('loop')

                if (matchingImage.id != this.slide.image.id)
                    throw new BadRequestException('Não é possível cadastrar a mesma imagem mais de uma vez')
            })
        }
    }

}