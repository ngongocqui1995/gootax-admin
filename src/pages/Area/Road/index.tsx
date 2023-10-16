import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import RoadForm from './components/RoadForm';
import RoadList from './components/RoadList';

const Road: React.FC = () => {
  return (
    <PageContainer>
      <RoadList />
      <RoadForm />
    </PageContainer>
  );
};

export default Road;
