import { Module } from '@nestjs/common';
import { RulesController } from './rules.controller';
import { RulesService } from './rules.service';

@Module({
  providers: [RulesService],
  controllers: [RulesController],
})
export class RulesModule {}
