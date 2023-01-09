import { Filter } from '@apicore/nestjs/lib';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ambient } from 'src/entities/ambient';
import { AmbientController } from './ambient.controller';
import { AmbientService } from './ambient.service';

@Module({
  controllers: [AmbientController],
  providers: [AmbientService, Filter],
  imports: [TypeOrmModule.forFeature([Ambient])]
})
export class AmbientModule { }
