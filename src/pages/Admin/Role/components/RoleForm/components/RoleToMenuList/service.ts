import {
  CreateRoleToMenu,
  QueryRoleToMenu,
  UpdateRoleToMenu,
} from '@/pages/Admin/Role/components/RoleForm/components/RoleToMenuList/data';
import request from '@/utils/request';
import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';

const keyword_params = '';
const join_params = {
  role: [{ key: 'role.id', condition: '$eq' }],
};

export async function queryRoleToMenu(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryRoleToMenu> {
  const res = await request({
    url: 'role-to-menu',
    method: 'GET',
    joins: joinConverter({ ...filter, ...params, join: 'permissions,menu,role' }, join_params),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter({ ...sort }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function createRoleToMenu(body: CreateRoleToMenu) {
  return await request({
    url: `role-to-menu`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateRoleToMenu(id: string, body: UpdateRoleToMenu) {
  return await request({
    url: `role-to-menu/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function deleteRoleToMenu(id: string) {
  return await request({
    url: `role-to-menu/${id}`,
    method: 'DELETE',
  });
}
