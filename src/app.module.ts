import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrmConfig } from './config/db/orm.config';
import { ProductModule } from './product/product.module';
import { ExperimentalModule } from './experimental/experimental.module';
import { BannerModule } from './banner/banner.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './helpers/auth/jwt/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OrmConfig,
    ProductModule,
    ExperimentalModule,
    BannerModule,
    UserModule,
    AuthModule
  ],
  providers: [JwtStrategy]
})
export class AppModule {}
