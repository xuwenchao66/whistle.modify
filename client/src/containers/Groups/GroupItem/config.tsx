import { MenuProps, Typography } from 'antd';

const { Text } = Typography;

export const ACTION_KEY: Record<string, any> = {
  rename: {
    key: 'rename',
    label: <Text>Rename</Text>,
  },
  delete: {
    key: 'delete',
    label: <Text type="danger">Delete</Text>,
  },
};

export const menusItems = Object.keys(ACTION_KEY).reduce((acc, key) => {
  acc?.push(ACTION_KEY[key]);
  return acc;
}, [] as MenuProps['items']);
