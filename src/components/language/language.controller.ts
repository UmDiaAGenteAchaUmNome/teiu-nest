import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { Language } from 'src/entities/language';
import { LanguageDTO } from 'src/entities/tmp/dtos/language.dto';
import { LanguageService } from './language.service';

@Controller('language')
export class LanguageController {

    constructor(
        private readonly languageService: LanguageService
    ) { }

    @Get()
    public async listLanguages(@Query() filters?: Language) {
        return await this.languageService.listLanguages(filters)
    }

    @Get('/:id')
    public async findLanguageById(@Param('id') languageId) {
        return await this.languageService.findLanguageById(languageId)
    }

    @Get('/portuguese')
    public async getPortugueseLanguage() {
        return await this.languageService.getPorgueseLanguage()
    }

    @Post()
    public async saveLanguage(@Body() language?: LanguageDTO) {
        return await this.languageService.saveLanguage(language)
    }

    @Delete('/:id')
    public async deleteLanguage(@Param('id') languageId: number) {
        return await this.languageService.deleteLanguage(languageId)
    }
}
