import { Injectable } from '@nestjs/common';
import { getUUID } from '../../common/helpers';
import { RuleEntity } from './rule.entity';
import { CreateRuleDto, UpdateRuleDto } from './rule.dto';
import { rulesDB } from '../../database';

@Injectable()
export class RulesService {
  async create(createRuleDto: CreateRuleDto): Promise<RuleEntity> {
    const rule = new RuleEntity();

    rule.id = await getUUID();
    rule.enable = false;
    rule.pattern = createRuleDto.pattern;
    rule.replacer = createRuleDto.replacer;
    rule.description = createRuleDto.description;

    rulesDB.create(rule);

    return rule;
  }

  async delete(id: string) {
    return rulesDB.delete(id);
  }

  async update(id: string, updateRuleDto: UpdateRuleDto) {
    return rulesDB.update(id, updateRuleDto);
  }

  async findAll(): Promise<RuleEntity[]> {
    const rules = [...rulesDB.findAll()];

    rules.reverse();

    return rules;
  }

  async findOne(id: string): Promise<RuleEntity> {
    return rulesDB.findOne(id);
  }
}
