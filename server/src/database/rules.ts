import db from './db';
import { Rule } from '../models/rules/rule.entity';
import { IRule } from '../models/rules/rule.type';
import { NotFoundException } from '@nestjs/common';

const prefix = '/rules';

export class RulesDB {
  findIndexById(id: string): number {
    const index = db.getIndex(prefix, id);
    if (index === -1) throw new NotFoundException('Rule Not Found');
    return index;
  }

  create(rule: Rule) {
    db.push(`${prefix}[]`, rule);
  }

  delete(id: string) {
    const index = this.findIndexById(id);
    db.delete(`${prefix}[${index}]`);
  }

  update(id: string, rule: Partial<Rule>) {
    const index = this.findIndexById(id);
    db.push(`${prefix}[${index}]`, rule, false);

    return this.findOne(id);
  }

  findAll() {
    return db.getObject<IRule[]>(prefix);
  }

  findOne(id: string): Rule {
    const index = this.findIndexById(id);
    return db.getObject<Rule>(`${prefix}[${index}]`);
  }
}
