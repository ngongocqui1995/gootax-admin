import { ProvinceItem } from '@/pages/Area/Province/data';
import { ProvinceModalState } from '@/pages/Area/Province/model';
import { changeStatusProvince } from '@/pages/Area/Province/service';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusProvinceProps {
  status: string;
  record: ProvinceItem;
}

const ChangeStatusProvince: React.FC<ChangeStatusProvinceProps> = ({ status, record }) => {
  const province: ProvinceModalState = useSelector((state: any) => state?.province);

  const onChange = async (checked: boolean) => {
    const res = await changeStatusProvince(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) province.ProvinceList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeStatusProvince;
