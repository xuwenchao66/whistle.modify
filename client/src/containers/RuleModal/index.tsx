import { useState, useCallback } from 'react';
import { RuleModal } from './modal';
import { Rule } from '@server/src/models/rules/rule.type';

export const useRuleModal = () => {
  const [visible, setVisible] = useState(false);
  const [rule, setRule] = useState<Rule>();

  const open = useCallback(
    (rule?: Rule) => {
      setVisible(true);
      setRule(rule);
    },
    [setVisible, setRule],
  );

  const close = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const modal = (
    <RuleModal
      rule={rule}
      onUpdateSuccess={close}
      visible={visible}
      onCancel={close}
    />
  );

  return {
    open,
    modal,
  };
};
