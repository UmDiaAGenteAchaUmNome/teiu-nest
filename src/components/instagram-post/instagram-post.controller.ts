import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { InstagramPost } from 'src/entities/instagram-post';
import { InstagramPostDTO } from 'src/entities/tmp/dtos/instagram-post.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { InstagramPostService } from './instagram-post.service';

@Controller('instagram-post')
export class InstagramPostController {

    constructor(
        private readonly instagramPostService: InstagramPostService
    ) { }

    @Get()
    public async searchInstagramPosts(@Query() filters?: InstagramPost) {
        return await this.instagramPostService.search(filters)
    }

    @Get(':id')
    public async findInstagramPostById(@Param('id') id: number) {
        return await this.instagramPostService.findById(id)
    }

    @Post()
    @UseGuards(JwtGuard)
    public async saveInstagramPost(@Body() instagramPost: InstagramPostDTO) {
        return await this.instagramPostService.save(instagramPost)
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    public async deleteInstagramPost(@Param('id') id: number) {
        return await this.instagramPostService.delete(id)
    }

}
