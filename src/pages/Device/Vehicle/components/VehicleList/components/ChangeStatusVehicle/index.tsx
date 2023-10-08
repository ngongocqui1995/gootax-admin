import { VehicleItem } from '@/pages/Device/Vehicle/data';
import { VehicleModalState } from '@/pages/Device/Vehicle/model';
import { changeStatusVehicle } from '@/pages/Device/Vehicle/service';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusVehicleProps {
  status: string;
  record: VehicleItem;
}

const ChangeStatusVehicle: React.FC<ChangeStatusVehicleProps> = ({ status, record }) => {
  const vehicle: VehicleModalState = useSelector((state: any) => state?.vehicle);

  const onChange = async (checked: boolean) => {
    const res = await changeStatusVehicle(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) vehicle.VehicleList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeStatusVehicle;
