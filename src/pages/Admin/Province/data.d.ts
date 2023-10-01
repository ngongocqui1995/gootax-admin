export interface ProvinceItem {
  createdAt: string;
  id: string;
  name: string;
  code: string;
  status: string;
  updatedAt: string;
}

export interface CreateProvince {
  code: string;
  name: string;
}

export interface UpdateProvince {
  code: string;
  name: string;
}

export interface QueryProvinces {
  data: ProvinceItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusProvince {
  status: string;
  message: string;
}
