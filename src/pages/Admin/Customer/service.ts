import request from '@/utils/request';
import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import {
  ChangePasswordCustomer,
  ChangeStatusCustomer,
  CreateCustomer,
  QueryCustomers,
  UpdateCustomer,
} from './data';

const keyword_params = 'name,phone,email';
const join_params = {
  gender: [{ key: 'gender', condition: '$in' }],
};

export async function queryCustomers(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryCustomers> {
  const res = await request({
    url: 'customers',
    method: 'GET',
    joins: joinConverter({ ...filter, ...params, join: 'role' }, join_params),
    params: paramsConverter({ ...params }, join_params, keyword_params),
    sorts: sortConverter({ ...sort, updatedAt: 'descend' }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function createCustomer(body: CreateCustomer) {
  return await request({
    url: `customers`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateCustomer(id: string, body: UpdateCustomer) {
  return await request({
    url: `customers/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changePasswordCustomer(user: string, body: ChangePasswordCustomer) {
  return await request({
    url: `customers/update-email/change-password`,
    method: 'PUT',
    body: removeParamsEmpty({
      ...body,
      user,
    }),
  });
}

export async function changePassword(body: ChangePasswordCustomer) {
  return await request({
    url: `customers/update/change-password`,
    method: 'PUT',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusCustomer(
  id: string,
  status: string,
): Promise<ChangeStatusCustomer> {
  return await request({
    url: `customers/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
