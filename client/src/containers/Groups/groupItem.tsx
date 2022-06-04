import { FC } from 'react';
import { Group } from '@server/src/models/group/group.type';
import { Space } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';

export interface GroupItem {
  group: Group;
}

const GroupItem: FC<GroupItem> = ({ group }) => {
  return (
    <Space>
      <UnorderedListOutlined />
      {group.name}
    </Space>
  );
};

export default GroupItem;
