import { FC } from 'react';
import { Layout } from 'antd';
import { useRulesTable } from '@/containers/RulesTable';
import Header from '@/containers/Header';

const { Content } = Layout;

export const layoutStyle = { background: '#fff' };

export const App: FC = () => {
  const { table } = useRulesTable();

  return (
    <Layout style={layoutStyle}>
      <Header />
      <Content className="content">{table}</Content>
    </Layout>
  );
};

export default App;
