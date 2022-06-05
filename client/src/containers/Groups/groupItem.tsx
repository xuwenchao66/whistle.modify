import { FC } from 'react';
import { Group } from '@server/src/models/group/group.type';
import { UnorderedListOutlined, MoreOutlined } from '@ant-design/icons';
import Item from '@/components/Item';

export interface GroupItem {
  group: Group;
}

const GroupItem: FC<GroupItem> = ({ group }) => {
  return (
    <Item prefix={<UnorderedListOutlined />} suffix={<MoreOutlined />}>
      {group.name}
    </Item>
  );
};

export default GroupItem;
