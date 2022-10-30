import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from 'src/entities/dtos/login.dto';
import { User } from 'src/entities/typeorm/user';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('login')
    public async login(@Body() user: User): Promise<LoginDTO> {
        return await this.authService.login(user)
    }
}
