import {
  ensure20x,
  MusicubeApiError,
  ERROR_INVALID_AUTH_RESPONSE,
  RequestInitWithRecordHeaders,
} from '../common';
import { config } from '../config';

export async function login(
  username: string,
  password: string,
  init: RequestInitWithRecordHeaders = {},
): Promise<string> {
  const res = await config.fetch(
    `${config.apiUrl.replace(/\/$/, '')}/user/login`,
    {
      method: 'post',
      body: JSON.stringify({
        [username.match(/.+@.+\..+/) ? 'email' : 'username']: username,
        password,
      }),
      ...init,
      headers: {
        ...config.headers,
        'Content-Type': 'application/json',
        ...init.headers,
      },
    },
  );

  ensure20x(res);

  const m = (res.headers.get('authorization') || '').match(/Bearer (.*)/);
  if (!m) {
    throw new MusicubeApiError(
      'Invalid auth response',
      ERROR_INVALID_AUTH_RESPONSE,
      res,
    );
  }

  return m[1];
}
