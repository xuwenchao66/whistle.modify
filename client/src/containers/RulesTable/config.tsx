import { FC, memo } from 'react';
import { Switch, Space, Button, Typography, Popconfirm } from 'antd';
import { ColumnType } from 'antd/es/table';
import { Rule } from '@server/src/models/rule/rule.type';

const { Link } = Typography;

export type ActionProps = {
  row: Rule;
  onSwitch: (enable: boolean, row: Rule) => void;
  onDelete: (row: Rule) => void;
  onUpdate: (row: Rule) => void;
};

const Action: FC<ActionProps> = memo(
  ({ row, onSwitch, onDelete, onUpdate }) => {
    const { enable } = row;

    return (
      <Space size="large">
        <Switch
          checked={enable}
          size="small"
          onChange={(enable) => onSwitch(enable, row)}
        />
        <Button type="primary" size="small" onClick={() => onUpdate(row)}>
          Update
        </Button>
        <Popconfirm
          title="Are you sure to delete this rule?"
          onConfirm={() => onDelete(row)}
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
  },
);

export const getColumns = ({
  onSwitch,
  onDelete,
  onUpdate,
}: Pick<
  ActionProps,
  'onDelete' | 'onSwitch' | 'onUpdate'
>): ColumnType<Rule>[] => [
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
    render: (_, row) => (
      <Action
        row={row}
        onSwitch={onSwitch}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    ),
  },
];
