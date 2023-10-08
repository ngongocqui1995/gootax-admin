import request from '@/utils/request';
import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import { ChangeStatusProvince, CreateProvince, QueryProvinces, UpdateProvince } from './data';

const keyword_params = 'code,name';
const join_params = {};

export async function queryProvinces(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryProvinces> {
  const res = await request({
    url: 'provinces',
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

export async function createProvince(body: CreateProvince) {
  return await request({
    url: `provinces`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateProvince(id: string, body: UpdateProvince) {
  return await request({
    url: `provinces/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusProvince(
  id: string,
  status: string,
): Promise<ChangeStatusProvince> {
  return await request({
    url: `provinces/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
