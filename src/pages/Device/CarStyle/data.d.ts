export interface CarStyleItem {
  createdAt: string;
  id: string;
  code: string;
  name: string;
  status: string;
  updatedAt: string;
}

export interface CreateCarStyle {
  code: string;
  name: string;
}

export interface UpdateCarStyle {
  code: string;
  name: string;
}

export interface QueryCarStyles {
  data: CarStyleItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusCarStyle {
  status: string;
  message: string;
}
