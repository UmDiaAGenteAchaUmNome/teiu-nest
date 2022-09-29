import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrmConfig } from './config/db/orm.config';
import { ProdutoModule } from './produto/produto.module';
import { ExperimentalModule } from './experimental/experimental.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OrmConfig,
    ProdutoModule,
    ExperimentalModule
  ]
})
export class AppModule {}
