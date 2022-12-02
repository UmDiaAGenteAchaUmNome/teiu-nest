import { LoginResponseDTO, UserDTO } from '@apicore/teiu/lib';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    public async login(@Body() user: UserDTO): Promise<LoginResponseDTO> {
        return await this.authService.login(user)
    }
}
