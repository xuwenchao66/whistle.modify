import { FC, ComponentProps } from 'react';
import JSONEditor from '@/components/JSONEditor';
import { Form, Input } from 'antd';
import { formStaticProps, formRules } from './config';

export interface RuleForm {
  form: ComponentProps<typeof Form>['form'];
}

const responseBodyName = ['replacer', 'response', 'body'];

export const RuleForm: FC<RuleForm> = ({ form }) => {
  return (
    <Form {...formStaticProps} form={form}>
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
};
