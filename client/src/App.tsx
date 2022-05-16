import { FC } from 'react';
import { Layout } from 'antd';
import Header from '@/containers/Header';
import { useRulesTable } from '@/containers/RulesTable';
import { useRuleModal } from '@/containers/RuleModal';

const { Content } = Layout;

export const layoutStyle = { background: '#fff' };

export const App: FC = () => {
  const { modal, open } = useRuleModal();
  const { table } = useRulesTable({ onEdit: (rule) => open(rule) });

  return (
    <Layout style={layoutStyle}>
      <Header onCreate={open} />
      <Content className="content">{table}</Content>
      {modal}
    </Layout>
  );
};

export default App;
