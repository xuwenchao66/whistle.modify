import { useContext, useEffect, useState } from 'react';
import { message } from 'antd';
import { useLockFn, useRequest } from 'ahooks';
import classnames from 'classnames';
import { deleteRule, getRules, updateRule } from '@/api/rule';
import { RuleContext, GroupContext } from '@/context';
import { Rule } from '@server/src/models/rule/rule.type';
import RuleTable, { RuleTableProps } from './Table';
import { getColumns, GetColumnsProps } from './config';

export const useRulesTable = ({
  onUpdate,
}: {
  onUpdate: GetColumnsProps['onUpdate'];
}) => {
  const [selectedRule, setSelectedRule] = useState<Rule>({} as Rule);
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

  const handleSwitch: GetColumnsProps['onSwitch'] = useLockFn(
    async (enable, row) => {
      try {
        const { data } = await updateRule(row.id, { enable });
        ruleContext.updateRule(data);
      } catch (error) {
        console.error(error);
      }
    },
  );

  const handleDelete: GetColumnsProps['onDelete'] = useLockFn(async (row) => {
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
      onRow={(record) => ({
        onClick: () => setSelectedRule(record as Rule),
      })}
      rowClassName={(record) =>
        classnames({
          'ant-table-row-selected': (record as Rule).id === selectedRule.id,
        })
      }
    />
  );

  return {
    table,
    getRules: run,
  };
};
