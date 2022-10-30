import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO } from 'src/entities/dtos/login.dto';
import { User } from 'src/entities/typeorm/user';
import { CryptHelper } from 'src/helpers/auth/crypt.helper';
import { JwtGenerator } from 'src/helpers/auth/jwt/jwt.generator';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly jwtGenerator: JwtGenerator,
        private readonly crypt: CryptHelper
    ) {}

    public async login(user: User): Promise<LoginDTO> {
        this.isUserValid(user)

        let loggedUser = await this.userRepository.findOneBy({ user: user.name })
        this.isUserValid(loggedUser)

        if(!await this.crypt.valuesMatch(loggedUser.password, user.password))
            throw new BadRequestException('CPF ou Senha inválidos')

        return new LoginDTO().build(loggedUser, this.jwtGenerator.generate(loggedUser))
    }

    private isUserValid(user: User): boolean {
        if (!user || !user.password)
            throw new BadRequestException('CPF ou Senha inválidos')
        
        return true
    }
}
