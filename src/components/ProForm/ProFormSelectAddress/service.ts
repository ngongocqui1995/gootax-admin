import { request } from '@umijs/max';

export const findGoogleMapsAPI = async (address: string) => {
  const res = await request(
    `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json`,
    {
      method: 'GET',
      params: {
        key: GOOGLE_MAPS_APIKEY,
        query: address,
        language: 'vi',
        radius: 100,
      },
      responseType: 'json',
    },
  );
  return res?.results || [];
};
