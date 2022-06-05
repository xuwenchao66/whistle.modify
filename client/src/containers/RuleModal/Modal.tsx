import { FC, ComponentProps, memo, useEffect } from 'react';
import { Modal } from 'antd';
import { Rule } from '@server/src/models/rule/rule.type';
import { modalStaticProps, getActionsInfo } from './config';
import { useRuleForm } from './Form';

export interface RuleModalProps extends ComponentProps<typeof Modal> {
  rule?: Partial<Rule>;
  onSuccess: () => void;
}

export const RuleModal: FC<RuleModalProps> = memo(
  ({ rule, onSuccess, ...modalProps }) => {
    const { ruleForm, submit, loading, resetFields } = useRuleForm({
      rule,
      onSuccess,
    });
    const isCreate = !rule?.id;
    const { title, actionText } = getActionsInfo(isCreate);

    useEffect(() => {
      !modalProps.visible && resetFields();
    }, [modalProps.visible]);

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
