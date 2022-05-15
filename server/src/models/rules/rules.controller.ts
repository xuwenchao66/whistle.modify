import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { RulesService } from './rules.service';
import { CreateRuleDto, UpdateRuleDto } from './rule.dto';

@Controller('rules')
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @Post()
  async create(@Body() createRuleDto: CreateRuleDto) {
    return await this.rulesService.create(createRuleDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.rulesService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRuleDto: UpdateRuleDto) {
    return await this.rulesService.update(id, updateRuleDto);
  }

  @Get()
  async findAll() {
    return await this.rulesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.rulesService.findOne(id);
  }
}
