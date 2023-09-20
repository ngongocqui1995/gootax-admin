import { RoleToMenu } from '@/pages/Admin/Role/components/RoleForm/components/RoleToMenuList/data';

export interface RoleItem {
  code: string;
  createdAt: string;
  id: string;
  menus: RoleToMenu[];
  avatar: string;
  name: string;
  color: string;
  status: string;
  updatedAt: string;
}

export interface CreateRole {
  code: string;
  avatar: string;
  name: string;
  color: string;
}

export interface UpdateRole {
  code: string;
  avatar: string;
  name: string;
  color: string;
}

export interface QueryRoles {
  data: RoleItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusRole {
  status: string;
  message: string;
}
