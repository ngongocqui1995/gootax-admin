import PermissionForm from '@/pages/Admin/Permission/components/PermissionForm';
import PermissionList from '@/pages/Admin/Permission/components/PermissionList';
import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

const Permission: React.FC = () => {
  return (
    <PageContainer>
      <PermissionForm />
      <PermissionList />
    </PageContainer>
  );
};

export default Permission;
