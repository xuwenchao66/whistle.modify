import { FC, memo, useContext } from 'react';
import { Group } from '@server/src/models/group/group.type';
import { DEFAULT_GROUP } from '@/constants';
import { Dropdown, Menu, message, MenuItemProps } from 'antd';
import { UnorderedListOutlined, MoreOutlined } from '@ant-design/icons';
import Item from '@/components/Item';
import { useRequest } from 'ahooks';
import { deleteGroup } from '@/api/group';
import { menusItems, ACTION_KEY } from './config';
import { GroupContext } from '@/context';

export interface GroupItemSuffixProps {
  group: Group;
}

const GroupItemSuffix: FC<GroupItemSuffixProps> = memo(({ group }) => {
  const groupContext = useContext(GroupContext);

  const { run: runDelete } = useRequest(() => deleteGroup(group.id), {
    manual: true,
    onSuccess: () => {
      groupContext.deleteGroup(group);
      message.success('Delete successfully');
    },
    onError: () => {
      message.error('Delete failed');
    },
  });

  const isDefaultGroup = group.id === DEFAULT_GROUP.id;
  const items = isDefaultGroup
    ? menusItems?.filter((item) => item?.key !== ACTION_KEY.delete.key)
    : menusItems;

  const handleMenuClick: MenuItemProps['onClick'] = ({ domEvent, key }) => {
    switch (key) {
      case ACTION_KEY.delete.key:
        runDelete();
        break;
      default:
        break;
    }
    domEvent.stopPropagation();
  };

  return (
    <Dropdown
      overlay={<Menu items={items} onClick={handleMenuClick} />}
      placement="topLeft"
      trigger={['click']}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <MoreOutlined />
      </div>
    </Dropdown>
  );
});

export interface GroupItemProps extends GroupItemSuffixProps {}

const GroupItem: FC<GroupItemProps> = ({ group }) => {
  return (
    <Item
      prefix={<UnorderedListOutlined />}
      suffix={<GroupItemSuffix group={group} />}
    >
      {group.name}
    </Item>
  );
};

export default GroupItem;
