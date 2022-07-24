import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { RuleModule } from './models/rule/rule.module';
import { GroupModule } from './models/group/group.module';
import { API_PREFIX } from './common/config';

const staticRootPath = join(__dirname, '../client');

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: staticRootPath,
      exclude: [`${API_PREFIX}*`],
      serveStaticOptions: {
        maxAge: '30 days',
        setHeaders: (res, path) => {
          if (path.endsWith('.html')) {
            res.setHeader('Cache-Control', 'max-age=0');
          }
        },
      },
    }),
    RuleModule,
    GroupModule,
  ],
})
export class AppModule {}
