import { MenuItem } from '@/pages/Admin/Menu/data';
import { PermissionItem } from '@/pages/Admin/Permission/data';
import { RoleItem } from '@/pages/Admin/Role/data';

export interface RoleToMenu {
  id: string;
  role: RoleItem;
  menu: MenuItem;
  type: string;
  permissions: PermissionItem[];
  createdAt: string;
  updatedAt: string;
}

interface PermissionCreate {
  id: string;
}

export interface CreateRoleToMenu {
  role: string;
  menu: string;
  type: string;
  permissions: PermissionCreate[];
}

interface PermissionUpdate {
  id: string;
}

export interface UpdateRoleToMenu {
  role: string;
  menu: string;
  type: string;
  permissions: PermissionUpdate[];
}

export interface QueryRoleToMenu {
  data: RoleToMenu[];
  total: number;
  success: boolean;
}
