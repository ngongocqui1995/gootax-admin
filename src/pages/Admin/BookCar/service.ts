import request from '@/utils/request';
import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import {
  ChangePasswordBookCar,
  ChangeStatusBookCar,
  CreateBookCar,
  QueryBookCars,
  UpdateBookCar,
} from './data';

const keyword_params = 'name,phone';
const join_params = {
  type_car: [{ key: 'type_car.id', condition: '$eq' }],
};

export async function queryBookCars(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryBookCars> {
  const res = await request({
    url: 'book-cars',
    method: 'GET',
    joins: joinConverter(
      {
        ...filter,
        ...params,
        join: 'type_car,from_address_province,from_address_district,from_address_ward,from_address_road,to_address_province,to_address_district,to_address_ward,to_address_road',
      },
      join_params,
    ),
    params: paramsConverter({ ...params }, join_params, keyword_params),
    sorts: sortConverter({ ...sort, updatedAt: 'descend' }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function createBookCar(body: CreateBookCar) {
  return await request({
    url: `book-cars`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateBookCar(id: string, body: UpdateBookCar) {
  return await request({
    url: `book-cars/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changePasswordBookCar(user: string, body: ChangePasswordBookCar) {
  return await request({
    url: `book-cars/update-email/change-password`,
    method: 'PUT',
    body: removeParamsEmpty({
      ...body,
      user,
    }),
  });
}

export async function changePassword(body: ChangePasswordBookCar) {
  return await request({
    url: `book-cars/update/change-password`,
    method: 'PUT',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusBookCar(
  id: string,
  status: string,
): Promise<ChangeStatusBookCar> {
  return await request({
    url: `book-cars/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
