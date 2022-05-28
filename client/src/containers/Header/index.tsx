import { FC, memo } from 'react';
import { PageHeader, Button, Tooltip } from 'antd';
import {
  PlusOutlined,
  FullscreenOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { inIframe } from '@/utils';

export interface HeaderProps {
  onCreate: () => void;
  onReload: () => void;
}

const Header: FC<HeaderProps> = memo(({ onCreate, onReload }) => {
  const extra = [
    <Button
      key="create"
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => onCreate()}
    >
      Create
    </Button>,
    <Tooltip key="reload" title="Reload the table" placement="bottomLeft">
      <Button icon={<ReloadOutlined />} onClick={onReload} />
    </Tooltip>,
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
