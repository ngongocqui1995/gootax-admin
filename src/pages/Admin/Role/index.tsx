import RoleForm from '@/pages/Admin/Role/components/RoleForm';
import RoleList from '@/pages/Admin/Role/components/RoleList';
import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

const Role: React.FC = () => {
  return (
    <PageContainer>
      <RoleForm />
      <RoleList />
    </PageContainer>
  );
};

export default Role;
