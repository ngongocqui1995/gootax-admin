import { getToken } from '@/utils/utils';
import { message } from 'antd';
import { extend, ResponseError } from 'umi-request';
// @ts-ignore
import { getIntl, getLocale, History, history } from '@umijs/max';
import to from 'await-to-js';
import lodash from 'lodash';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const replaceGoto = () => {
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query || {};

    localStorage.clear();
    if (!redirect) {
      history.replace('/user/login');
      return;
    }
    (history as History).replace(redirect);
  }, 10);
};

/**
 * Handle error http
 */
const errorHandler = (
  error: ResponseError,
  method: HttpMethod | undefined,
  showMessage: boolean,
) => {
  const { messages } = getIntl(getLocale());
  const { response, data } = error;
  let errorText;

  if (response && response.status === 401) {
    replaceGoto();
  }

  if (response && response.status && lodash.isArray(data.message)) {
    errorText = data.message.join('\n');
  }

  if (response && response.status && lodash.isString(data.message)) {
    errorText = data.message;
  }

  if (response && response.status && lodash.isEmpty(errorText)) {
    errorText = messages[`app.request.${response.status}`] || response.statusText;
  }

  if (!response) {
    errorText = 'Mạng không bình thường, không thể kết nối với máy chủ.';
  }

  if (method !== 'GET' && showMessage) message.error(errorText, 3);

  return null;
};

const extendRequest = extend({
  headers: {},
  ttl: 120000,
  maxCache: 0,
});

interface RequestProps {
  url: string;
  method: HttpMethod;
  body?: any;
  params?: any;
  sorts?: string;
  filters?: string;
  joins?: string;
  headers?: { 'Content-Type': 'application/json' } | object;
}

const request = async (
  initialRequest: RequestProps,
  showMessageSuccess: boolean = true,
  authorization: boolean = true,
  showMessageError: boolean = true,
): Promise<any> => {
  const options: any = {};
  options.method = initialRequest.method;
  options.data = initialRequest.body || {};
  options.headers = { ...initialRequest.headers };

  let query =
    initialRequest.sorts && initialRequest.sorts?.length > 0 ? `?${initialRequest.sorts}` : '';
  if (initialRequest.filters)
    query = query.length > 0 ? `${query}&${initialRequest.filters}` : `?${initialRequest.filters}`;
  if (initialRequest.joins)
    query = query.length > 0 ? `${query}&${initialRequest.joins}` : `?${initialRequest.joins}`;

  if (authorization)
    options.headers = { ...options.headers, Authorization: `Bearer ${getToken()}` };

  const [err, res]: [any, any] = await to(
    extendRequest(`${SERVER_API}/${initialRequest.url}${query}`, {
      ...options,
      headers: {
        ...options.headers,
        'x-custom-lang': getLocale(),
      },
      params: { ...initialRequest.params },
    }),
  );
  if (err || !res)
    return errorHandler(err as ResponseError, initialRequest?.method, showMessageError);
  if (res && initialRequest?.method !== 'GET' && res?.message && showMessageSuccess) {
    message.success(res?.message);
  }
  return res;
};

export default request;
