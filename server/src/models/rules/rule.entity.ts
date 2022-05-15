import { Rule } from './rule.type';

export class RuleEntity implements Rule {
  id: string;
  pattern: string;
  enable: boolean;
  description?: string;
  replacer: {
    response: {
      body: string;
    };
  };
}
