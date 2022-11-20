import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { OrmConfig } from './config/db/orm.config';
import { ExperimentalModule } from './experimental/experimental.module';
import { JwtStrategy } from './helpers/auth/jwt/jwt.strategy';
import { ProductModule } from './product/product.module';
import { SlideModule } from './slide/slide.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { TipModule } from './tip/tip.module';
import { GalleryItemModule } from './gallery-item/gallery-item.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OrmConfig,
    ProductModule,
    ExperimentalModule,
    SlideModule,
    UserModule,
    AuthModule,
    CategoryModule,
    PostModule,
    TipModule,
    GalleryItemModule
  ],
  providers: [JwtStrategy]
})
export class AppModule { }
