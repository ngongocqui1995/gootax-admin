import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import WardForm from './components/WardForm';
import WardList from './components/WardList';

const Ward: React.FC = () => {
  return (
    <PageContainer>
      <WardList />
      <WardForm />
    </PageContainer>
  );
};

export default Ward;
