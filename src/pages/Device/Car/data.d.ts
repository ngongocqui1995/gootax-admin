import { CarStyleItem } from '../CarStyle/data';
import { CompanyItem } from '../Company/data';
import { TypeCarItem } from '../TypeCar/data';
import { VehicleItem } from '../Vehicle/data';

export interface CarItem {
  createdAt: string;
  id: string;
  avatar: string;
  version: string;
  year: string;
  seat: number;
  company: CompanyItem;
  car_style: CarStyleItem;
  vehicle: VehicleItem;
  type_car: TypeCarItem;
  name: string;
  status: string;
  updatedAt: string;
}

export interface CreateCar {
  name: string;
  avatar: string;
  version: string;
  year: string;
  seat: number;
  company: string;
  car_style: string;
  vehicle: string;
  type_car: string;
}

export interface UpdateCar {
  name: string;
  avatar: string;
  version: string;
  year: string;
  seat: number;
  company: string;
  car_style: string;
  vehicle: string;
  type_car: string;
}

export interface QueryCars {
  data: CarItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusCar {
  status: string;
  message: string;
}
