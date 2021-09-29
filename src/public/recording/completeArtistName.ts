import type { CompleteArtistNameResponse } from '../../types';
import { ensure20x, RequestInitWithRecordHeaders } from '../../common';
import { config } from '../../config';
export type { CompleteArtistNameResponse };

export async function completeArtistName(
  prefix: string,
  init: RequestInitWithRecordHeaders = {},
): Promise<CompleteArtistNameResponse> {
  const res = await config.fetch(
    `${config.apiUrl.replace(
      /\/$/,
      '',
    )}/public/recording/completeArtistName?${new URLSearchParams({
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

  const data = await res.json();
  if (!data || !Array.isArray(data)) {
    throw new Error(
      'Unexpected format of /public/recording/completeArtistName response',
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
}
