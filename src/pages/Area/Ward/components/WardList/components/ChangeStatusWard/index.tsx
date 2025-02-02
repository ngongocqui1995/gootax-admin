import { WardItem } from '@/pages/Area/Ward/data';
import { WardModalState } from '@/pages/Area/Ward/model';
import { changeStatusWard } from '@/pages/Area/Ward/service';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusWardProps {
  status: string;
  record: WardItem;
}

const ChangeStatusWard: React.FC<ChangeStatusWardProps> = ({ status, record }) => {
  const ward: WardModalState = useSelector((state: any) => state?.ward);

  const onChange = async (checked: boolean) => {
    const res = await changeStatusWard(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) ward.WardList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeStatusWard;
