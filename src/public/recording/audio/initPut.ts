import { ensure20x, RequestInitWithRecordHeaders } from '../../../common';
import { config } from '../../../config';
import { requireAuthorized } from '../../../helpers/requireAuthorized';

export async function initPut(
  id: string,
  init: RequestInitWithRecordHeaders = {},
): Promise<string> {
  const res = await config.fetch(
    `${config.apiUrl.replace(/\/$/, '')}/public/recording/${id}/audio/initPut`,
    {
      method: 'post',
      ...init,
      headers: requireAuthorized({
        ...config.headers,
        'Content-Type': 'application/json',
        ...init.headers,
      }),
    },
  );

  ensure20x(res);

  const data = await res.json();
  if (!data || !Array.isArray(data)) {
    throw new Error(
      `Unexpected format of /public/recording/${id}/audio/initPut response`,
    );
  }

  return data[0].url;
}
