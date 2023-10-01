import request from '@/utils/request';
import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import { ChangeStatusDistrict, CreateDistrict, QueryDistricts, UpdateDistrict } from './data';

const keyword_params = 'code,name';
const join_params = {};

export async function queryDistricts(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryDistricts> {
  const res = await request({
    url: 'districts',
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

export async function createDistrict(body: CreateDistrict) {
  return await request({
    url: `districts`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateDistrict(id: string, body: UpdateDistrict) {
  return await request({
    url: `districts/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusDistrict(
  id: string,
  status: string,
): Promise<ChangeStatusDistrict> {
  return await request({
    url: `districts/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
