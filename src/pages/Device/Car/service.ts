import request from '@/utils/request';
import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import { ChangeStatusCar, CreateCar, QueryCars, UpdateCar } from './data';

const keyword_params = 'name';
const join_params = {
  company: [{ key: 'company.id', condition: '$eq' }],
  car_style: [{ key: 'car_style.id', condition: '$eq' }],
  vehicle: [{ key: 'vehicle.id', condition: '$eq' }],
  type_car: [{ key: 'type_car.id', condition: '$eq' }],
};

export async function queryCars(params: any, sort: any = {}, filter: any = {}): Promise<QueryCars> {
  const res = await request({
    url: 'cars',
    method: 'GET',
    joins: joinConverter(
      { ...filter, ...params, join: 'company,car_style,vehicle,type_car' },
      join_params,
    ),
    params: paramsConverter({ ...params }, join_params, keyword_params),
    sorts: sortConverter({ ...sort, updatedAt: 'descend' }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function createCar(body: CreateCar) {
  return await request({
    url: `cars`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateCar(id: string, body: UpdateCar) {
  return await request({
    url: `cars/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusCar(id: string, status: string): Promise<ChangeStatusCar> {
  return await request({
    url: `cars/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
