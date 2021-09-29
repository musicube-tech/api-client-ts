import { ensure20x } from '../common';
import { config } from '../config';
import type { TagCategory } from '../types';

export async function tagCategories(
  init: RequestInit = {},
): Promise<TagCategory[]> {
  const res = await config.fetch(
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

  const data = await res.json();
  if (!data || !Array.isArray(data)) {
    throw new Error('Unexpected format of /showcase/tagCategories response');
  }
  return data;
}
