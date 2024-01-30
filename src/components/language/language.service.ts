import { Filter } from '@apicore/nestjs/lib/helpers/index';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/entities/image';
import { Language } from 'src/entities/language';
import { LanguageDTO } from 'src/entities/tmp/dtos/language.dto';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { ImageService } from '../image/image.service';

@Injectable()
export class LanguageService {

    relations: string[] = ['flagImage']

    constructor(
        @InjectRepository(Language)
        private readonly repository: Repository<Language>,

        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,

        private readonly cloudinaryRepository: CloudinaryService,
        private readonly filter: Filter,
        private readonly imageService: ImageService
    ) { }

    public async listLanguages(filters?: Language) {
        return await this.repository.find({
            where: this.filter.build(filters),
            relations: this.relations
        })
    }

    public async findLanguageById(languageId: number) {
        return await this.repository.findOne({
            where: { id: languageId },
            relations: this.relations
        })
    }

    public async getPorgueseLanguage() {
        return await this.repository.findOne({
            where: { acronym: 'br' },
            relations: this.relations
        })
    }

    public async saveLanguage(language: LanguageDTO) {
        language = await this.saveCloudinaryImage(language)
        return await this.repository.save(language)
    }

    public async deleteLanguage(languageId: number) {
        const language: Language = await this.findLanguageById(languageId)

        if (!language)
            throw new BadRequestException("Idioma Inválido")

        await this.repository.delete(languageId)

        if (language.flagImage)
            await this.imageService.deleteImage(language.flagImage)
    }

    private async saveCloudinaryImage(language: LanguageDTO) {
        if (language.flagImage && language.flagImage.base64src) {
            language.flagImage = await this.cloudinaryRepository.uploadImageDto(language.flagImage, `/flags`)
            await this.imageRepository.save(language.flagImage)
        }

        return language
    }

}
