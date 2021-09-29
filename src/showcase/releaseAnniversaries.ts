import { ensure20x } from '../common';
import { config } from '../config';
import type { RecordingTrackProduct } from '../types';

export async function releaseAnniversaries(
  date: string,
  init: RequestInit = {},
): Promise<RecordingTrackProduct[]> {
  const res = await config.fetch(
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

  const data = await res.json();
  if (!data || !Array.isArray(data)) {
    throw new Error(
      'Unexpected format of /showcase/releaseAnniversaries response',
    );
  }
  return data;
}
