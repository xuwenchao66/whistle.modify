import { Rule } from './rule.type';

export class RuleEntity implements Rule {
  id: string;
  groupId: string;
  pattern: string;
  enable: boolean;
  description?: string;
  replacer: {
    response: {
      body: string;
    };
  };
}
