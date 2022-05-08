import { useMemo, useCallback } from 'react';
import { useAsyncFn, useMount } from 'react-use';
import { getRules, updateRule } from '@/api/rule';
import { useImmer } from 'use-immer';
import { Rule } from '@server/src/models/rules/rule.type';
import { useLockFn } from 'ahooks';
import RuleTable, { RuleTableProps } from './table';
import { getColumns, GetColumnsProps } from './config';

export const useRuleTable = () => {
  const [rules, setRules] = useImmer<Rule[]>([]);

  const [{ loading }, getList] = useAsyncFn(async () => {
    const { data } = await getRules();
    setRules(data);
  });

  const handleSwitch: GetColumnsProps['onSwitch'] = useCallback(
    useLockFn(async (enable, row, index) => {
      try {
        const { data } = await updateRule(row.id, { enable });
        setRules((rules) => {
          rules[index].enable = data.enable;
        });
      } catch (error) {
        console.error(error);
      }
    }),
    [rules],
  );

  const columns = useMemo(
    () => getColumns({ onSwitch: handleSwitch }),
    [handleSwitch],
  );

  useMount(getList);

  const table = (
    <RuleTable
      columns={columns as RuleTableProps['columns']}
      dataSource={rules}
      loading={loading}
    />
  );

  return {
    table,
    getList,
  };
};
