import { Filter } from '@apidevteam/core-nestjs/lib/helpers/index';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/entities/image';
import { Language } from 'src/entities/language';
import { LanguageDTO } from 'src/entities/tmp/dtos/language.dto';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { ImageService } from '../image/image.service';

import br from 'src/assets/languages/br.json';
import us from 'src/assets/languages/us.json';

@Injectable()
export class LanguageService {

    private readonly logger = new Logger(LanguageService.name)

    relations: string[] = ['flagImage']
    defaultLanguages: string[] = ['us', 'br']

    constructor(
        @InjectRepository(Language)
        private readonly repository: Repository<Language>,

        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,

        private readonly cloudinaryRepository: CloudinaryService,
        private readonly filter: Filter,
        private readonly imageService: ImageService
    ) {
        this.createDefaultLanguages()
    }

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
        return await this.getLanguageByAcronym('br')
    }

    private async getLanguageByAcronym(acronym: string) {
        return await this.repository.findOne({
            where: { acronym: acronym },
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

    public async getLanguageStaticTexts() {
        return {
            br: br,
            us: us
        }
    }

    public async getLanguageTexts(languageIdentifier: string) {
        switch (languageIdentifier) {
            case 'br':
                return br
            case 'us':
                return us
            default:
                throw new BadRequestException("Idioma não encontrado")
        }
    }

    public async saveLanguageStaticTexts(languageTexts: any): Promise<void> {
        const fileReader = require('fs')

        fileReader.writeFile('src/assets/languages/br.json', JSON.stringify(languageTexts.br), (err) => {
            console.error(err)
        })

        fileReader.writeFile('src/assets/languages/us.json', JSON.stringify(languageTexts.us), (err) => {
            console.error(err)
        })
    }

    private async createDefaultLanguages() {

        console.log(`Checking default languages: [${this.defaultLanguages}]`)

        const brLanguage: LanguageDTO = {
            acronym: 'BR',
            title: 'Português',
            flagImage: {
                link: 'http://res.cloudinary.com/arpdevs-tecnologia/image/upload/v1706376324/teiu/flags/language-portugues.png.png',
                publicId: 'teiu/flags/language-portugues.png',
                title: 'br_flag'
            }
        }
        const usLanguage: LanguageDTO = {
            acronym: 'US',
            title: 'English',
            flagImage: {
                link: 'http://res.cloudinary.com/arpdevs-tecnologia/image/upload/v1706376369/teiu/flags/language-english.png.png',
                publicId: 'teiu/flags/language-english.png',
                title: 'usa_flag'
            }
        }

        const brLanguageDB = await this.getLanguageByAcronym(brLanguage.acronym)
        console.log('BR language: ' + brLanguageDB)
        const usLanguageDB = await this.getLanguageByAcronym(usLanguage.acronym)
        console.log('US language: ' + usLanguageDB)

        if (!brLanguageDB) {
            console.log(`${brLanguage.acronym} not created. Creating...`)
            await this.saveLanguage(brLanguage)
        }

        if (!usLanguageDB) {
            console.log(`${usLanguage.acronym} not created. Creating...`)
            await this.saveLanguage(usLanguage)
        }

    }

    private async saveCloudinaryImage(language: LanguageDTO) {
        if (language.flagImage && language.flagImage.base64src) {
            language.flagImage = await this.cloudinaryRepository.uploadImageDto(language.flagImage, `/flags`)
            await this.imageRepository.save(language.flagImage)
        }

        return language
    }

}
