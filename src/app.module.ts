import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccordionItemModule } from './components/accordion-item/accordion-item.module';
import { AmbientModule } from './components/ambient/ambient.module';
import { AuthModule } from './components/auth/auth.module';
import { BrandModule } from './components/brand/brand.module';
import { ExperimentalModule } from './components/experimental/experimental.module';
import { GalleryItemModule } from './components/gallery-item/gallery-item.module';
import { PostModule } from './components/post/post.module';
import { CategoryModule } from './components/products/category/category.module';
import { HighlightModule } from './components/products/featured/featured.module';
import { ProductDetailModule } from './components/products/product-detail/product-detail.module';
import { ProductModule } from './components/products/product/product.module';
import { ProjectCategoryModule } from './components/projects/project-category/project-category.module';
import { ProjectModule } from './components/projects/project/project.module';
import { SlideModule } from './components/slide/slide.module';
import { UserModule } from './components/user/user.module';
import { OrmConfig } from './config/db/orm.config';
import { JwtStrategy } from './helpers/auth/jwt/jwt.strategy';
import { ImageModule } from './components/image/image.module';
import { InstagramPostModule } from './components/instagram-post/instagram-post.module';
import { LanguageModule } from './components/language/language.module';
import { BannerModule } from './components/banner/banner.module';
import ConfigurationSettings from './config/env/env.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ConfigurationSettings]
    }),
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
    HighlightModule,
    ImageModule,
    InstagramPostModule,
    LanguageModule,
    BannerModule
  ],
  providers: [JwtStrategy]
})
export class AppModule { }
