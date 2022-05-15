import { FC, memo } from 'react';
import { Switch, Space, Button, Typography, Popconfirm } from 'antd';
import { ColumnType } from 'antd/es/table';
import { Rule } from '@server/src/models/rules/rule.type';

const { Link } = Typography;

export type ActionProps = {
  row: Rule;
  index: number;
  onSwitch: (enable: boolean, row: Rule, index: number) => void;
  onDelete: (row: Rule, index: number) => void;
};

const Action: FC<ActionProps> = memo(({ row, index, onSwitch, onDelete }) => {
  const { enable } = row;

  return (
    <Space size="large">
      <Switch
        checked={enable}
        size="small"
        onChange={(enable) => onSwitch(enable, row, index)}
      />
      <Button type="primary" size="small">
        Edit
      </Button>
      <Popconfirm
        title="Are you sure to delete this rule?"
        onConfirm={() => onDelete(row, index)}
        okText="Yes"
        cancelText="No"
        placement="topRight"
      >
        <Button type="primary" danger size="small">
          Delete
        </Button>
      </Popconfirm>
    </Space>
  );
});

export const getColumns = ({
  onSwitch,
  onDelete,
}: Pick<ActionProps, 'onDelete' | 'onSwitch'>): ColumnType<Rule>[] => [
  {
    title: 'Pattern',
    dataIndex: 'pattern',
    ellipsis: true,
    render: (value) => <Link>{value}</Link>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    ellipsis: true,
  },
  {
    title: 'Response Body',
    dataIndex: 'response',
    ellipsis: true,
    render: (_, row) => row.replacer?.response?.body,
  },
  {
    title: 'Action',
    dataIndex: 'operation',
    width: 200,
    render: (_, row, index) => (
      <Action row={row} index={index} onSwitch={onSwitch} onDelete={onDelete} />
    ),
  },
];
