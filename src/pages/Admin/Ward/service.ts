import request from '@/utils/request';
import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import { ChangeStatusWard, CreateWard, QueryWards, UpdateWard } from './data';

const keyword_params = 'code,name';
const join_params = {};

export async function queryWards(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryWards> {
  const res = await request({
    url: 'wards',
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

export async function createWard(body: CreateWard) {
  return await request({
    url: `wards`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateWard(id: string, body: UpdateWard) {
  return await request({
    url: `wards/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusWard(id: string, status: string): Promise<ChangeStatusWard> {
  return await request({
    url: `wards/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
