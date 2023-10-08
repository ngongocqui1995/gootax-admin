export interface TypeCarItem {
  createdAt: string;
  id: string;
  code: string;
  name: string;
  status: string;
  updatedAt: string;
}

export interface CreateTypeCar {
  code: string;
  name: string;
}

export interface UpdateTypeCar {
  code: string;
  name: string;
}

export interface QueryTypeCars {
  data: TypeCarItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusTypeCar {
  status: string;
  message: string;
}
