import { DriverItem } from '@/pages/Admin/Driver/data';
import { DriverModalState } from '@/pages/Admin/Driver/model';
import { changeStatusDriver } from '@/pages/Admin/Driver/service';
import { statusEnum } from '@/utils/utils.enum';
import { ToolOutlined } from '@ant-design/icons';
import { useSelector } from '@umijs/max';
import { Popconfirm } from 'antd';
import React from 'react';

interface ApproveDriverProps {
  record: DriverItem;
}

const ApproveDriver: React.FC<ApproveDriverProps> = ({ record }) => {
  const driver: DriverModalState = useSelector((state: any) => state?.driver);

  const onConfirm = async () => {
    const res = await changeStatusDriver(record.id, 'ACTIVE');
    if (res) driver.DriverList?.reload?.();
  };

  if (record?.status !== statusEnum.INIT.key) return null;
  return (
    <Popconfirm
      placement="topLeft"
      title="Duyệt tài xế"
      description="Bạn có chắc chắn duyệt cho tài xế này?"
      onConfirm={onConfirm}
      okText="Đồng ý"
      cancelText="Huỷ"
    >
      <ToolOutlined style={{ fontSize: '16px', color: 'blue' }} />
    </Popconfirm>
  );
};

export default ApproveDriver;
