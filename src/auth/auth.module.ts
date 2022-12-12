import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { CryptHelper } from 'src/helpers/auth/crypt.helper';
import { JwtGenerator } from 'src/helpers/auth/jwt/jwt.generator';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtGenerator, CryptHelper],
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})]
})
export class AuthModule { }
