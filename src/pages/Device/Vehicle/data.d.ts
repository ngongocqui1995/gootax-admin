export interface VehicleItem {
  createdAt: string;
  id: string;
  code: string;
  name: string;
  status: string;
  updatedAt: string;
}

export interface CreateVehicle {
  code: string;
  name: string;
}

export interface UpdateVehicle {
  code: string;
  name: string;
}

export interface QueryVehicles {
  data: VehicleItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusVehicle {
  status: string;
  message: string;
}
