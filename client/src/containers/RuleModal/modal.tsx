import { FC, ComponentProps, memo, useEffect } from 'react';
import { Modal, Form } from 'antd';
import { Rule } from '@server/src/models/rules/rule.type';
import { modalStaticProps } from './config';
import { RuleForm } from './form';

export interface ModalProps extends ComponentProps<typeof Modal> {
  rule?: Rule;
}

export const RuleModal: FC<ModalProps> = memo(({ rule, ...modalProps }) => {
  const isCreate = !rule;
  const modalTitle = isCreate ? 'Create rule' : 'Edit rule';
  const [form] = Form.useForm();

  useEffect(() => {
    // https://stackoverflow.com/questions/61056421/warning-instance-created-by-useform-is-not-connect-to-any-form-element
    if (!form.__INTERNAL__.name) return;

    if (modalProps.visible) {
      rule && form.setFieldsValue(rule);
    } else {
      form.resetFields();
    }
  }, [rule, form, modalProps.visible]);

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (fields) => {
        try {
          console.log(fields);
        } catch (error) {
          console.error(error);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <Modal
      title={modalTitle}
      {...modalStaticProps}
      {...modalProps}
      onOk={handleOk}
    >
      <RuleForm name="rule" form={form} />
    </Modal>
  );
});
