import { ComponentProps } from 'react';
import { Form } from 'antd';

export const formStaticProps = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

export const modalStaticProps = {
  maskClosable: false,
  width: '700px',
  centered: true,
  bodyStyle: { paddingBottom: 0 },
};

export const formRules: Record<
  string,
  ComponentProps<typeof Form.Item>['rules']
> = {
  pattern: [{ required: true }],
  description: [{ max: 50 }],
};

export const getActionsInfo = (isCreate: boolean) => {
  const actionText = isCreate ? 'Create' : 'Update';

  return {
    actionText,
    title: `${actionText} rule`,
    successMessage: `${actionText} successfully`,
    errorMessage: `${actionText} failed`,
  };
};
