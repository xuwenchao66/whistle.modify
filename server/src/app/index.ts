import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// https://stackoverflow.com/questions/54349998/use-nestjs-package-in-nodejs-express-project
export const getAppInstance = async () => {
  const app = await NestFactory.create(AppModule);
  await app.init();
  return app.getHttpAdapter().getInstance();
};
