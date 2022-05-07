import { FC } from 'react';
import { Layout, PageHeader, Button, List } from 'antd';
import { LIST_LOCALE, PAGE_TITLE, LAYOUT_STYLE } from '@/constants';
import './App.css';

export const App: FC = () => {
  const header = (
    <PageHeader
      title={PAGE_TITLE}
      extra={[<Button type="primary">Add</Button>]}
    />
  );

  return (
    <Layout style={LAYOUT_STYLE}>
      <List
        header={header}
        dataSource={[]}
        locale={LIST_LOCALE}
        renderItem={(item) => <List.Item>123</List.Item>}
      />
    </Layout>
  );
};

export default App;
