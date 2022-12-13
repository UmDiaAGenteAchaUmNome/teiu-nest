import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '50mb' }))
  app.use(urlencoded({ extended: true, limit: process.env.REQUEST_SIZE_LIMIT }))
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Teiu Nest')
    .setDescription('Teiu NestJS API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
