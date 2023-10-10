import request from '@/utils/request';
import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import { ChangeStatusCarStyle, CreateCarStyle, QueryCarStyles, UpdateCarStyle } from './data';

const keyword_params = 'code,name';
const join_params = {};

export async function queryCarStyles(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryCarStyles> {
  const res = await request({
    url: 'car-style',
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

export async function createCarStyle(body: CreateCarStyle) {
  return await request({
    url: `car-style`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateCarStyle(id: string, body: UpdateCarStyle) {
  return await request({
    url: `car-style/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusCarStyle(
  id: string,
  status: string,
): Promise<ChangeStatusCarStyle> {
  return await request({
    url: `car-style/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
