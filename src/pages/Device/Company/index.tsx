import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import CompanyForm from './components/CompanyForm';
import CompanyList from './components/CompanyList';

const Company: React.FC = () => {
  return (
    <PageContainer>
      <CompanyList />
      <CompanyForm />
    </PageContainer>
  );
};

export default Company;
