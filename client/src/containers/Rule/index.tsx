import { useState } from 'react';
import { useAsyncFn, useMount } from 'react-use';
import { getRules } from '@/api/rule';
import { Rule } from '@server/src/models/rules/rule.type';
import { RuleTable } from './Table';

export const useRuleTable = () => {
  const [rules, setRules] = useState<Rule[]>([]);

  const [{ loading }, getList] = useAsyncFn(async () => {
    const { data } = await getRules();
    setRules(data);
  });

  useMount(getList);

  const table = <RuleTable dataSource={rules} loading={loading} />;

  return {
    table,
    getList,
  };
};
