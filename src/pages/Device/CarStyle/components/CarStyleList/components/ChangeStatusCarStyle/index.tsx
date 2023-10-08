import { CarStyleItem } from '@/pages/Device/CarStyle/data';
import { CarStyleModalState } from '@/pages/Device/CarStyle/model';
import { changeStatusCarStyle } from '@/pages/Device/CarStyle/service';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusCarStyleProps {
  status: string;
  record: CarStyleItem;
}

const ChangeStatusCarStyle: React.FC<ChangeStatusCarStyleProps> = ({ status, record }) => {
  const car_style: CarStyleModalState = useSelector((state: any) => state?.car_style);

  const onChange = async (checked: boolean) => {
    const res = await changeStatusCarStyle(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) car_style.CarStyleList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeStatusCarStyle;
