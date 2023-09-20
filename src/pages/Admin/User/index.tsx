import UserForm from '@/pages/Admin/User/components/UserForm';
import UserList from '@/pages/Admin/User/components/UserList';
import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

const User: React.FC = () => {
  return (
    <PageContainer>
      <UserList />
      <UserForm />
    </PageContainer>
  );
};

export default User;
