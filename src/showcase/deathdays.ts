import {
  ensure20x,
  MusicubeApiError,
  ERROR_INVALID_SHOWCASE_DEATHDAYS_RESPONSE,
} from '../common';
import { config } from '../config';
import { Anniversary } from '../types';

export async function deathdays(
  date: string,
  init: RequestInit = {},
): Promise<Anniversary[]> {
  const res = await fetch(
    `${config.apiUrl.replace(/\/$/, '')}/showcase/deathdays/${date}`,
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
    const data = await res.json();
    if (!data || !Array.isArray(data)) {
      throw new Error('Unexpected format of /showcase/deathdays response');
    }
    return data;
  } catch (err) {
    throw new MusicubeApiError(
      err instanceof Error ? err.message : String(err),
      ERROR_INVALID_SHOWCASE_DEATHDAYS_RESPONSE,
      res,
    );
  }
}
