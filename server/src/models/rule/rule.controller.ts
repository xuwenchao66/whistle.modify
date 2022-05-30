import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Body,
  Put,
  Query,
} from '@nestjs/common';
import { RuleService } from './rule.service';
import { CreateRuleDto, UpdateRuleDto } from './rule.dto';

@Controller('rules')
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @Post()
  async create(@Body() createRuleDto: CreateRuleDto) {
    return await this.ruleService.create(createRuleDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.ruleService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRuleDto: UpdateRuleDto) {
    return await this.ruleService.update(id, updateRuleDto);
  }

  @Get()
  async findAll(@Query('groupId') groupId: string) {
    return await this.ruleService.findAll({ groupId });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ruleService.findOne(id);
  }
}
