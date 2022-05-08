import { FC } from 'react';
import { Layout, PageHeader, Button, List } from 'antd';
import { LIST_LOCALE, PAGE_TITLE, LAYOUT_STYLE } from '@/constants';
import { getRules } from '@/api/rule';
import { useAsync } from 'react-use';
import './App.css';

export const App: FC = () => {
  getRules({ data: { id: 123 } });
  const { value, loading, error } = useAsync(getRules);
  console.log(value?.data, loading, error);

  const header = (
    <PageHeader
      title={PAGE_TITLE}
      extra={<Button type="primary">Add</Button>}
    />
  );

  return (
    <Layout style={LAYOUT_STYLE}>
      <List
        header={header}
        dataSource={[]}
        locale={LIST_LOCALE}
        // renderItem={(item) => <List.Item>123</List.Item>}
      />
    </Layout>
  );
};

export default App;
