import { FC } from 'react';
import { Layout, PageHeader, Button, Tooltip } from 'antd';
import { PlusOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useRuleTable } from '@/containers/Rule';
import { inIframe } from '@/utils';

const { Content } = Layout;

export const layoutStyle = { background: '#fff' };

export const App: FC = () => {
  const { table } = useRuleTable();

  const header = (
    <PageHeader
      title={'whistle.modify'}
      extra={[
        <Button type="primary" icon={<PlusOutlined />}>
          Create
        </Button>,
        inIframe() ? (
          <Tooltip title="Open in a separate tab" placement="bottomLeft">
            <Button
              icon={<FullscreenOutlined />}
              onClick={() => window.open(window.location.href)}
            />
          </Tooltip>
        ) : null,
      ]}
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
