import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { Language } from 'src/entities/language';
import { LanguageDTO } from 'src/entities/tmp/dtos/language.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
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

    @Get("/static")
    @UseGuards(JwtGuard)
    public async getLanguageTexts() {
        return await this.languageService.getLanguageStaticTexts()
    }

    @Get("/static/:language")
    public async getLanguageText(@Param('language') languageIdentifier) {
        return await this.languageService.getLanguageTexts(languageIdentifier)
    }

    @UseGuards(JwtGuard)
    @Post("/static")
    public async saveLanguageTexts(@Body() languageTexts: any) {
        return await this.languageService.saveLanguageStaticTexts(languageTexts)
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
    @UseGuards(JwtGuard)
    public async saveLanguage(@Body() language?: LanguageDTO) {
        return await this.languageService.saveLanguage(language)
    }

    @Delete('/:id')
    @UseGuards(JwtGuard)
    public async deleteLanguage(@Param('id') languageId: number) {
        return await this.languageService.deleteLanguage(languageId)
    }
}
