import { RoleItem } from '@/pages/Admin/Role/data';

export interface DriverItem {
  avatar: string;
  createdAt: string;
  gender: string;
  id: string;
  name: string;
  phone: string;
  role: RoleItem;
  status: string;
  updatedAt: string;
}

export interface CreateDriver {
  avatar: string;
  gender: string;
  name: string;
  phone: string;
  password: string;
  role: string;
}

export interface UpdateDriver {
  avatar: string;
  gender: string;
  name: string;
  phone: string;
  role: string;
}

export interface ChangePasswordDriver {
  current_password: string;
  confirm_password: string;
  new_password: string;
}

export interface QueryDrivers {
  data: DriverItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusDriver {
  status: string;
  message: string;
}
