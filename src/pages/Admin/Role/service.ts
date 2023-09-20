import {
  ChangeStatusRole,
  CreateRole,
  QueryRoles,
  RoleItem,
  UpdateRole,
} from '@/pages/Admin/Role/data';
import request from '@/utils/request';
import { paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';

const keyword_params = 'name';
const join_params = {};

export async function queryRoles(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryRoles> {
  const res = await request({
    url: 'roles',
    method: 'GET',
    params: paramsConverter({ ...filter, ...params }, join_params, keyword_params),
    sorts: sortConverter({ ...sort, updatedAt: 'descend' }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function getAllRoles(params: any, sort: any = {}): Promise<RoleItem[]> {
  return await request({
    url: 'roles',
    method: 'GET',
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter(sort),
  });
}

export async function createRole(body: CreateRole) {
  return await request({
    url: `roles`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateRole(id: string, body: UpdateRole) {
  return await request({
    url: `roles/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusRole(id: string, status: string): Promise<ChangeStatusRole> {
  return await request({
    url: `roles/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
