import request from '@/utils/request';

export const findGoogleMapsAPI = async (address: string) => {
  const res = await request({
    url: `map`,
    method: 'GET',
    params: { address },
  });
  return res?.results || [];
};
