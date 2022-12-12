import { Body, Controller, Delete, Get, Param, Post as HttpPost, Put, Query, UseGuards } from '@nestjs/common';
import { Post } from 'src/entities/post';
import { JwtGuard } from 'src/guards/jwt.guard';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService) { }

    @Get()
    public async searchPosts(@Query() filters?: Post) {
        return await this.postService.search(filters)
    }

    @Get(':id')
    public async findPostById(@Param('id') postId: number) {
        return await this.postService.findById(postId)
    }

    @HttpPost()
    @UseGuards(JwtGuard)
    public async createPost(@Body() post: Post) {
        return await this.postService.save(post)
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    public async updatePost(@Param('id') postId: number, @Body() post: Post) {
        return await this.postService.update(postId, post)
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    public async deletePost(@Param('id') postId: number) {
        await this.postService.delete(postId)
    }
}
