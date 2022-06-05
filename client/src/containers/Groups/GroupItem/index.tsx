import { FC, useMemo } from 'react';
import { Group } from '@server/src/models/group/group.type';
import { Dropdown, Menu, MenuProps } from 'antd';
import { UnorderedListOutlined, MoreOutlined } from '@ant-design/icons';
import Item from '@/components/Item';
import style from './index.module.less';

const actionKey: Record<string, string> = {
  rename: 'Rename',
  delete: 'Delete',
};

const menusItems = Object.keys(actionKey).reduce((acc, key) => {
  acc?.push({
    label: actionKey[key],
    key: actionKey[key],
  });
  return acc;
}, [] as MenuProps['items']);

export interface GroupItem {
  group: Group;
}

const GroupItem: FC<GroupItem> = ({ group }) => {
  const suffix = useMemo(() => {
    return (
      <Dropdown
        overlay={
          <Menu
            items={menusItems}
            onClick={({ domEvent }) => domEvent.stopPropagation()}
          />
        }
        placement="topLeft"
        trigger={['click']}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <MoreOutlined />
        </div>
      </Dropdown>
    );
  }, [group]);

  return (
    <Item prefix={<UnorderedListOutlined />} suffix={suffix}>
      {group.name}
    </Item>
  );
};

export default GroupItem;
