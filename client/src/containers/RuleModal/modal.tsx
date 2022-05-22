import { FC, ComponentProps, memo, useEffect, useContext } from 'react';
import { Modal, Form, message } from 'antd';
import { Rule } from '@server/src/models/rules/rule.type';
import { RuleContext } from '@/context';
import { useAsyncFn } from 'react-use';
import { updateRule, createRule } from '@/api/rule';
import { modalStaticProps } from './config';
import { RuleForm } from './form';

export interface RuleModalProps extends ComponentProps<typeof Modal> {
  rule?: Rule;
  onSuccess: () => void;
}

export const RuleModal: FC<RuleModalProps> = memo(
  ({ rule, onSuccess, ...modalProps }) => {
    const [form] = Form.useForm();
    const ruleContext = useContext(RuleContext);
    const { visible } = modalProps;
    const isCreate = !rule;
    const modalTitle = isCreate ? 'Create rule' : 'Update rule';

    useEffect(() => {
      if (visible) {
        rule && form.setFieldsValue(rule);
      } else {
        form.resetFields();
      }
    }, [rule, form, visible]);

    const [{ loading: updating }, update] = useAsyncFn(async (id, newRule) => {
      try {
        const { data } = await updateRule(id, newRule);
        message.success('update successfully');
        ruleContext.updateRule(data);
        onSuccess();
      } catch (error) {
        message.error('update failed');
      }
    });

    const [{ loading: creating }, create] = useAsyncFn(async (newRule) => {
      try {
        const { data } = await createRule(newRule);
        message.success('create successfully');
        ruleContext.setRules((rules) => {
          rules.unshift(data);
        });
        onSuccess();
      } catch (error) {
        message.error('create failed');
      }
    });

    const handleOk = async () => {
      form
        .validateFields()
        .then(async (fields) => {
          isCreate ? create(fields) : update(rule.id, fields);
        })
        .catch((e) => {
          console.error(e);
        });
    };

    return (
      <Modal
        {...modalStaticProps}
        {...modalProps}
        title={modalTitle}
        confirmLoading={updating || creating}
        onOk={handleOk}
      >
        <RuleForm form={form} />
      </Modal>
    );
  },
);
