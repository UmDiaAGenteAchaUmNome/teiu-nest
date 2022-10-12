import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from 'src/entities/typeorm/banner';
import { CloudinaryBannerHelper } from 'src/helpers/cloudinary/CloudinaryBannerHelper';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';

@Module({
  controllers: [BannerController],
  providers: [BannerService, CloudinaryService, CloudinaryBannerHelper],
  imports: [TypeOrmModule.forFeature([Banner])],
  exports: [TypeOrmModule]
})
export class BannerModule {}
