import { DriverItem } from '@/pages/Admin/Driver/data';
import { DriverModalState } from '@/pages/Admin/Driver/model';
import { changeStatusDriver } from '@/pages/Admin/Driver/service';
import { statusEnum } from '@/utils/utils.enum';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusDriverProps {
  status: string;
  record: DriverItem;
}

const ChangeStatusDriver: React.FC<ChangeStatusDriverProps> = ({ status, record }) => {
  const driver: DriverModalState = useSelector((state: any) => state?.driver);

  const onChange = async (checked: boolean) => {
    const res = await changeStatusDriver(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) driver.DriverList?.reload?.();
  };

  if (status === statusEnum.INIT.key) return statusEnum.INIT.text;
  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeStatusDriver;
