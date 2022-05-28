import { FC, memo } from 'react';
import { Layout } from 'antd';
import Header from '@/containers/Header';
import { useRulesTable } from '@/containers/RulesTable';
import { useRuleModal } from '@/containers/RuleModal';
import { RuleContext, RuleContextProps } from '@/context';
import { useImmer } from 'use-immer';
import { Rule } from '@server/src/models/rules/rule.type';

const { Content } = Layout;

export const layoutStyle = { background: '#fff' };

export const Main = () => {
  const { modal, open } = useRuleModal();
  const { table, get } = useRulesTable({ onUpdate: (rule) => open(rule) });

  return (
    <>
      <Header onCreate={open} onReload={get} />
      <Content className="content">{table}</Content>
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
    <Layout style={layoutStyle}>
      <RuleContext.Provider value={ruleContext}>
        <Main />
      </RuleContext.Provider>
    </Layout>
  );
};

export default App;
