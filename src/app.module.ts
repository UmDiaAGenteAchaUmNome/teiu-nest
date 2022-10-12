import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrmConfig } from './config/db/orm.config';
import { ProductModule } from './product/product.module';
import { ExperimentalModule } from './experimental/experimental.module';
import { BannerModule } from './banner/banner.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OrmConfig,
    ProductModule,
    ExperimentalModule,
    BannerModule
  ]
})
export class AppModule {}
