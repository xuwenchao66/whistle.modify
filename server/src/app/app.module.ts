import { join } from 'path';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';

const staticRootPath = join(__dirname, '../../ui');

@Module({
  imports: [ServeStaticModule.forRoot({ rootPath: staticRootPath })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
