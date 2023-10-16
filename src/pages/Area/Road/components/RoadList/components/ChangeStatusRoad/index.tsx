import { RoadItem } from '@/pages/Area/Road/data';
import { RoadModalState } from '@/pages/Area/Road/model';
import { changeStatusRoad } from '@/pages/Area/Road/service';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusRoadProps {
  status: string;
  record: RoadItem;
}

const ChangeStatusRoad: React.FC<ChangeStatusRoadProps> = ({ status, record }) => {
  const road: RoadModalState = useSelector((state: any) => state?.road);

  const onChange = async (checked: boolean) => {
    const res = await changeStatusRoad(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) road.RoadList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeStatusRoad;
