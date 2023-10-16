import { DistrictItem } from '../District/data';
import { ProvinceItem } from '../Province/data';
import { WardItem } from '../Ward/data';

export interface RoadItem {
  createdAt: string;
  id: string;
  name: string;
  code: string;
  status: string;
  province: ProvinceItem;
  district: DistrictItem;
  ward: WardItem;
  updatedAt: string;
}

export interface CreateRoad {
  code: string;
  name: string;
  province: string;
  district: string;
  ward: string;
}

export interface UpdateRoad {
  code: string;
  name: string;
  province: string;
  district: string;
  ward: string;
}

export interface QueryRoads {
  data: RoadItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusRoad {
  status: string;
  message: string;
}
