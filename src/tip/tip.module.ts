import { Filter, Tip } from '@apicore/teiu/lib';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipController } from './tip.controller';
import { TipService } from './tip.service';

@Module({
  controllers: [TipController],
  providers: [TipService, Filter],
  imports: [TypeOrmModule.forFeature([Tip])]
})
export class TipModule { }
