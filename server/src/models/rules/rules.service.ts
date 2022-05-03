import { Injectable } from '@nestjs/common';
import { Rule } from './rule.entity';

@Injectable()
export class RulesService {
  async create(): Promise<Rule> {
    const rule = new Rule();
    return rule;
  }

  async delete(id: string): Promise<void> {}

  async update(id: string): Promise<void> {}

  async findAll(): Promise<Rule[]> {
    return [];
  }

  async findOne(id: string): Promise<Rule> {
    const rule = new Rule();
    rule.id = id;

    return rule;
  }
}
