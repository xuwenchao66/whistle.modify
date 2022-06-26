import { useMemo, useContext } from 'react';
import { getGroups } from '@/api/group';
import { useRequest } from 'ahooks';
import { Group } from '@server/src/models/group/group.type';
import { Menu, MenuItemProps } from 'antd';
import { GroupContext } from '@/context';
import { DEFAULT_GROUP } from '@/constants';
import GroupItem from './GroupItem';
import style from './index.module.less';
import { getLastSelectedGroup } from '@/functions/group';

export const useGroups = () => {
  const { setGroups, setSelectedGroup, selectedGroup, groups } =
    useContext(GroupContext);

  const handleSuccess = (groups: Group[]) => {
    setGroups(groups);
    setSelectedGroup(getLastSelectedGroup(groups));
  };

  const { loading } = useRequest(getGroups, {
    onSuccess: ({ data }) => handleSuccess(data),
    onError: () => handleSuccess([DEFAULT_GROUP]),
  });

  const menus = useMemo(() => {
    const items = groups.map((group) => ({
      key: group.id,
      label: <GroupItem group={group} />,
    }));

    if (!items.length) return null;

    const onItemClick: MenuItemProps['onClick'] = ({ key }) => {
      setSelectedGroup(groups.find((g) => g.id === key) as Group);
    };

    return (
      <Menu
        className={style.menusContainer}
        onClick={onItemClick}
        selectedKeys={[selectedGroup.id]}
        items={items}
      />
    );
  }, [groups, setSelectedGroup]);

  return {
    menus,
    loading,
  };
};
