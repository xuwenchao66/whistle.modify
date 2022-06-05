import { createContext } from 'react';
import { Updater } from 'use-immer';
import { Rule } from '@server/src/models/rule/rule.type';
import { Group } from '@server/src/models/group/group.type';

export interface RuleContextProps {
  rules: Rule[];
  setRules: Updater<Rule[]>;
  deleteRule: (rule: Rule) => void;
  updateRule: (rule: Rule) => void;
}

export const RuleContext = createContext<RuleContextProps>(
  {} as RuleContextProps,
);

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
