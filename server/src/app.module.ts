import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { RulesModule } from './models/rules/rules.module';

const staticRootPath = join(__dirname, '../ui');

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: staticRootPath }),
    RulesModule,
  ],
})
export class AppModule {}