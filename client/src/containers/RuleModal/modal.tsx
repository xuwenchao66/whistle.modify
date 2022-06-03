import { FC, ComponentProps, memo } from 'react';
import { Modal } from 'antd';
import { Rule } from '@server/src/models/rule/rule.type';
import { modalStaticProps, getActionsInfo } from './config';
import { useRuleForm } from './form';

export interface RuleModalProps extends ComponentProps<typeof Modal> {
  rule?: Rule;
  onSuccess: () => void;
}

export const RuleModal: FC<RuleModalProps> = memo(
  ({ rule, onSuccess, ...modalProps }) => {
    const { ruleForm, submit, loading, resetFields } = useRuleForm({
      rule,
      onSuccess,
    });
    const isCreate = !rule;
    const { title, actionText } = getActionsInfo(isCreate);

    isCreate && resetFields();

    return (
      <Modal
        {...modalStaticProps}
        {...modalProps}
        title={title}
        confirmLoading={loading}
        okText={actionText}
        onOk={submit}
      >
        {ruleForm}
      </Modal>
    );
  },
);
