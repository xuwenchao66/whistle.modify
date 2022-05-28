import { FC, ComponentProps, forwardRef } from 'react';
import { Form, Input } from 'antd';
import { formStaticProps, formRules } from './config';
import JSONEditor from '@/components/JSONEditor';

const responseBodyName = ['replacer', 'response', 'body'];

export interface RuleForm extends ComponentProps<typeof Form> {}

const RuleForm: FC<RuleForm> = forwardRef((props, ref) => {
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
      <Form.Item label="Response Body" name={responseBodyName}>
        <JSONEditor />
      </Form.Item>
    </Form>
  );
});

export default RuleForm;
