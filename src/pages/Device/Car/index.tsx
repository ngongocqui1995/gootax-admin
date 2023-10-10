import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import CarForm from './components/CarForm';
import CarList from './components/CarList';

const Car: React.FC = () => {
  return (
    <PageContainer>
      <CarList />
      <CarForm />
    </PageContainer>
  );
};

export default Car;
