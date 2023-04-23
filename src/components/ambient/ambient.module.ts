import { Filter } from '@apicore/nestjs/lib';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAmbient } from 'src/entities/product/product-ambient';
import { AmbientController } from './ambient.controller';
import { AmbientService } from './ambient.service';

@Module({
  controllers: [AmbientController],
  providers: [AmbientService, Filter],
  imports: [TypeOrmModule.forFeature([ProductAmbient])]
})
export class AmbientModule { }
