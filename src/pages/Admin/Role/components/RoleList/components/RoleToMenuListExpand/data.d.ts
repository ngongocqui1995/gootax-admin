import { MenuItem } from '@/pages/Admin/Menu/data';
import { PermissionItem } from '@/pages/Admin/Permission/data';
import { RoleItem } from '@/pages/Admin/Role/data';

export interface RoleToMenuExpand {
  id: string;
  role: RoleItem;
  menu: MenuItem;
  type: string;
  permissions: PermissionItem[];
  createdAt: string;
  updatedAt: string;
}

export interface QueryRoleToMenuExpand {
  data: RoleToMenuExpand[];
  total: number;
  success: boolean;
}
