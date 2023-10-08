import request from '@/utils/request';
import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import { ChangeStatusCompany, CreateCompany, QueryCompany, UpdateCompany } from './data';

const keyword_params = 'code,name';
const join_params = {};

export async function queryCompany(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryCompany> {
  const res = await request({
    url: 'company',
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

export async function createCompany(body: CreateCompany) {
  return await request({
    url: `company`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateCompany(id: string, body: UpdateCompany) {
  return await request({
    url: `company/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusCompany(
  id: string,
  status: string,
): Promise<ChangeStatusCompany> {
  return await request({
    url: `company/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
