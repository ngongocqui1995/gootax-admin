import request from '@/utils/request';

export async function queryStatistic(params: { from_date: string; to_date: string }) {
  return await request({
    url: `dashboard/situation`,
    method: 'GET',
    params,
  });
}

export async function queryOrder(params: { from_date: string; to_date: string }) {
  return await request({
    url: `dashboard/order`,
    method: 'GET',
    params,
  });
}

export async function queryOrderStatus(params: { from_date: string; to_date: string }) {
  return await request({
    url: `dashboard/order/status`,
    method: 'GET',
    params,
  });
}
