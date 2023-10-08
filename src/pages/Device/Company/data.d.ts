export interface CompanyItem {
  createdAt: string;
  id: string;
  code: string;
  name: string;
  status: string;
  updatedAt: string;
}

export interface CreateCompany {
  code: string;
  name: string;
}

export interface UpdateCompany {
  code: string;
  name: string;
}

export interface QueryCompany {
  data: CompanyItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusCompany {
  status: string;
  message: string;
}
