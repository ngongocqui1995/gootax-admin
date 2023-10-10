import { RoleItem } from '@/pages/Admin/Role/data';
import { CarItem } from '@/pages/Device/Car/data';

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
  car: CarItem;
}

export interface CreateDriver {
  avatar: string;
  gender: string;
  name: string;
  phone: string;
  password: string;
  role: string;
  car: string;
}

export interface UpdateDriver {
  avatar: string;
  gender: string;
  name: string;
  phone: string;
  role: string;
  car: string;
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
