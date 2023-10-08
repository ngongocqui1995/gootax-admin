import request from '@/utils/request';
import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import { ChangeStatusVehicle, CreateVehicle, QueryVehicles, UpdateVehicle } from './data';

const keyword_params = 'code,name';
const join_params = {};

export async function queryVehicles(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryVehicles> {
  const res = await request({
    url: 'vehicles',
    method: 'GET',
    joins: joinConverter({ ...filter, ...params }, join_params),
    params: paramsConverter({ ...params }, join_params, keyword_params),
    sorts: sortConverter({ ...sort, updatedAt: 'descend' }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function createVehicle(body: CreateVehicle) {
  return await request({
    url: `vehicles`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateVehicle(id: string, body: UpdateVehicle) {
  return await request({
    url: `vehicles/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusVehicle(
  id: string,
  status: string,
): Promise<ChangeStatusVehicle> {
  return await request({
    url: `vehicles/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
