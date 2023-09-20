export interface PermissionItem {
  code: string;
  name: string;
  color: string;
  createdAt: string;
  id: string;
  status: string;
  updatedAt: string;
}

export interface CreatePermission {
  code: string;
  name: string;
  color: string;
}

export interface UpdatePermission {
  code: string;
  name: string;
  color: string;
}

export interface QueryPermissions {
  data: PermissionItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusPermission {
  status: string;
  message: string;
}
