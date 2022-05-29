import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { RuleModule } from './models/rule/rule.module';
import { GroupModule } from './models/group/group.module';

const staticRootPath = join(__dirname, '../client');

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: staticRootPath }),
    RuleModule,
    GroupModule,
  ],
})
export class AppModule {}
