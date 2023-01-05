import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccordionItemModule } from './accordion-item/accordion-item.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { OrmConfig } from './config/db/orm.config';
import { ExperimentalModule } from './experimental/experimental.module';
import { GalleryItemModule } from './gallery-item/gallery-item.module';
import { JwtStrategy } from './helpers/auth/jwt/jwt.strategy';
import { PostModule } from './post/post.module';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { ProductModule } from './product/product.module';
import { SlideModule } from './slide/slide.module';
import { TipModule } from './tip/tip.module';
import { UserModule } from './user/user.module';
import { ProjectCategoryModule } from './project-category/project-category.module';
import { AmbientModule } from './ambient/ambient.module';
import { BrandModule } from './brand/brand.module';

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
    GalleryItemModule,
    AccordionItemModule,
    ProductDetailModule,
    ProjectCategoryModule,
    AmbientModule,
    BrandModule
  ],
  providers: [JwtStrategy]
})
export class AppModule { }
