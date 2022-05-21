import { createContext } from 'react';
import { Rule } from '@server/src/models/rules/rule.type';

export interface RuleContextProps {
  rules: Rule[];
  setRules: (rules: Rule[]) => void;
  deleteRule: (rule: Rule) => void;
  updateRule: (rule: Rule) => void;
}

export const RuleContext = createContext<RuleContextProps>(
  {} as RuleContextProps,
);
