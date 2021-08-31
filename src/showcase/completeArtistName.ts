import type { CompleteArtistNameResponse } from '../types';
import {
  ensure20x,
  MusicubeApiError,
  ERROR_INVALID_SHOWCASE_COMPLETE_ARTIST_NAME_RESPONSE,
} from '../common';
import { config } from '../config';
export type { CompleteArtistNameResponse };

export async function completeArtistName(
  prefix: string,
  init: RequestInit = {},
): Promise<CompleteArtistNameResponse> {
  const res = await config.fetch(
    `${config.apiUrl.replace(
      /\/$/,
      '',
    )}/showcase/completeArtistName?${new URLSearchParams({
      prefix,
    }).toString()}`,
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
        'Unexpected format of /showcase/completeArtistName response',
      );
    }

    return data.map(
      ({
        type,
        artist_name: artistName,
        contributor_types: contributorTypes,
        recording_title: recordingTitle,
      }) => ({
        type,
        artistName,
        contributorTypes: (contributorTypes || '')
          .split(',')
          .filter((s: string) => s.length)
          .map((s: string) => s.trim()),
        recordingTitle,
      }),
    );
  } catch (err) {
    throw new MusicubeApiError(
      err instanceof Error ? err.message : String(err),
      ERROR_INVALID_SHOWCASE_COMPLETE_ARTIST_NAME_RESPONSE,
      res,
    );
  }
}
