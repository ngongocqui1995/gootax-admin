import request from '@/utils/request';
import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import { ChangeStatusTypeCar, CreateTypeCar, QueryTypeCars, UpdateTypeCar } from './data';

const keyword_params = 'code,name';
const join_params = {};

export async function queryTypeCars(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryTypeCars> {
  const res = await request({
    url: 'type-cars',
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

export async function createTypeCar(body: CreateTypeCar) {
  return await request({
    url: `type-cars`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateTypeCar(id: string, body: UpdateTypeCar) {
  return await request({
    url: `type-cars/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusTypeCar(
  id: string,
  status: string,
): Promise<ChangeStatusTypeCar> {
  return await request({
    url: `type-cars/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
