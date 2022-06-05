import { useContext, useEffect } from 'react';
import { message } from 'antd';
import { deleteRule, getRules, updateRule } from '@/api/rule';
import { RuleContext, GroupContext } from '@/context';
import { useLockFn } from 'ahooks';
import RuleTable, { RuleTableProps } from './Table';
import { getColumns, ActionProps } from './config';
import { useRequest } from 'ahooks';

export const useRulesTable = ({
  onUpdate,
}: {
  onUpdate: ActionProps['onUpdate'];
}) => {
  const ruleContext = useContext(RuleContext);
  const { selectedGroup } = useContext(GroupContext);
  const { id: groupId } = selectedGroup;

  const { loading, run } = useRequest(() => getRules({ params: { groupId } }), {
    manual: true,
    onSuccess: ({ data }) => ruleContext.setRules(data),
  });

  useEffect(() => {
    groupId && run();
  }, [groupId]);

  const handleSwitch: ActionProps['onSwitch'] = useLockFn(
    async (enable, row) => {
      try {
        const { data } = await updateRule(row.id, { enable });
        ruleContext.updateRule(data);
      } catch (error) {
        console.error(error);
      }
    },
  );

  const handleDelete: ActionProps['onDelete'] = useLockFn(async (row) => {
    try {
      await deleteRule(row.id);
      ruleContext.deleteRule(row);
      message.success('Delete successfully');
    } catch (error) {
      message.error('Delete failed');
    }
  });

  const columns = getColumns({
    onSwitch: handleSwitch,
    onDelete: handleDelete,
    onUpdate,
  });

  const table = (
    <RuleTable
      columns={columns as RuleTableProps['columns']}
      dataSource={ruleContext.rules}
      loading={loading}
    />
  );

  return {
    table,
    getRules: run,
  };
};
