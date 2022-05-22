import { createContext } from 'react';
import { Updater } from 'use-immer';
import { Rule } from '@server/src/models/rules/rule.type';

export interface RuleContextProps {
  rules: Rule[];
  setRules: Updater<Rule[]>;
  deleteRule: (rule: Rule) => void;
  updateRule: (rule: Rule) => void;
}

export const RuleContext = createContext<RuleContextProps>(
  {} as RuleContextProps,
);
