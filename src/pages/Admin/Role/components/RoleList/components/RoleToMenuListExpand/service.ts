import { QueryRoleToMenu } from '@/pages/Admin/Role/components/RoleForm/components/RoleToMenuList/data';
import request from '@/utils/request';
import { joinConverter, paramsConverter, sortConverter } from '@/utils/utils';

const keyword_params = '';
const join_params = {
  role: [{ key: 'role.id', condition: '$eq' }],
};

export async function queryRoleToMenuExpand(
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
