import { ensure20x } from '../common';
import { config } from '../config';
import type { Party } from '../types';

export async function getParty(
  name: string,
  init: RequestInit = {},
): Promise<Party> {
  const res = await config.fetch(
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

  const data = await res.json();
  if (!data || Array.isArray(data) || typeof data !== 'object') {
    throw new Error('Unexpected format of /showcase/getParty response');
  }
  return data;
}
