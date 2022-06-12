import { FC, memo } from 'react';
import { Switch, Space, Button, Typography, Popconfirm } from 'antd';
import { ColumnType } from 'antd/es/table';
import { Rule } from '@server/src/models/rule/rule.type';

const { Link } = Typography;

export type ActionProps = {
  row: Rule;
  onDelete: (row: Rule) => void;
  onUpdate: (row: Rule) => void;
};

const Action: FC<ActionProps> = memo(({ row, onDelete, onUpdate }) => {
  return (
    <Space size="middle">
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
});

type GetColumnsProps = {
  onSwitch: (enable: boolean, row: Rule) => void;
} & Pick<ActionProps, 'onDelete' | 'onUpdate'>;

export const getColumns = ({
  onSwitch,
  onDelete,
  onUpdate,
}: GetColumnsProps): ColumnType<Rule>[] => [
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
    title: 'Enable',
    dataIndex: 'enable',
    ellipsis: true,
    width: 93,
    align: 'center',
    filters: [
      { text: 'Enabled', value: true },
      { text: 'Disabled', value: false },
    ],
    onFilter: (value, record) => record.enable === value,
    render: (enable, row) => (
      <Switch
        checked={enable}
        size="small"
        onChange={(enable) => onSwitch(enable, row)}
      />
    ),
  },
  {
    title: 'Action',
    dataIndex: 'operation',
    width: 170,
    render: (_, row) => (
      <Action row={row} onDelete={onDelete} onUpdate={onUpdate} />
    ),
  },
];
