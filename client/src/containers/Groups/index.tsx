import { useMemo, useContext } from 'react';
import { getGroups } from '@/api/group';
import { useRequest } from 'ahooks';
import { Group } from '@server/src/models/group/group.type';
import { Menu } from 'antd';
import { GroupContext } from '@/context';
import { DEFAULT_GROUP } from '@/constants';
import GroupItem from './GroupItem';
import style from './index.module.less';

export const useGroups = () => {
  const groupContext = useContext(GroupContext);

  const handleSuccess = (groups: Group[]) => {
    groupContext.setGroups(groups);
    groupContext.setSelectedGroup(groups[0]);
  };

  const { loading } = useRequest(getGroups, {
    onSuccess: ({ data }) => handleSuccess(data),
    onError: () => handleSuccess([DEFAULT_GROUP]),
  });

  const menus = useMemo(() => {
    const items = groupContext.groups.map((group) => ({
      key: group.id,
      label: <GroupItem group={group} />,
    }));
    if (!items.length) return null;
    return (
      <Menu
        className={style.menusContainer}
        onClick={({ key }) =>
          groupContext.setSelectedGroup(
            groupContext.groups.find((g) => g.id === key) as Group,
          )
        }
        defaultSelectedKeys={[items[0].key]}
        items={items}
      />
    );
  }, [groupContext.groups, groupContext.setSelectedGroup]);

  return {
    menus,
    loading,
  };
};
