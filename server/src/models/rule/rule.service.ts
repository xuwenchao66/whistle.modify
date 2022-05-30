import { Injectable } from '@nestjs/common';
import { getUUID } from '../../common/helpers';
import { DEFAULT_GROUP_ID } from '../../common/constants';
import { RuleEntity } from './rule.entity';
import { CreateRuleDto, UpdateRuleDto } from './rule.dto';
import ruleDB from '../../database/rule';
import groupDB from '../../database/group';

@Injectable()
export class RuleService {
  async create({
    groupId,
    pattern,
    replacer,
    description,
  }: CreateRuleDto): Promise<RuleEntity> {
    const rule = new RuleEntity();

    // 如果存在 groupId，尝试找到对应的 group 确保 group 存在，否则使用默认的 groupId
    if (groupId) {
      groupDB.findOne(groupId);
      rule.groupId = groupId;
    } else {
      rule.groupId = DEFAULT_GROUP_ID;
    }

    rule.id = await getUUID();
    rule.enable = true;
    rule.pattern = pattern;
    rule.replacer = replacer;
    rule.description = description;

    ruleDB.create(rule);

    return rule;
  }

  async delete(id: string) {
    return ruleDB.delete(id);
  }

  async update(id: string, updateRuleDto: UpdateRuleDto) {
    return ruleDB.update(id, updateRuleDto);
  }

  async findAll(query: Pick<RuleEntity, 'groupId'>): Promise<RuleEntity[]> {
    let rules = [...ruleDB.findAll()];

    if (query.groupId) {
      rules = rules.filter((rule) => rule.groupId === query.groupId);
    }

    rules.reverse();

    return rules;
  }

  async findOne(id: string): Promise<RuleEntity> {
    return ruleDB.findOne(id);
  }
}
