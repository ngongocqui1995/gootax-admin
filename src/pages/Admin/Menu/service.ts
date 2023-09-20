import {
  ChangeStatusMenu,
  CreateMenu,
  MenuItem,
  QueryMenus,
  UpdateMenu,
} from '@/pages/Admin/Menu/data';
import request from '@/utils/request';
import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';

const keyword_params = 'url';
const join_params = {
  type: [{ key: 'type', condition: '$in' }],
};
const join_params_get_all = {
  type: [{ key: 'type', condition: '$in' }],
  roles: [
    { key: 'roles.role.id', condition: '$ne', joinWith: '&or=' },
    { key: 'roles.role.id', condition: '$isnull' },
  ],
};

export async function queryMenus(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryMenus> {
  const res = await request({
    url: 'menus',
    method: 'GET',
    joins: joinConverter({ ...filter, ...params, join: 'roles' }, join_params),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter({ ...sort, updatedAt: 'descend' }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function getAllMenus(params: any, sort: any = {}): Promise<MenuItem[]> {
  return await request({
    url: 'menus',
    method: 'GET',
    joins: joinConverter({ ...params, join: 'roles,roles.role' }, join_params_get_all),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter(sort),
  });
}

export async function createMenu(body: CreateMenu) {
  return await request({
    url: `menus`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateMenu(id: string, body: UpdateMenu) {
  return await request({
    url: `menus/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusMenu(id: string, status: string): Promise<ChangeStatusMenu> {
  return await request({
    url: `menus/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
