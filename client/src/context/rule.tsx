import { createContext, FC, ReactNode } from 'react';
import { Updater, useImmer } from 'use-immer';
import { Rule } from '@server/src/models/rule/rule.type';

export interface RuleContextProps {
  rules: Rule[];
  setRules: Updater<Rule[]>;
  deleteRule: (rule: Rule) => void;
  updateRule: (rule: Rule) => void;
}

export const RuleContext = createContext<RuleContextProps>(
  {} as RuleContextProps,
);

export const useRuleContextValue = () => {
  const [rules, setRules] = useImmer<Rule[]>([]);

  const ruleContext: RuleContextProps = {
    rules,
    setRules,
    deleteRule: (rule) =>
      setRules((rules) => {
        const deleteIndex = rules.findIndex((r) => r.id === rule.id);
        rules.splice(deleteIndex, 1);
      }),
    updateRule: (rule) =>
      setRules((rules) => {
        const oldRuleIndex = rules.findIndex((r) => r.id === rule.id);
        rules[oldRuleIndex] = rule;
      }),
  };

  return ruleContext;
};

export const RuleContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const value = useRuleContextValue();
  return <RuleContext.Provider value={value}>{children}</RuleContext.Provider>;
};
