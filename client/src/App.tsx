import { FC } from 'react';
import { Layout, PageHeader, Button } from 'antd';
import { useRuleTable } from '@/containers/Rule';
import { PlusOutlined } from '@ant-design/icons';

const { Content } = Layout;

export const layoutStyle = { background: '#fff' };

export const App: FC = () => {
  const { table } = useRuleTable();

  const header = (
    <PageHeader
      title={'whistle.modify'}
      extra={
        <Button type="primary" icon={<PlusOutlined />}>
          Add
        </Button>
      }
    />
  );

  return (
    <Layout style={layoutStyle}>
      {header}
      <Content className="content">{table}</Content>
    </Layout>
  );
};

export default App;
