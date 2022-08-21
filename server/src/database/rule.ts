import { NotFoundException } from '@nestjs/common';
import { Base } from './db';
import * as isEmpty from 'lodash/isEmpty';
import * as omitBy from 'lodash/omitBy';
import * as isUndefined from 'lodash/isUndefined';
import { RuleEntity } from '../models/rule/rule.entity';

const prefix = '/rules';

export class RuleDB extends Base {
  async findIndexById(id: string): Promise<number> {
    const index = await this.db.getIndex(prefix, id);
    if (index === -1) throw new NotFoundException('Rule Not Found');
    return index;
  }

  async create(rule: RuleEntity) {
    return this.db.push(`${prefix}[]`, rule);
  }

  async delete(id: string) {
    const index = await this.findIndexById(id);
    return this.db.delete(`${prefix}[${index}]`);
  }

  async update(id: string, rule: Partial<RuleEntity>) {
    const index = await this.findIndexById(id);
    await this.db.push(`${prefix}[${index}]`, rule, false);

    return this.findOne(id);
  }

  async findAll(query?: Partial<RuleEntity>) {
    const validQuery = omitBy(query, isUndefined);

    let rules = await this.db.getObject<RuleEntity[]>(prefix);

    if (!isEmpty(validQuery)) {
      rules = rules.filter((rule) => {
        const queryKeys = Object.keys(validQuery);
        return queryKeys.every((key) => rule[key] === validQuery[key]);
      });
    }

    return rules;
  }

  async findOne(id: string): Promise<RuleEntity> {
    const index = await this.findIndexById(id);
    return this.db.getObject<RuleEntity>(`${prefix}[${index}]`);
  }
}

export default new RuleDB();
