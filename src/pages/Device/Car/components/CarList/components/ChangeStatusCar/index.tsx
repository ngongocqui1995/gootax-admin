import { CarItem } from '@/pages/Device/Car/data';
import { CarModalState } from '@/pages/Device/Car/model';
import { changeStatusCar } from '@/pages/Device/Car/service';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusCarProps {
  status: string;
  record: CarItem;
}

const ChangeStatusCar: React.FC<ChangeStatusCarProps> = ({ status, record }) => {
  const car: CarModalState = useSelector((state: any) => state?.car);

  const onChange = async (checked: boolean) => {
    const res = await changeStatusCar(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) car.CarList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeStatusCar;
