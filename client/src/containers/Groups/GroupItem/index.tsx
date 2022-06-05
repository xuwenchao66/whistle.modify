import { FC, memo, useContext, useState, useLayoutEffect, useRef } from 'react';
import { Group } from '@server/src/models/group/group.type';
import { DEFAULT_GROUP } from '@/constants';
import { Dropdown, Menu, message, MenuItemProps, Input } from 'antd';
import { UnorderedListOutlined, MoreOutlined } from '@ant-design/icons';
import Item from '@/components/Item';
import { useRequest } from 'ahooks';
import { deleteGroup, updateGroup } from '@/api/group';
import { menusItems, ACTION_KEY } from './config';
import { GroupContext } from '@/context';
import { GROUP_NAME_MAX_LENGTH } from '@/constants';

export interface GroupItemSuffixProps {
  group: Group;
  onRename: () => void;
}

const GroupItemSuffix: FC<GroupItemSuffixProps> = memo(
  ({ group, onRename }) => {
    const groupContext = useContext(GroupContext);
    const { selectedGroup, setSelectedGroup, groups } = groupContext;
    const isSelected = selectedGroup.id === group.id;

    const { run: runDelete } = useRequest(() => deleteGroup(group.id), {
      manual: true,
      onSuccess: () => {
        message.success('Delete successfully');
        // 如果处于选中状态，则删除后，自动选中上一个 group
        if (isSelected) {
          const prevGroupIndex = groups.findIndex((g) => g.id === group.id) - 1;
          setSelectedGroup(groups[prevGroupIndex]);
        }
        groupContext.deleteGroup(group);
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
        case ACTION_KEY.rename.key:
          onRename();
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
  },
);

export interface GroupItemProps {
  group: Group;
}

const GroupItem: FC<GroupItemProps> = ({ group }) => {
  const groupContext = useContext(GroupContext);
  const [groupName, setGroupName] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const inputRef = useRef<any>(null);
  const reset = () => {
    setGroupName('');
    setIsEditMode(false);
  };

  const { run } = useRequest(updateGroup, {
    manual: true,
    onSuccess: ({ data }) => {
      groupContext.updateGroup(data);
    },
  });

  const runRename = () => {
    if (groupName && groupName !== group.name) {
      run(group.id, { name: groupName });
    }
    reset();
  };

  const handleRename = () => {
    setGroupName(group.name);
    setIsEditMode(true);
  };

  useLayoutEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <Item
      prefix={<UnorderedListOutlined />}
      suffix={<GroupItemSuffix group={group} onRename={handleRename} />}
    >
      {isEditMode ? (
        <Input
          ref={inputRef}
          value={groupName}
          onBlur={runRename}
          onPressEnter={runRename}
          maxLength={GROUP_NAME_MAX_LENGTH}
          onChange={(e) => setGroupName(e.target.value)}
        />
      ) : (
        group.name
      )}
    </Item>
  );
};

export default GroupItem;
