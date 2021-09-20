import {
  ensure20x,
  MusicubeApiError,
  ERROR_INVALID_PUBLIC_RECORDING_INIT_PUT_RESPONSE,
  RequestInitWithRecordHeaders,
} from '../../../common';
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

  try {
    const data = await res.json();
    if (!data || !Array.isArray(data)) {
      throw new Error(
        `Unexpected format of /public/recording/${id}/audio/initPut response`,
      );
    }

    return data[0].url;
  } catch (err) {
    throw new MusicubeApiError(
      err instanceof Error ? err.message : String(err),
      ERROR_INVALID_PUBLIC_RECORDING_INIT_PUT_RESPONSE,
      res,
    );
  }
}
