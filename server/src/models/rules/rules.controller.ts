import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { RuleEntity } from './rule.entity';
import { RulesService } from './rules.service';
import { CreateRuleDto, UpdateRuleDto } from './rule.dto';

@Controller('rules')
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @Post()
  create(@Body() createRuleDto: CreateRuleDto) {
    return this.rulesService.create(createRuleDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.rulesService.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRuleDto: UpdateRuleDto) {
    return this.rulesService.update(id, updateRuleDto);
  }

  @Get()
  findAll(): Promise<RuleEntity[]> {
    return this.rulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): any {
    return this.rulesService.findOne(id);
  }
}
