import request from '@/utils/request';
import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import { ChangeStatusRoad, CreateRoad, QueryRoads, UpdateRoad } from './data';

const keyword_params = 'code,name';
const join_params = {
  province: [{ key: 'province.id', condition: '$eq' }],
  district: [{ key: 'district.id', condition: '$eq' }],
  ward: [{ key: 'ward.id', condition: '$eq' }],
};

export async function queryRoads(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryRoads> {
  const res = await request({
    url: 'roads',
    method: 'GET',
    joins: joinConverter({ ...filter, ...params, join: 'province,district,ward' }, join_params),
    params: paramsConverter({ ...params }, join_params, keyword_params),
    sorts: sortConverter({ ...sort, updatedAt: 'descend' }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function createRoad(body: CreateRoad) {
  return await request({
    url: `roads`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateRoad(id: string, body: UpdateRoad) {
  return await request({
    url: `roads/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusRoad(id: string, status: string): Promise<ChangeStatusRoad> {
  return await request({
    url: `roads/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
