import { FC, ComponentProps, memo, useEffect, useContext } from 'react';
import { Modal, Form, message } from 'antd';
import { Rule } from '@server/src/models/rules/rule.type';
import { RuleContext } from '@/context';
import { useAsyncFn } from 'react-use';
import { updateRule } from '@/api/rule';
import { modalStaticProps } from './config';
import { RuleForm } from './form';

export interface RuleModalProps extends ComponentProps<typeof Modal> {
  rule?: Rule;
  onUpdateSuccess: (rule: Rule) => void;
  onCreateSuccess?: (rule: Rule) => void;
}

export const RuleModal: FC<RuleModalProps> = memo(
  ({ rule, onUpdateSuccess, ...modalProps }) => {
    const [form] = Form.useForm();
    const ruleContext = useContext(RuleContext);
    const { visible } = modalProps;
    const isCreate = !rule;
    const modalTitle = isCreate ? 'Create rule' : 'Update rule';

    useEffect(() => {
      // https://stackoverflow.com/questions/61056421/warning-instance-created-by-useform-is-not-connect-to-any-form-element
      if (!form.__INTERNAL__.name) return;

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
        onUpdateSuccess(data);
      } catch (error) {
        message.error('update failed');
      }
    });

    const handleOk = async () => {
      form
        .validateFields()
        .then(async (fields) => {
          if (!isCreate) {
            update(rule.id, fields);
          }
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
        confirmLoading={updating}
        onOk={handleOk}
      >
        <RuleForm name="rule" form={form} />
      </Modal>
    );
  },
);
