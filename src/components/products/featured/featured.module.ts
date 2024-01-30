import { Filter } from '@apicore/nestjs/lib/helpers/index';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Featured } from 'src/entities/featured';
import { Image } from 'src/entities/image';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { FeaturedController } from './featured.controller';
import { FeaturedService } from './featured.service';

@Module({
  controllers: [FeaturedController],
  providers: [FeaturedService, Filter, CloudinaryService],
  imports: [TypeOrmModule.forFeature([Featured, Image])]
})
export class HighlightModule { }
