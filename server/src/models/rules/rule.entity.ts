import { IRule } from './rule.type';

export class RuleEntity implements IRule {
  id: string;
  pattern: string;
  enable: boolean;
  replacer: {
    response: {
      body: string;
    };
  };
}
