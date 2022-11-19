import { User } from '@apicore/teiu/lib/typeorm';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
// @UseGuards(JwtGuard)
export class UserController {

    constructor(
        private readonly service: UserService
    ) { }

    @Get()
    public async listUsers(@Query() filters?: User): Promise<User[]> {
        return await this.service.listUsers(filters)
    }

    @Get(':id')
    public async getUserById(@Param('id') userId: number): Promise<User> {
        return await this.service.getUserById(userId)
    }

    @Post()
    public async createUser(@Body() user: User): Promise<User> {
        return await this.service.createUser(user)
    }

    @Put(':id')
    public async updateUser(@Param('id') userId: number, @Body() user: User): Promise<User> {
        return await this.service.updateUser(userId, user)
    }

    @Delete(':id')
    public async deleteUser(@Param('id') userId: number): Promise<void> {
        await this.service.deleteUser(userId)
    }
}
