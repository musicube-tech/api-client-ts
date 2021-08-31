import {
  ensure20x,
  MusicubeApiError,
  ERROR_INVALID_REFERRERS_RESPONSE,
} from '../common';
import { config } from '../config';

export async function referrers(
  user: string,
  init: RequestInit = {},
): Promise<string[]> {
  const res = await config.fetch(
    `${config.apiUrl.replace(/\/$/, '')}/users/referrers/${user}`,
    {
      ...init,
      headers: {
        ...config.headers,
        ...init.headers,
      },
    },
  );

  ensure20x(res);

  try {
    const referrers = await res.json();

    if (
      !Array.isArray(referrers) ||
      referrers.some((code) => typeof code !== 'string')
    ) {
      throw new Error('Unexpected format of /users/referrers response');
    }

    return referrers;
  } catch (err) {
    throw new MusicubeApiError(
      err instanceof Error ? err.message : String(err),
      ERROR_INVALID_REFERRERS_RESPONSE,
      res,
    );
  }
}
