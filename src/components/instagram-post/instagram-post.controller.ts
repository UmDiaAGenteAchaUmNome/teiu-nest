import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { InstagramPost } from 'src/entities/instagram-post';
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
    public async saveInstagramPost(@Body() instagramPost: InstagramPost) {
        return await this.instagramPostService.save(instagramPost)
    }

    @Delete(':id')
    public async deleteInstagramPost(@Param('id') id: number) {
        return await this.instagramPostService.delete(id)
    }

}
