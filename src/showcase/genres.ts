import {
  ensure20x,
  MusicubeApiError,
  ERROR_INVALID_SHOWCASE_GENRES_RESPONSE,
} from '../common';
import { config } from '../config';
import type { Genre } from '../types';

export async function genres(init: RequestInit = {}): Promise<Genre[]> {
  const res = await config.fetch(
    `${config.apiUrl.replace(/\/$/, '')}/showcase/genres`,
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
      throw new Error('Unexpected format of /showcase/genres response');
    }
    return data;
  } catch (err) {
    throw new MusicubeApiError(
      err instanceof Error ? err.message : String(err),
      ERROR_INVALID_SHOWCASE_GENRES_RESPONSE,
      res,
    );
  }
}
