import request from '@/utils/request';
import { UserLogin } from './data';

export const login = async (params: UserLogin.AuthParams) => {
  const res = await request(
    {
      url: 'auth/login',
      method: 'POST',
      body: params,
    },
    false,
    false,
  );
  return res;
};

export const register = async (params: UserLogin.RegisterParams) => {
  const res = await request(
    {
      url: 'users/register',
      method: 'POST',
      body: params,
    },
    false,
    false,
  );
  return res;
};

export const getProfile = async () => {
  const res = await request({
    url: 'auth/profile',
    method: 'GET',
  });
  return res;
};
