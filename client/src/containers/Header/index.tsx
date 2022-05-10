import { FC, memo } from 'react';
import { PageHeader, Button, Tooltip } from 'antd';
import { PlusOutlined, FullscreenOutlined } from '@ant-design/icons';
import { inIframe } from '@/utils';

const Header: FC = memo(() => {
  return (
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
});

export default Header;
