import { FC, useCallback } from 'react';
import { Layout, Spin } from 'antd';
import Header from '@/containers/Header';
import { useGroups } from '@/containers/Groups';
import { useRulesTable } from '@/containers/RulesTable';
import { useRuleModal } from '@/containers/RuleModal';
import { RuleContext, RuleContextProps } from '@/context';
import { useImmer } from 'use-immer';
import { Rule } from '@server/src/models/rule/rule.type';

const { Content, Sider } = Layout;

export const Main = () => {
  const { menus, selectedGroupId, loading } = useGroups();
  const { modal, open } = useRuleModal();
  const { table, getRules } = useRulesTable({
    groupId: selectedGroupId,
    onUpdate: (rule) => open(rule),
  });
  const openCreateModal = useCallback(
    () => open({ groupId: selectedGroupId }),
    [selectedGroupId, open],
  );

  return (
    <>
      <Header onCreate={openCreateModal} onReload={getRules} />
      <Layout>
        <Spin spinning={loading}>
          <Sider theme="light">{menus}</Sider>
        </Spin>
        <Content className="content">{table}</Content>
      </Layout>
      {modal}
    </>
  );
};

export const App: FC = () => {
  const [rules, setRules] = useImmer<Rule[]>([]);

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

  return (
    <Layout>
      <RuleContext.Provider value={ruleContext}>
        <Main />
      </RuleContext.Provider>
    </Layout>
  );
};

export default App;
