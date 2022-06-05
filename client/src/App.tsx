import { FC, useCallback } from 'react';
import { Layout, Spin } from 'antd';
import Header from '@/containers/Header';
import { useGroups } from '@/containers/Groups';
import AddGroup from '@/containers/AddGroup';
import { useRulesTable } from '@/containers/RulesTable';
import { useRuleModal } from '@/containers/RuleModal';
import {
  RuleContext,
  RuleContextProps,
  GroupContext,
  GroupContextProps,
} from '@/context';
import { useImmer } from 'use-immer';
import { Rule } from '@server/src/models/rule/rule.type';
import { Group } from '@server/src/models/group/group.type';
import style from './index.module.less';

const { Content, Sider } = Layout;

export const Main = () => {
  const { menus, loading } = useGroups();
  const { modal, open } = useRuleModal();
  const { table, getRules } = useRulesTable({
    onUpdate: (rule) => open(rule),
  });
  const openCreateModal = useCallback(() => open(), [open]);

  return (
    <>
      <Header onCreate={openCreateModal} onReload={getRules} />
      <Layout className={style.layout}>
        <Spin spinning={loading}>
          <Sider className={style.sider} theme="light">
            {menus}
            {!loading && <AddGroup />}
          </Sider>
        </Spin>
        <Content className={style.content}>{table}</Content>
      </Layout>
      {modal}
    </>
  );
};

export const App: FC = () => {
  const [rules, setRules] = useImmer<Rule[]>([]);
  const [groups, setGroups] = useImmer<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useImmer<Group>({} as Group);

  const ruleContext: RuleContextProps = {
    rules,
    setRules,
    deleteRule: (rule) =>
      setRules((rules) => {
        const deleteIndex = rules.findIndex((r) => r.id === rule.id);
        rules.splice(deleteIndex, 1);
      }),
    updateRule: (rule) =>
      setRules((rules) => {
        const oldRuleIndex = rules.findIndex((r) => r.id === rule.id);
        rules[oldRuleIndex] = rule;
      }),
  };

  const groupContext: GroupContextProps = {
    groups,
    setGroups,
    selectedGroup,
    setSelectedGroup: (group) => setSelectedGroup(group),
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

  return (
    <Layout className={style.layout}>
      <GroupContext.Provider value={groupContext}>
        <RuleContext.Provider value={ruleContext}>
          <Main />
        </RuleContext.Provider>
      </GroupContext.Provider>
    </Layout>
  );
};

export default App;
