import { ProvinceItem } from '../Province/data';

export interface DistrictItem {
  createdAt: string;
  id: string;
  name: string;
  code: string;
  province: ProvinceItem;
  status: string;
  updatedAt: string;
}

export interface CreateDistrict {
  code: string;
  name: string;
  province: string;
}

export interface UpdateDistrict {
  code: string;
  name: string;
  province: string;
}

export interface QueryDistricts {
  data: DistrictItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusDistrict {
  status: string;
  message: string;
}
