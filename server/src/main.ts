import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { API_PREFIX } from './constants';

// https://stackoverflow.com/questions/54349998/use-nestjs-package-in-nodejs-express-project
export const getAppInstance = async () => {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));

  await app.init();

  return app.getHttpAdapter().getInstance();
};

export const asyncInstance = getAppInstance();
