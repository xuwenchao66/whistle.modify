import { useState, useContext, useCallback, useRef } from 'react';
import { PlusOutlined, EnterOutlined } from '@ant-design/icons';
import { Input, Spin, message } from 'antd';
import { GROUP_NAME_MAX_LENGTH } from '@/constants';
import { useRequest } from 'ahooks';
import { createGroup } from '@/api/group';
import { GroupContext } from '@/context';
import Item from '@/components/Item';
import style from './index.module.less';

const AddGroup = () => {
  const groupContext = useContext(GroupContext);
  const [groupName, serGroupName] = useState('');
  const inputRef = useRef<any>();
  const { loading, run } = useRequest(() => createGroup({ name: groupName }), {
    manual: true,
    onSuccess: ({ data }) => {
      groupContext.setGroups((groups) => {
        groups.push(data);
      });
      serGroupName('');
    },
    onError: () => {
      message.error('Create failed');
    },
  });

  const create = useCallback(() => {
    if (loading) return;
    if (!groupName) return inputRef.current.blur();
    run();
  }, [run, loading, groupName, inputRef]);

  return (
    <Spin spinning={loading}>
      <Item
        className={style.container}
        onPrefixClick={() => inputRef.current.focus()}
        onSuffixClick={create}
        prefix={<PlusOutlined />}
        suffix={<EnterOutlined />}
      >
        <Input
          placeholder="add group"
          bordered={false}
          ref={inputRef}
          value={groupName}
          maxLength={GROUP_NAME_MAX_LENGTH}
          onPressEnter={create}
          onChange={(e) => serGroupName(e.target.value)}
        />
      </Item>
    </Spin>
  );
};

export default AddGroup;
