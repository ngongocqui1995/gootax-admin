import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import VehicleForm from './components/VehicleForm';
import VehicleList from './components/VehicleList';

const Vehicle: React.FC = () => {
  return (
    <PageContainer>
      <VehicleList />
      <VehicleForm />
    </PageContainer>
  );
};

export default Vehicle;
