import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import DriverList from './components/DirverList';
import DriverForm from './components/DriverForm';

const Driver: React.FC = () => {
  return (
    <PageContainer>
      <DriverList />
      <DriverForm />
    </PageContainer>
  );
};

export default Driver;
