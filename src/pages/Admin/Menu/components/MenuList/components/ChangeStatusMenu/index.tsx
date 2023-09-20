import { MenuItem } from '@/pages/Admin/Menu/data';
import { MenuModalState } from '@/pages/Admin/Menu/model';
import { changeStatusMenu } from '@/pages/Admin/Menu/service';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusMenuProps {
  status: string;
  record: MenuItem;
}

const ChangeStatusMenu: React.FC<ChangeStatusMenuProps> = ({ status, record }) => {
  const menu: MenuModalState = useSelector((state: any) => state?.menu);

  const onChange = async (checked: boolean) => {
    const res = await changeStatusMenu(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) menu.MenuList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeStatusMenu;
