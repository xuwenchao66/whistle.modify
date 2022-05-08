import { FC, ComponentProps } from 'react';
import { Table } from 'antd';
import { getColumn } from './config';

const locale = {
  emptyText: 'no rules',
};

type TableProps = ComponentProps<typeof Table>;

export interface RuleTableProps extends TableProps {}

export const RuleTable: FC<RuleTableProps> = (props) => {
  return (
    <Table
      key="id"
      columns={getColumn() as TableProps['columns']}
      locale={locale}
      pagination={false}
      {...props}
    />
  );
};
