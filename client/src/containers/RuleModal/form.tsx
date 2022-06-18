import { useMemo, useContext, useRef, useState, FC, useCallback } from 'react';
import { Form, Input, message } from 'antd';
import { Rule } from '@server/src/models/rule/rule.type';
import { updateRule, createRule } from '@/api/rule';
import { RuleContext, GroupContext } from '@/context';
import { useMount } from 'react-use';
import { formStaticProps, formRules, getActionsInfo } from './config';
import { useRequest } from 'ahooks';

const responseBodyName = ['replacer', 'response', 'body'];

const patternNormalize = (val: string) => val.trim();

export const useRuleForm = ({
  rule,
  onSuccess,
}: {
  rule?: Partial<Rule>;
  onSuccess: () => void;
}) => {
  const [form] = Form.useForm();
  const ruleContext = useContext(RuleContext);
  const { selectedGroup } = useContext(GroupContext);
  const [JSONEditor, setJSONEditor] = useState<FC>();
  const isCreate = !rule?.id;
  const { successMessage, errorMessage } = getActionsInfo(isCreate);
  // why use the ref for form? https://github.com/ant-design/ant-design/issues/21543
  const formRef = useRef(null);

  const resetFields = useCallback(() => {
    if (!formRef.current) return;
    form.resetFields();
  }, [form]);

  const setFields = useCallback(
    (rule: Partial<Rule>) => {
      if (!formRef.current) return;
      form.setFieldsValue(rule);
    },
    [form],
  );

  const { loading, run } = useRequest(
    async (id, fields: Partial<Rule>) => {
      if (isCreate) {
        const { data } = await createRule({
          groupId: selectedGroup.id,
          ...fields,
        });
        ruleContext.setRules((rules) => {
          rules.unshift(data);
        });
      } else {
        const { data } = await updateRule(id, fields);
        ruleContext.updateRule(data);
      }
    },
    {
      manual: true,
      onSuccess: () => {
        message.success(successMessage);
        onSuccess();
      },
      onError: () => {
        message.error(errorMessage);
      },
    },
  );

  const submit = useCallback(async () => {
    form
      .validateFields()
      .then(async (fields) => {
        run(rule?.id, fields);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [form, rule, fetch]);

  useMount(() => {
    import('@/components/JSONEditor').then((component) => {
      setJSONEditor(component.default);
    });
  });

  const ruleForm = useMemo(() => {
    return (
      <Form form={form} {...formStaticProps} ref={formRef}>
        <Form.Item
          label="Pattern"
          name="pattern"
          rules={formRules.pattern}
          normalize={patternNormalize}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={formRules.description}
        >
          <Input />
        </Form.Item>
        {JSONEditor && (
          <Form.Item label="Response Body" name={responseBodyName}>
            <JSONEditor />
          </Form.Item>
        )}
      </Form>
    );
  }, [form, formRef, JSONEditor]);

  return {
    ruleForm,
    submit,
    loading,
    setFields,
    resetFields,
  };
};
