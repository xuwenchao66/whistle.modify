import { useState, useMemo, useContext } from 'react';
import { getGroups } from '@/api/group';
import { useRequest } from 'ahooks';
import { Group } from '@server/src/models/group/group.type';
import { Menu } from 'antd';
import { GroupContext } from '@/context';
import { defaultGroup } from './config';
import GroupItem from './GroupItem';
import style from './index.module.less';

export const useGroups = () => {
  const groupContext = useContext(GroupContext);
  const [selectedGroupId, setSelectedGroupId] = useState<string>();
  const handleSuccess = (groups: Group[]) => {
    groupContext.setGroups(groups);
    setSelectedGroupId(groups[0].id);
  };

  const { loading } = useRequest(getGroups, {
    onSuccess: ({ data }) => handleSuccess(data),
    onError: () => handleSuccess([defaultGroup]),
  });

  const menus = useMemo(() => {
    const items = groupContext.groups.map((group) => ({
      key: group.id,
      label: <GroupItem group={group} />,
    }));
    if (!items.length) return null;
    return (
      <>
        <Menu
          className={style.menusContainer}
          onClick={({ key }) => setSelectedGroupId(key)}
          defaultSelectedKeys={[items[0].key]}
          items={items}
        />
      </>
    );
  }, [groupContext.groups, setSelectedGroupId]);

  return {
    menus,
    loading,
    selectedGroupId,
  };
};
