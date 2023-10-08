import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import CarStyleForm from './components/CarStyleForm';
import CarStyleList from './components/CarStyleList';

const CarStyle: React.FC = () => {
  return (
    <PageContainer>
      <CarStyleList />
      <CarStyleForm />
    </PageContainer>
  );
};

export default CarStyle;
