import { FC, ComponentProps } from 'react';
import { Table } from 'antd';

const locale = {
  emptyText: 'no rules',
};

type TableProps = ComponentProps<typeof Table>;

export interface RuleTableProps extends TableProps {}

const RuleTable: FC<RuleTableProps> = (props) => {
  return (
    <Table rowKey="id" sticky locale={locale} pagination={false} {...props} />
  );
};

export default RuleTable;
