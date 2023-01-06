import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccordionItemModule } from './accordion-item/accordion-item.module';
import { AmbientModule } from './ambient/ambient.module';
import { AuthModule } from './auth/auth.module';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { OrmConfig } from './config/db/orm.config';
import { ExperimentalModule } from './experimental/experimental.module';
import { GalleryItemModule } from './gallery-item/gallery-item.module';
import { JwtStrategy } from './helpers/auth/jwt/jwt.strategy';
import { HighlightModule } from './highlight/highlight.module';
import { PostModule } from './post/post.module';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { ProductModule } from './product/product.module';
import { ProjectCategoryModule } from './project-category/project-category.module';
import { ProjectModule } from './project/project.module';
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
    AuthModule,
    CategoryModule,
    PostModule,
    ProjectModule,
    GalleryItemModule,
    AccordionItemModule,
    ProductDetailModule,
    ProjectCategoryModule,
    AmbientModule,
    BrandModule,
    HighlightModule
  ],
  providers: [JwtStrategy]
})
export class AppModule { }
