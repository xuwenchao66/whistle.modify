import { useState, useCallback } from 'react';
import { Rule } from '@server/src/models/rule/rule.type';
import { RuleModal } from './Modal';

export const useRuleModal = () => {
  const [visible, setVisible] = useState(false);
  const [rule, setRule] = useState<Partial<Rule> | undefined>({});

  const open = useCallback(
    (rule?: Partial<Rule>) => {
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
      onSuccess={close}
      visible={visible}
      onCancel={close}
    />
  );

  return {
    open,
    modal,
  };
};
