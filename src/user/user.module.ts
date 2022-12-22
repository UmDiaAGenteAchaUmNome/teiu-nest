import { Filter } from '@apicore/nestjs/lib';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { CryptHelper } from 'src/helpers/auth/crypt.helper';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService, Filter, CryptHelper],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User])]
})
export class UserModule { }
