import { LoginResponseDTO, UserDTO } from '@apicore/teiu/lib';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { CryptHelper } from 'src/helpers/auth/crypt.helper';
import { JwtGenerator } from 'src/helpers/auth/jwt/jwt.generator';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    private readonly logger = new Logger(AuthService.name)

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly jwtGenerator: JwtGenerator,
        private readonly crypt: CryptHelper
    ) {
        this.createDefaultUser()
    }

    public async login(user: UserDTO): Promise<LoginResponseDTO> {
        this.isUserValid(user)

        let loggedUser = await this.userRepository.findOneBy({ user: user.name })
        this.isUserValid(loggedUser)

        if (!await this.crypt.valuesMatch(loggedUser.password, user.password))
            throw new BadRequestException('CPF ou Senha inválidos')

        return new LoginResponseDTO().build(loggedUser, this.jwtGenerator.generate(loggedUser))
    }

    public async createDefaultUser() {
        this.logger.log("Create default User")

        const users = await this.userRepository.find()
        this.logger.log(`Users: ${users.length}`)

        if (users.length <= 0) {
            this.logger.warn("Creating default user...")
            await this.userRepository.save({
                name: "Admin",
                user: "admin",
                password: await this.crypt.generateCryptedHash("admin"),
                phone: "(xx) xxxxx-xxxx"
            })
            this.logger.warn("Default user created")
        }
    }

    private isUserValid(user: User): boolean {
        if (!user || !user.password)
            throw new BadRequestException('CPF ou Senha inválidos')

        return true
    }
}
