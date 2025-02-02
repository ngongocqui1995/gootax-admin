import { DistrictItem } from '@/pages/Area/District/data';
import { DistrictModalState } from '@/pages/Area/District/model';
import { changeStatusDistrict } from '@/pages/Area/District/service';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusDistrictProps {
  status: string;
  record: DistrictItem;
}

const ChangeStatusDistrict: React.FC<ChangeStatusDistrictProps> = ({ status, record }) => {
  const district: DistrictModalState = useSelector((state: any) => state?.district);

  const onChange = async (checked: boolean) => {
    const res = await changeStatusDistrict(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) district.DistrictList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeStatusDistrict;
