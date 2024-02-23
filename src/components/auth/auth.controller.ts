import { LoginResponseDTO, UserDTO } from '@apidevteam/core-teiu/lib';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
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
