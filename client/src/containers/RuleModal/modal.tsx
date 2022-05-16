import { FC, ComponentProps, memo } from 'react';
import { Modal } from 'antd';
import { Rule } from '@server/src/models/rules/rule.type';

export interface ModalProps extends ComponentProps<typeof Modal> {
  rule?: Rule;
}

export const RuleModal: FC<ModalProps> = memo(({ rule, ...modalProps }) => {
  const isCreate = !rule;
  const title = isCreate ? 'Create rule' : 'Edit rule';

  return (
    <Modal title={title} maskClosable={false} width="800px" {...modalProps}>
      <p>{rule?.id}</p>
    </Modal>
  );
});
