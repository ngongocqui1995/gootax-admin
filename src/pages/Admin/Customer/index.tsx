import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';

const Customer: React.FC = () => {
  return (
    <PageContainer>
      <CustomerList />
      <CustomerForm />
    </PageContainer>
  );
};

export default Customer;
