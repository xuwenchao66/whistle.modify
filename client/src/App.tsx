import { FC } from 'react';
import { Layout, PageHeader, Button } from 'antd';
import { useAsync } from 'react-use';
import { RuleTable } from '@/containers/Rule/Table';
import { getRules } from '@/api/rule';
import { PlusOutlined } from '@ant-design/icons';

const { Content } = Layout;

export const layoutStyle = { background: '#fff' };

export const App: FC = () => {
  const { value, loading } = useAsync(getRules);

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
      <Content className="content">
        <RuleTable dataSource={value?.data} loading={loading} />
      </Content>
    </Layout>
  );
};

export default App;
