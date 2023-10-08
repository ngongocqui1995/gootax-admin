import { CompanyItem } from '@/pages/Device/Company/data';
import { CompanyModalState } from '@/pages/Device/Company/model';
import { changeStatusCompany } from '@/pages/Device/Company/service';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusCompanyProps {
  status: string;
  record: CompanyItem;
}

const ChangeStatusCompany: React.FC<ChangeStatusCompanyProps> = ({ status, record }) => {
  const company: CompanyModalState = useSelector((state: any) => state?.company);

  const onChange = async (checked: boolean) => {
    const res = await changeStatusCompany(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) company.CompanyList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeStatusCompany;
