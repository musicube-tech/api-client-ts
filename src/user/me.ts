import { ensure20x, RequestInitWithRecordHeaders } from '../common';
import { config } from '../config';
import { UserData } from '../types';
import { requireAuthorized } from '../helpers/requireAuthorized';

export async function me(
  init: RequestInitWithRecordHeaders = {},
): Promise<UserData> {
  const res = await config.fetch(
    `${config.apiUrl.replace(/\/$/, '')}/user/me`,
    {
      method: 'get',
      ...init,
      headers: requireAuthorized({
        ...config.headers,
        ...init.headers,
      }),
    },
  );

  ensure20x(res);

  const data = await res.json();
  if (!data || Array.isArray(data) || typeof data !== 'object') {
    throw new Error('Unexpected format of /users/me response');
  }

  return data;
}
