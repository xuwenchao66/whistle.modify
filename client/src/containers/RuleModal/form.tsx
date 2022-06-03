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
import { useMount } from 'react-use';
import { formStaticProps, formRules, getActionsInfo } from './config';
import { useRequest } from 'ahooks';

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

  const resetFields = useCallback(() => form.resetFields(), [form]);

  const { loading, runAsync } = useRequest(
    async (id, rule: Rule) => {
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
    { manual: true },
  );

  const submit = useCallback(async () => {
    form
      .validateFields()
      .then(async (fields) => {
        runAsync(rule?.id, fields);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [form, rule, fetch]);

  useEffect(() => {
    if (!formRef.current) return;
    resetFields();
    rule && form.setFieldsValue(rule);
  }, [rule, form, resetFields]);

  useMount(() => {
    import('@/components/JSONEditor').then((component) => {
      setJSONEditor(component.default);
    });
  });

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
    resetFields,
  };
};