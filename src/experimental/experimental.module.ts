import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { ExperimentalController } from './experimental.controller';

@Module({
  controllers: [ExperimentalController],
  providers: [CloudinaryService],
  imports: [HttpModule]
})
export class ExperimentalModule {}
