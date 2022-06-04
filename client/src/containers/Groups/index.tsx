import { useState, useMemo } from 'react';
import { getGroups } from '@/api/group';
import { useRequest } from 'ahooks';
import { Group } from '@server/src/models/group/group.type';
import { Menu } from 'antd';
import { defaultGroup } from './config';

export const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>();
  const handleSuccess = (groups: Group[]) => {
    setGroups(groups);
    setSelectedGroupId(groups[0].id);
  };

  const { loading } = useRequest(getGroups, {
    onSuccess: ({ data }) => handleSuccess(data),
    onError: () => handleSuccess([defaultGroup]),
  });

  const menus = useMemo(() => {
    const items = groups.map((group) => ({ key: group.id, label: group.name }));
    if (!items.length) return null;
    return (
      <Menu
        onClick={({ key }) => setSelectedGroupId(key)}
        defaultSelectedKeys={[items[0].key]}
        items={items}
      />
    );
  }, [groups]);

  return {
    menus,
    loading,
    selectedGroupId,
  };
};
