import { Filter } from '@apicore/nestjs/lib';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Highlight } from 'src/entities/highlight';
import { Image } from 'src/entities/image';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { HighlightController } from './highlight.controller';
import { HighlightService } from './highlight.service';

@Module({
  controllers: [HighlightController],
  providers: [HighlightService, Filter, CloudinaryService],
  imports: [TypeOrmModule.forFeature([Highlight, Image])]
})
export class HighlightModule { }
