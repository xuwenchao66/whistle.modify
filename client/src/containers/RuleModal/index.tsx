import { useState } from 'react';
import { RuleModal } from './modal';
import { Rule } from '@server/src/models/rules/rule.type';

export const useRuleModal = () => {
  const [visible, setVisible] = useState(false);
  const [rule, setRule] = useState<Rule>();

  const open = (rule?: Rule) => {
    setVisible(true);
    setRule(rule);
  };

  const close = () => {
    setVisible(false);
  };

  const modal = <RuleModal rule={rule} visible={visible} onCancel={close} />;

  return {
    open,
    modal,
  };
};
