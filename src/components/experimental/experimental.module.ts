import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CryptHelper } from 'src/helpers/auth/crypt.helper';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { ExperimentalController } from './experimental.controller';

@Module({
  controllers: [ExperimentalController],
  providers: [CloudinaryService, CryptHelper],
  imports: [HttpModule]
})
export class ExperimentalModule {}
