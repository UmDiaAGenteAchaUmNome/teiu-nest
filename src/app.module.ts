import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { OrmConfig } from './config/db/orm.config';
import { ExperimentalModule } from './experimental/experimental.module';
import { JwtStrategy } from './helpers/auth/jwt/jwt.strategy';
import { ProductModule } from './product/product.module';
import { SlideModule } from './slide/slide.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OrmConfig,
    ProductModule,
    ExperimentalModule,
    SlideModule,
    UserModule,
    AuthModule
  ],
  providers: [JwtStrategy]
})
export class AppModule { }
