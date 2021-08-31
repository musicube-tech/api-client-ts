import {
  ensure20x,
  MusicubeApiError,
  ERROR_INVALID_SHOWCASE_RELEASE_ANNIVERSARIES_RESPONSE,
} from '../common';
import { config } from '../config';
import type { RecordingTrackProduct } from '../types';

export async function releaseAnniversaries(
  date: string,
  init: RequestInit = {},
): Promise<RecordingTrackProduct[]> {
  const res = await fetch(
    `${config.apiUrl.replace(/\/$/, '')}/showcase/releaseAnniversaries/${date}`,
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
      throw new Error(
        'Unexpected format of /showcase/releaseAnniversaries response',
      );
    }
    return data;
  } catch (err) {
    throw new MusicubeApiError(
      err instanceof Error ? err.message : String(err),
      ERROR_INVALID_SHOWCASE_RELEASE_ANNIVERSARIES_RESPONSE,
      res,
    );
  }
}
