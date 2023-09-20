import {
  ChangeStatusPermission,
  CreatePermission,
  PermissionItem,
  QueryPermissions,
  UpdatePermission,
} from '@/pages/Admin/Permission/data';
import request from '@/utils/request';
import { paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';

const keyword_params = 'code,name';
const join_params = {};

export async function queryPermissions(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryPermissions> {
  const res = await request({
    url: 'permissions',
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

export async function getAllPermissions(params: any, sort: any = {}): Promise<PermissionItem[]> {
  return await request({
    url: 'permissions',
    method: 'GET',
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter(sort),
  });
}

export async function createPermission(body: CreatePermission) {
  return await request({
    url: `permissions`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updatePermission(id: string, body: UpdatePermission) {
  return await request({
    url: `permissions/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusPermission(
  id: string,
  status: string,
): Promise<ChangeStatusPermission> {
  return await request({
    url: `permissions/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
