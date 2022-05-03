import { join } from 'path';
import { Module } from '@nestjs/common';
import { RulesModule } from './models/rules/rules.module';
import { ServeStaticModule } from '@nestjs/serve-static';

const staticRootPath = join(__dirname, '../../ui');

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: staticRootPath }),
    RulesModule,
  ],
})
export class AppModule {}
