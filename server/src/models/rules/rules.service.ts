import { Injectable } from '@nestjs/common';
import { Rule } from './rule.entity';
import { CreateRuleDto, UpdateRuleDto } from './rule.dto';
import { rulesDB } from '../../database';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RulesService {
  async create(createRuleDto: CreateRuleDto): Promise<Rule> {
    const rule = new Rule();

    rule.id = uuidv4();
    rule.enable = false;
    rule.pattern = createRuleDto.pattern;
    rule.replacer = createRuleDto.replacer;

    rulesDB.create(rule);

    return rule;
  }

  async delete(id: string) {
    return rulesDB.delete(id);
  }

  async update(id: string, updateRuleDto: UpdateRuleDto) {
    return rulesDB.update(id, updateRuleDto);
  }

  async findAll(): Promise<Rule[]> {
    return rulesDB.findAll();
  }

  async findOne(id: string): Promise<Rule> {
    return rulesDB.findOne(id);
  }
}
