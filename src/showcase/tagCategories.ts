import {
  ensure20x,
  MusicubeApiError,
  ERROR_INVALID_SHOWCASE_TAG_CATEGORIES_RESPONSE,
} from '../common';
import { config } from '../config';
import type { TagCategory } from '../types';

export async function tagCategories(
  init: RequestInit = {},
): Promise<TagCategory[]> {
  const res = await fetch(
    `${config.apiUrl.replace(/\/$/, '')}/showcase/tagCategories`,
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
      throw new Error('Unexpected format of /showcase/tagCategories response');
    }
    return data;
  } catch (err) {
    throw new MusicubeApiError(
      err instanceof Error ? err.message : String(err),
      ERROR_INVALID_SHOWCASE_TAG_CATEGORIES_RESPONSE,
      res,
    );
  }
}
