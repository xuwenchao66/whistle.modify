import {
  FC,
  ComponentProps,
  memo,
  useEffect,
  useContext,
  useRef,
  lazy,
  Suspense,
} from 'react';
import { Modal, Form, message } from 'antd';
import { Rule } from '@server/src/models/rule/rule.type';
import { RuleContext } from '@/context';
import { useAsyncFn } from 'react-use';
import { updateRule, createRule } from '@/api/rule';
import { modalStaticProps } from './config';

const RuleForm = lazy(() => import('./form'));

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
    const actionText = isCreate ? 'Create' : 'Update';
    const modalTitle = `${actionText} rule`;
    const successMessage = `${actionText} successfully`;
    const errorMessage = `${actionText} failed`;
    // why use the ref for form? https://github.com/ant-design/ant-design/issues/21543
    const formRef = useRef(null);

    useEffect(() => {
      if (!formRef.current) return;
      if (visible) {
        rule && form.setFieldsValue(rule);
      } else {
        form.resetFields();
      }
    }, [rule, form, visible]);

    const [{ loading }, fetch] = useAsyncFn(
      async (id, rule) => {
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
      [isCreate],
    );

    const handleOk = async () => {
      form
        .validateFields()
        .then(async (fields) => {
          fetch(rule?.id, fields);
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
        confirmLoading={loading}
        okText={actionText}
        onOk={handleOk}
      >
        <Suspense>
          <RuleForm form={form} ref={formRef} />
        </Suspense>
      </Modal>
    );
  },
);
