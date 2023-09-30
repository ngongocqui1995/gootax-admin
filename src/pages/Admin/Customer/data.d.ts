import { RoleItem } from '@/pages/Admin/Role/data';

export interface CustomerItem {
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

export interface CreateCustomer {
  avatar: string;
  gender: string;
  name: string;
  phone: string;
  password: string;
  role: string;
}

export interface UpdateCustomer {
  avatar: string;
  gender: string;
  name: string;
  phone: string;
  role: string;
}

export interface ChangePasswordCustomer {
  current_password: string;
  confirm_password: string;
  new_password: string;
}

export interface QueryCustomers {
  data: CustomerItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusCustomer {
  status: string;
  message: string;
}
