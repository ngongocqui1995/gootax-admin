import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import TypeCarForm from './components/TypeCarForm';
import TypeCarList from './components/TypeCarList';

const TypeCar: React.FC = () => {
  return (
    <PageContainer>
      <TypeCarList />
      <TypeCarForm />
    </PageContainer>
  );
};

export default TypeCar;
