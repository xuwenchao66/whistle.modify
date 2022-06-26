import { LOCAL_STORAGE_KEY } from '@/constants';
import { Group } from '@server/src/models/group/group.type';

export const getLastSelectedGroup = (groups: Group[]): Group => {
  const groupId = localStorage.getItem(LOCAL_STORAGE_KEY.lastSelectedGroupId);
  const lastSelectedGroup = groups.find((g) => g.id === groupId);
  return lastSelectedGroup || groups[0];
};

export const setLastSelectedGroupId = (id: Group['id']) => {
  localStorage.setItem(LOCAL_STORAGE_KEY.lastSelectedGroupId, id);
};
