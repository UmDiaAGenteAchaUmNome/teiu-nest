import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import envConfig from './config/env/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: envConfig().app.requestSizeLimit}))
  app.use(urlencoded({ extended: true, limit: envConfig().app.requestSizeLimit }))
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Teiu Nest')
    .setDescription('Teiu NestJS API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(envConfig().app.port);
}
bootstrap();
