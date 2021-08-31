import {
  ensure20x,
  MusicubeApiError,
  ERROR_INVALID_SHOWCASE_GET_PARTY_RESPONSE,
} from '../common';
import { config } from '../config';
import type { Party } from '../types';

export async function getParty(
  name: string,
  init: RequestInit = {},
): Promise<Party> {
  const res = await fetch(
    `${config.apiUrl.replace(
      /\/$/,
      '',
    )}/showcase/getParty?fullName=${encodeURIComponent(name)}`,
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
    if (!data || Array.isArray(data) || typeof data !== 'object') {
      throw new Error('Unexpected format of /showcase/getParty response');
    }
    return data;
  } catch (err) {
    throw new MusicubeApiError(
      err instanceof Error ? err.message : String(err),
      ERROR_INVALID_SHOWCASE_GET_PARTY_RESPONSE,
      res,
    );
  }
}
