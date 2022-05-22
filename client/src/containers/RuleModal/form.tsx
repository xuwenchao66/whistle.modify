import { FC, ComponentProps, forwardRef, lazy, Suspense } from 'react';
import { Form, Input, Spin } from 'antd';
import { formStaticProps, formRules } from './config';

const JSONEditor = lazy(() => import('@/components/JSONEditor'));

const responseBodyName = ['replacer', 'response', 'body'];

export interface RuleForm extends ComponentProps<typeof Form> {}

export const RuleForm: FC<RuleForm> = forwardRef((props, ref) => {
  return (
    <Form {...formStaticProps} {...props} ref={ref}>
      <Form.Item label="Pattern" name="pattern" rules={formRules.pattern}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={formRules.description}
      >
        <Input />
      </Form.Item>
      <Suspense>
        <Form.Item label="Response Body" name={responseBodyName}>
          <JSONEditor />
        </Form.Item>
      </Suspense>
    </Form>
  );
});
