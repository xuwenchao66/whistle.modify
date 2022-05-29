import { Injectable } from '@nestjs/common';
import { getUUID } from '../../common/helpers';
import { RuleEntity } from './rule.entity';
import { CreateRuleDto, UpdateRuleDto } from './rule.dto';
import ruleDB from '../../database/rule';

@Injectable()
export class RuleService {
  async create(createRuleDto: CreateRuleDto): Promise<RuleEntity> {
    const rule = new RuleEntity();

    rule.id = await getUUID();
    rule.enable = true;
    rule.pattern = createRuleDto.pattern;
    rule.replacer = createRuleDto.replacer;
    rule.description = createRuleDto.description;

    ruleDB.create(rule);

    return rule;
  }

  async delete(id: string) {
    return ruleDB.delete(id);
  }

  async update(id: string, updateRuleDto: UpdateRuleDto) {
    return ruleDB.update(id, updateRuleDto);
  }

  async findAll(): Promise<RuleEntity[]> {
    const rules = [...ruleDB.findAll()];

    rules.reverse();

    return rules;
  }

  async findOne(id: string): Promise<RuleEntity> {
    return ruleDB.findOne(id);
  }
}
