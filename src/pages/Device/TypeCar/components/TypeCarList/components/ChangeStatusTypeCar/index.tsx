import { TypeCarItem } from '@/pages/Device/TypeCar/data';
import { TypeCarModalState } from '@/pages/Device/TypeCar/model';
import { changeStatusTypeCar } from '@/pages/Device/TypeCar/service';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusTypeCarProps {
  status: string;
  record: TypeCarItem;
}

const ChangeStatusTypeCar: React.FC<ChangeStatusTypeCarProps> = ({ status, record }) => {
  const type_car: TypeCarModalState = useSelector((state: any) => state?.type_car);

  const onChange = async (checked: boolean) => {
    const res = await changeStatusTypeCar(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) type_car.TypeCarList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeStatusTypeCar;
