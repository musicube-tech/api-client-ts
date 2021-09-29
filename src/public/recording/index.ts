import { ensure20x, RequestInitWithRecordHeaders } from '../../common';
import { config } from '../../config';
import type { FullRecording } from '../../types';

export type { FullRecording };

export async function recording(
  isrc: string,
  init?: RequestInitWithRecordHeaders,
): Promise<FullRecording | undefined>;
export async function recording(
  isrcs: string[],
  init?: RequestInitWithRecordHeaders,
): Promise<FullRecording[]>;
export async function recording(
  isrcs: string | string[],
  init: RequestInitWithRecordHeaders = {},
): Promise<FullRecording | undefined | FullRecording[]> {
  const res = await config.fetch(
    `${config.apiUrl.replace(/\/$/, '')}/public/recording/${
      Array.isArray(isrcs) ? isrcs.join(',') : isrcs
    }?responseSize=l`,
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
    throw new Error('Unexpected format of /public/recording response');
  }

  if (!Array.isArray(isrcs)) {
    return data[0];
  }

  return data;
}
