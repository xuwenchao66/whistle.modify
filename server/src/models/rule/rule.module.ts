import { Module } from '@nestjs/common';
import { RulesController } from './rule.controller';
import { RulesService } from './rule.service';

@Module({
  providers: [RulesService],
  controllers: [RulesController],
})
export class RulesModule {}
