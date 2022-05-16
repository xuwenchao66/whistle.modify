import { FC, memo } from 'react';
import { PageHeader, Button, Tooltip } from 'antd';
import { PlusOutlined, FullscreenOutlined } from '@ant-design/icons';
import { inIframe } from '@/utils';

export interface HeaderProps {
  onCreate: () => void;
}

const Header: FC<HeaderProps> = memo(({ onCreate }) => {
  const extra = [
    <Button
      key="create"
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => onCreate()}
    >
      Create
    </Button>,
    inIframe() ? (
      <Tooltip key="open" title="Open in a separate tab" placement="bottomLeft">
        <Button
          icon={<FullscreenOutlined />}
          onClick={() => window.open(window.location.href)}
        />
      </Tooltip>
    ) : null,
  ];

  return <PageHeader title={'whistle.modify'} extra={extra} />;
});

export default Header;
