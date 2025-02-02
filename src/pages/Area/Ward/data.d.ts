import { DistrictItem } from '../District/data';
import { ProvinceItem } from '../Province/data';

export interface WardItem {
  createdAt: string;
  id: string;
  name: string;
  code: string;
  status: string;
  province: ProvinceItem;
  district: DistrictItem;
  updatedAt: string;
}

export interface CreateWard {
  code: string;
  name: string;
  province: string;
  district: string;
}

export interface UpdateWard {
  code: string;
  name: string;
  province: string;
  district: string;
}

export interface QueryWards {
  data: WardItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusWard {
  status: string;
  message: string;
}
