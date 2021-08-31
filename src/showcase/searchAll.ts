import {
  ensure20x,
  MusicubeApiError,
  ERROR_INVALID_SHOWCASE_SEARCH_ALL_RESPONSE,
} from '../common';
import { config } from '../config';
import type { Recording } from '../types';

type Filters = Record<string, string | null> & {
  fullName: string | null;
  genre: string | null;
};

export async function searchAll(
  filters: Filters,
  page: number = 0,
  shuffle: boolean = false,
  init: RequestInit = {},
): Promise<{
  currentPageNumber: number;
  hasNextPage: true;
  recordings: Recording[];
}> {
  const filtersWithValue = Object.fromEntries(
    Object.entries(filters).filter(
      (entry): entry is [string, string] =>
        entry[1] !== null && entry[1].length > 0,
    ),
  );
  const query = new URLSearchParams({
    ...filtersWithValue,
    page: String(page),
    sort: 'popularityDesc',
  });

  if (shuffle) {
    query.set('shuffle', 'true');
  }

  const res = await fetch(
    `${config.apiUrl.replace(
      /\/$/,
      '',
    )}/showcase/searchAll?${query.toString()}`,
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
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Unexpected format of /showcase/searchAll response');
    }
    return data;
  } catch (err) {
    throw new MusicubeApiError(
      err instanceof Error ? err.message : String(err),
      ERROR_INVALID_SHOWCASE_SEARCH_ALL_RESPONSE,
      res,
    );
  }
}
