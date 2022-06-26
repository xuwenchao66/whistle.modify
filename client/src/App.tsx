import { FC, useCallback } from 'react';
import { Layout, Spin } from 'antd';
import Header from '@/containers/Header';
import { useGroups } from '@/containers/Groups';
import AddGroup from '@/containers/AddGroup';
import { useRulesTable } from '@/containers/RulesTable';
import { useRuleModal } from '@/containers/RuleModal';
import { RuleContextProvider, GroupContextProvider } from '@/context';
import style from './index.module.less';

const { Content, Sider } = Layout;

export const Main = () => {
  const { menus, loading } = useGroups();
  const { modal, open } = useRuleModal();
  const { table, getRules } = useRulesTable({
    onUpdate: (rule) => open(rule),
  });
  const openCreateModal = useCallback(() => open(), [open]);

  return (
    <>
      <Header onCreate={openCreateModal} onReload={getRules} />
      <Layout className={style.layout}>
        <Spin spinning={loading}>
          <Sider className={style.sider} theme="light">
            {menus}
            {!loading && <AddGroup />}
          </Sider>
        </Spin>
        <Content className={style.content}>{table}</Content>
      </Layout>
      {modal}
    </>
  );
};

export const App: FC = () => {
  return (
    <Layout className={style.layout}>
      <GroupContextProvider>
        <RuleContextProvider>
          <Main />
        </RuleContextProvider>
      </GroupContextProvider>
    </Layout>
  );
};

export default App;
