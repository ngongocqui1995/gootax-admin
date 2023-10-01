import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import ProvinceForm from './components/ProvinceForm';
import ProvinceList from './components/ProvinceList';

const Province: React.FC = () => {
  return (
    <PageContainer>
      <ProvinceList />
      <ProvinceForm />
    </PageContainer>
  );
};

export default Province;
