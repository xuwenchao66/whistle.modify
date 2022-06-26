import { createContext, FC, ReactNode } from 'react';
import { Updater, useImmer } from 'use-immer';
import { Group } from '@server/src/models/group/group.type';
import { setLastSelectedGroupId } from '@/functions/group';

export interface GroupContextProps {
  groups: Group[];
  setGroups: Updater<Group[]>;
  selectedGroup: Group;
  setSelectedGroup: (group: Group) => void;
  deleteGroup: (group: Group) => void;
  updateGroup: (group: Group) => void;
}

export const GroupContext = createContext<GroupContextProps>(
  {} as GroupContextProps,
);

export const useGroupContextValue = () => {
  const [groups, setGroups] = useImmer<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useImmer<Group>({} as Group);

  const groupContext: GroupContextProps = {
    groups,
    setGroups,
    selectedGroup,
    setSelectedGroup: (group) => {
      setSelectedGroup(group);
      setLastSelectedGroupId(group.id);
    },
    deleteGroup: (group) =>
      setGroups((groups) => {
        const deleteIndex = groups.findIndex((r) => r.id === group.id);
        groups.splice(deleteIndex, 1);
      }),
    updateGroup: (group) =>
      setGroups((groups) => {
        const oldRuleIndex = groups.findIndex((r) => r.id === group.id);
        groups[oldRuleIndex] = group;
      }),
  };

  return groupContext;
};

export const GroupContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const value = useGroupContextValue();
  return (
    <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
  );
};
