import { ComponentProps } from 'react';
import { Form } from 'antd';

export const formStaticProps = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export const modalStaticProps = {
  maskClosable: false,
  width: '650px',
  bodyStyle: { paddingBottom: 0 },
};

export const formRules: Record<
  string,
  ComponentProps<typeof Form.Item>['rules']
> = {
  pattern: [{ required: true }],
  description: [{ max: 50 }],
};
