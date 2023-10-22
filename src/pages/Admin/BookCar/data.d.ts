import { DistrictItem } from '@/pages/Area/District/data';
import { ProvinceItem } from '@/pages/Area/Province/data';
import { RoadItem } from '@/pages/Area/Road/data';
import { WardItem } from '@/pages/Area/Ward/data';
import { TypeCarItem } from '@/pages/Device/TypeCar/data';
import { CustomerItem } from '../Customer/data';
import { DriverItem } from '../Driver/data';

export interface BookCarItem {
  createdAt: string;
  id: string;
  name: string;
  phone: string;
  status: string;
  type_car: TypeCarItem;
  from_address_province: ProvinceItem;
  from_address_district: DistrictItem;
  from_address_ward: WardItem;
  from_address_road: RoadItem;
  from_address: string;
  from_address_lat: number;
  from_address_lng: number;
  to_address: string;
  to_address_lat: number;
  to_address_lng: number;
  to_address_province: ProvinceItem;
  to_address_district: DistrictItem;
  to_address_ward: WardItem;
  to_address_road: RoadItem;
  customer: CustomerItem;
  driver: DriverItem;
  updatedAt: string;
  amount: number;
  distance: number;
  note: string;
}

export interface CreateBookCar {
  name: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  type_car: string;
  from_address: string;
  from_address_lat: number;
  from_address_lng: number;
  to_address: string;
  to_address_lat: number;
  to_address_lng: number;
  customer: string;
  driver: string;
  from_address_province: string;
  from_address_district: string;
  from_address_ward: string;
  from_address_road: string;
  to_address_province: string;
  to_address_district: string;
  to_address_ward: string;
  to_address_road: string;
}

export interface UpdateBookCar {
  name: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  type_car: string;
  from_address: string;
  from_address_lat: number;
  from_address_lng: number;
  to_address: string;
  to_address_lat: number;
  to_address_lng: number;
  customer: string;
  driver: string;
  from_address_province: string;
  from_address_district: string;
  from_address_ward: string;
  from_address_road: string;
  to_address_province: string;
  to_address_district: string;
  to_address_ward: string;
  to_address_road: string;
}

export interface ChangePasswordBookCar {
  current_password: string;
  confirm_password: string;
  new_password: string;
}

export interface QueryBookCars {
  data: BookCarItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusBookCar {
  status: string;
  message: string;
}
