import { ComponentProps } from 'react';
import { Form } from 'antd';

export const formStaticProps = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

export const modalStaticProps = {
  forceRender: true, // https://github.com/ant-design/ant-design/issues/21543
  destroyOnClose: true,
  maskClosable: false,
  width: '700px',
  centered: true,
  bodyStyle: { paddingBottom: 0 },
};

export const formRules: Record<
  string,
  ComponentProps<typeof Form.Item>['rules']
> = {
  pattern: [{ required: true }],
  description: [{ max: 50 }],
};
