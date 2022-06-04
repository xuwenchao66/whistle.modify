import { useState, useContext, useCallback, useRef, RefObject } from 'react';
import { PlusOutlined, EnterOutlined } from '@ant-design/icons';
import { Input, Spin, message } from 'antd';
import { groupNameMaxLength } from '@/constants';
import { useRequest } from 'ahooks';
import { createGroup } from '@/api/group';
import { GroupContext } from '@/context';

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
      <Input
        className="add-group-input"
        placeholder="add group"
        bordered={false}
        ref={inputRef}
        value={groupName}
        maxLength={groupNameMaxLength}
        onPressEnter={create}
        prefix={<PlusOutlined onClick={() => inputRef.current.focus()} />}
        suffix={<EnterOutlined onClick={create} />}
        onChange={(e) => serGroupName(e.target.value)}
      />
    </Spin>
  );
};

export default AddGroup;
