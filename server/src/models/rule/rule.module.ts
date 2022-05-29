import { Module } from '@nestjs/common';
import { RuleController } from './rule.controller';
import { RuleService } from './rule.service';

@Module({
  providers: [RuleService],
  controllers: [RuleController],
})
export class RuleModule {}
