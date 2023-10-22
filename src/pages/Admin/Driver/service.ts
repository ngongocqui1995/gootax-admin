import request from '@/utils/request';
import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import {
  ChangePasswordDriver,
  ChangeStatusDriver,
  CreateDriver,
  QueryDrivers,
  UpdateDriver,
} from './data';

const keyword_params = 'name,phone';
const join_params = {
  gender: [{ key: 'gender', condition: '$in' }],
  car: [{ key: 'car.id', condition: '$eq' }],
};

export async function queryDrivers(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryDrivers> {
  const res = await request({
    url: 'drivers',
    method: 'GET',
    joins: joinConverter(
      { ...filter, ...params, join: 'car,car.company,car.car_style,car.vehicle,car.type_car' },
      join_params,
    ),
    params: paramsConverter({ ...params }, join_params, keyword_params),
    sorts: sortConverter({ ...sort, createdAt: 'descend' }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function createDriver(body: CreateDriver) {
  return await request({
    url: `drivers`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateDriver(id: string, body: UpdateDriver) {
  return await request({
    url: `drivers/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changePasswordDriver(user: string, body: ChangePasswordDriver) {
  return await request({
    url: `drivers/update-email/change-password`,
    method: 'PUT',
    body: removeParamsEmpty({
      ...body,
      user,
    }),
  });
}

export async function changePassword(body: ChangePasswordDriver) {
  return await request({
    url: `drivers/update/change-password`,
    method: 'PUT',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusDriver(id: string, status: string): Promise<ChangeStatusDriver> {
  return await request({
    url: `drivers/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
