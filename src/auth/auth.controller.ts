import { LoginResponseDTO } from '@apicore/teiu/lib';
import { User } from '@apicore/teiu/lib/typeorm';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    public async login(@Body() user: User): Promise<LoginResponseDTO> {
        return await this.authService.login(user)
    }
}
