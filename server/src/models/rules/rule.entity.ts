import { Rule } from './rule.type';

export class RuleEntity implements Rule {
  id: string;
  pattern: string;
  enable: boolean;
  replacer: {
    response: {
      body: string;
    };
  };
}
