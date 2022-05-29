import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { RulesModule } from './models/rule/rule.module';
import { GroupModule } from './models/group/group.module';

const staticRootPath = join(__dirname, '../client');

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: staticRootPath }),
    RulesModule,
    GroupModule,
  ],
})
export class AppModule {}
