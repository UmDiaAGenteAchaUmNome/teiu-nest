import { Filter } from '@apicore/nestjs/lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { CryptHelper } from 'src/helpers/auth/crypt.helper';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly filter: Filter,
        private readonly crypt: CryptHelper
    ) { }

    public async listUsers(filters?: User): Promise<User[]> {
        return await this.userRepository.findBy(this.filter.build(filters))
    }

    public async getUserById(userId: number): Promise<User> {
        return await this.userRepository.findOneBy({ id: userId })
    }

    public async createUser(user: User): Promise<User> {
        user = await this.generateUserPasswordHash(user)
        return await this.userRepository.save(user)
    }

    public async updateUser(userId: number, user: User): Promise<User> {
        user = await this.generateUserPasswordHash(user)

        await this.userRepository.update(userId, user)
        return await this.getUserById(userId)
    }

    public async deleteUser(userId: number): Promise<void> {
        await this.userRepository.delete(userId)
    }

    private async generateUserPasswordHash(user: User): Promise<User> {
        user.password = await this.crypt.generateCryptedHash(user.password)

        return user
    }

}
