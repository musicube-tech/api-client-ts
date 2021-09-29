import type { SearchFiltersResponse } from '../types';
import { ensure20x } from '../common';
import { config } from '../config';
export type { SearchFiltersResponse };

export async function searchFilters(
  responseSize: 's' | 'l' = 's',
  init: RequestInit = {},
): Promise<SearchFiltersResponse> {
  const res = await config.fetch(
    `${config.apiUrl.replace(
      /\/$/,
      '',
    )}/showcase/searchFilters?responseSize=${responseSize}`,
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
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Unexpected format of /showcase/searchFilters response');
  }
  return data;
}
