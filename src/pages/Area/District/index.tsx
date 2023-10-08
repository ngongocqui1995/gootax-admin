import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import DistrictForm from './components/DistrictForm';
import DistrictList from './components/DistrictList';

const District: React.FC = () => {
  return (
    <PageContainer>
      <DistrictList />
      <DistrictForm />
    </PageContainer>
  );
};

export default District;
