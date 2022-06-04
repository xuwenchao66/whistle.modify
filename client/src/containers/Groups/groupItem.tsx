import { FC } from 'react';
import { Group } from '@server/src/models/group/group.type';
import { UnorderedListOutlined } from '@ant-design/icons';

const iconStyle = {
  marginRight: '9px',
};

export interface GroupItem {
  group: Group;
}

const GroupItem: FC<GroupItem> = ({ group }) => {
  return (
    <>
      <UnorderedListOutlined style={iconStyle} />
      {group.name}
    </>
  );
};

export default GroupItem;
