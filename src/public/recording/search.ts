import {
  ensure20x,
  MusicubeApiError,
  ERROR_INVALID_PUBLIC_RECORDING_SEARCH_RESPONSE,
} from '../../common';
import { config } from '../../config';
import type { Recording } from '../../types';

export interface Filters {
  contributor?: string | null;
  mainArtist?: string | null;
  composer?: string | null;
  genre?: string | null;
  musicalFeatures?: Record<string, string | null>;
}
export interface Options {
  page?: number;
  sort?:
    | 'popularityDesc'
    | 'popularityAsc'
    | 'releaseDateDesc'
    | 'releaseDateAsc';
  shuffle?: boolean;
}

export async function search(
  { musicalFeatures = {}, ...filters }: Filters,
  { page = 0, shuffle = false, sort = 'popularityDesc' }: Options,
  init: RequestInit = {},
): Promise<{
  currentPageNumber: number;
  hasNextPage: true;
  recordings: Recording[];
}> {
  const filtersWithValue = Object.fromEntries(
    Object.entries(filters)
      .concat(Object.entries(musicalFeatures))
      .filter(
        (entry): entry is [string, string] =>
          entry[1] !== null && entry[1].length > 0,
      ),
  );
  const query = new URLSearchParams({
    ...filtersWithValue,
    page: String(page),
    sort,
  });

  if (shuffle) {
    query.set('shuffle', 'true');
  }

  const res = await config.fetch(
    `${config.apiUrl.replace(
      /\/$/,
      '',
    )}/public/recording/search?${query.toString()}`,
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
      throw new Error('Unexpected format of /public/recording/search response');
    }
    return data;
  } catch (err) {
    throw new MusicubeApiError(
      err instanceof Error ? err.message : String(err),
      ERROR_INVALID_PUBLIC_RECORDING_SEARCH_RESPONSE,
      res,
    );
  }
}
