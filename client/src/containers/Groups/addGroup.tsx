import { PlusOutlined, EnterOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { groupNameMaxLength } from '@/constants';

const AddGroup = () => {
  return (
    <Input
      className="add-group-input"
      placeholder="add group"
      bordered={false}
      maxLength={groupNameMaxLength}
      prefix={<PlusOutlined />}
      suffix={<EnterOutlined />}
    />
  );
};

export default AddGroup;
