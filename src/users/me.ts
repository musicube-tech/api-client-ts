import {
  ensure20x,
  MusicubeApiError,
  ERROR_INVALID_ME_RESPONSE,
} from '../common';
import { config } from '../config';
import { UserData } from '../types';

export async function me(token: string, init?: RequestInit): Promise<UserData> {
  const res = await config.fetch(
    `${config.apiUrl.replace(/\/$/, '')}/users/me`,
    {
      method: 'get',
      ...init,
      headers: {
        ...config.headers,
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
        ...(init || {}).headers,
      },
    },
  );

  ensure20x(res);

  try {
    const data = await res.json();
    if (!data || Array.isArray(data) || typeof data !== 'object') {
      throw new Error('Unexpected format of /users/me response');
    }

    return data;
  } catch (err) {
    throw new MusicubeApiError(
      err instanceof Error ? err.message : String(err),
      ERROR_INVALID_ME_RESPONSE,
      res,
    );
  }
}
