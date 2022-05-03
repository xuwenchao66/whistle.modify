import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Rule } from './rule.entity';
import { RulesService } from './rules.service';

@Controller('rules')
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @Post()
  create(): Promise<Rule> {
    return this.rulesService.create();
  }

  @Get()
  findAll(): Promise<Rule[]> {
    return this.rulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): any {
    return this.rulesService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.rulesService.delete(id);
  }
}
