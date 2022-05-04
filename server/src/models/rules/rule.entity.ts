import { IRule } from './rule.type';

export class Rule implements IRule {
  id: string;
  pattern: string;
  enable: boolean;
  replacer: {
    response: {
      body: string;
    };
  };
}
