import MenuForm from '@/pages/Admin/Menu/components/MenuForm';
import MenuList from '@/pages/Admin/Menu/components/MenuList';
import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

const Menu: React.FC = () => {
  return (
    <PageContainer>
      <MenuForm />
      <MenuList />
    </PageContainer>
  );
};

export default Menu;
