import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
// @ts-ignore
import Access from '@/components/Access';
import { TYPE_FORM } from '@/utils/utils.enum';
import { FormattedMessage, useDispatch } from '@umijs/max';

const CreateRoad: React.FC = () => {
  const dispatch = useDispatch();
  const access = Access();

  const handleClick = () => {
    dispatch({ type: 'road/updateRoadForm', payload: { type: TYPE_FORM.CREATE } });
  };

  return (
    <Button
      className={`${access.className([TYPE_FORM.CREATE])}`}
      type="primary"
      onClick={handleClick}
      icon={<PlusOutlined />}
    >
      <FormattedMessage id="pages.create" defaultMessage="Tạo mới" />
    </Button>
  );
};

export default CreateRoad;
