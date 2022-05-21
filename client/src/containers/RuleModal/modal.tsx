import { FC, ComponentProps, memo } from 'react';
import { Modal, Form, Input } from 'antd';
import { Rule } from '@server/src/models/rules/rule.type';
import { formStaticProps, modalStaticProps, formRules } from './config';

export interface ModalProps extends ComponentProps<typeof Modal> {
  rule?: Rule;
}

export const RuleModal: FC<ModalProps> = memo(({ rule, ...modalProps }) => {
  const isCreate = !rule;
  const modalTitle = isCreate ? 'Create rule' : 'Edit rule';
  const [form] = Form.useForm();

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
      </Form>
    </Modal>
  );
});
