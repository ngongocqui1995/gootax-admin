import request from '@/utils/request';

export const uploadImage = async (body: FormData) => {
  return await request({
    url: 'uploads/image',
    method: 'POST',
    body,
  });
};
