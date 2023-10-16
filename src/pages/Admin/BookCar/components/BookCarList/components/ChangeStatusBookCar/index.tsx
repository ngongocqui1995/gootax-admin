import { BookCarItem } from '@/pages/Admin/BookCar/data';
import { BookCarModalState } from '@/pages/Admin/BookCar/model';
import { changeStatusBookCar } from '@/pages/Admin/BookCar/service';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusBookCarProps {
  status: string;
  record: BookCarItem;
}

const ChangeStatusBookCar: React.FC<ChangeStatusBookCarProps> = ({ status, record }) => {
  const book_car: BookCarModalState = useSelector((state: any) => state?.book_car);

  const onChange = async (checked: boolean) => {
    const res = await changeStatusBookCar(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) book_car.BookCarList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeStatusBookCar;
