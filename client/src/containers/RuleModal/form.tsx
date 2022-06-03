import {
  ComponentProps,
  useEffect,
  useMemo,
  useContext,
  useRef,
  useState,
  FC,
  useCallback,
} from 'react';
import { Form, Input, message, Spin } from 'antd';
import { Rule } from '@server/src/models/rule/rule.type';
import { updateRule, createRule } from '@/api/rule';
import { RuleContext } from '@/context';
import { useAsyncFn, useMount } from 'react-use';
import { formStaticProps, formRules, getActionsInfo } from './config';

const responseBodyName = ['replacer', 'response', 'body'];

export interface useRuleForm extends ComponentProps<typeof Form> {
  rule?: Rule;
}

export const useRuleForm = ({
  rule,
  onSuccess,
}: {
  rule?: Rule;
  onSuccess: () => void;
}) => {
  const [form] = Form.useForm();
  const ruleContext = useContext(RuleContext);
  const [JSONEditor, setJSONEditor] = useState<FC>();
  const isCreate = !rule;
  const { successMessage, errorMessage } = getActionsInfo(isCreate);
  // why use the ref for form? https://github.com/ant-design/ant-design/issues/21543
  const formRef = useRef(null);

  useEffect(() => {
    if (!formRef.current) return;
    rule && form.setFieldsValue(rule);
    return () => form.resetFields();
  }, [rule, form]);

  useMount(() => {
    import('@/components/JSONEditor').then((component) => {
      setJSONEditor(component.default);
    });
  });

  const [{ loading }, fetch] = useAsyncFn(
    async (id, rule) => {
      try {
        if (isCreate) {
          const { data } = await createRule(rule);
          ruleContext.setRules((rules) => {
            rules.unshift(data);
          });
        } else {
          const { data } = await updateRule(id, rule);
          ruleContext.updateRule(data);
        }
        message.success(successMessage);
        onSuccess();
      } catch (error) {
        message.error(errorMessage);
      }
    },
    [isCreate],
  );

  const submit = useCallback(async () => {
    form
      .validateFields()
      .then(async (fields) => {
        fetch(rule?.id, fields);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [form, rule, fetch]);

  const ruleForm = useMemo(() => {
    if (!JSONEditor) return <Spin />;
    return (
      <Form form={form} {...formStaticProps} ref={formRef}>
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
  }, [form, formRef, JSONEditor]);

  return {
    ruleForm,
    submit,
    loading,
  };
};
