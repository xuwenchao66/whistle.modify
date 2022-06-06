import { NotFoundException } from '@nestjs/common';
import { Base } from './db';
import * as isEmpty from 'lodash/isEmpty';
import * as omitBy from 'lodash/omitBy';
import * as isUndefined from 'lodash/isUndefined';
import { RuleEntity } from '../models/rule/rule.entity';

const prefix = '/rules';

export class RuleDB extends Base {
  findIndexById(id: string): number {
    const index = this.db.getIndex(prefix, id);
    if (index === -1) throw new NotFoundException('Rule Not Found');
    return index;
  }

  create(rule: RuleEntity) {
    this.db.push(`${prefix}[]`, rule);
  }

  delete(id: string) {
    const index = this.findIndexById(id);
    this.db.delete(`${prefix}[${index}]`);
  }

  update(id: string, rule: Partial<RuleEntity>) {
    const index = this.findIndexById(id);
    this.db.push(`${prefix}[${index}]`, rule, false);

    return this.findOne(id);
  }

  findAll(query?: Partial<RuleEntity>) {
    const validQuery = omitBy(query, isUndefined);

    let rules = this.db.getObject<RuleEntity[]>(prefix);

    if (!isEmpty(validQuery)) {
      rules = rules.filter((rule) => {
        const queryKeys = Object.keys(validQuery);
        return queryKeys.every((key) => rule[key] === validQuery[key]);
      });
    }

    return rules;
  }

  findOne(id: string): RuleEntity {
    const index = this.findIndexById(id);
    return this.db.getObject<RuleEntity>(`${prefix}[${index}]`);
  }
}

export default new RuleDB();
