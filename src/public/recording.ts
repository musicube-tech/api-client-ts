import {
  ensure20x,
  MusicubeApiError,
  ERROR_INVALID_PUBLIC_RECORDING_RESPONSE,
} from '../common';
import { config } from '../config';
import type { FullRecording } from '../types';

export async function recording(
  isrc: string,
  init: RequestInit = {},
): Promise<FullRecording[]> {
  const res = await fetch(
    `${config.apiUrl.replace(
      /\/$/,
      '',
    )}/public/recording/${isrc}?responseSize=l`,
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
      throw new Error('Unexpected format of /public/recording response');
    }

    return data;
  } catch (err) {
    throw new MusicubeApiError(
      err instanceof Error ? err.message : String(err),
      ERROR_INVALID_PUBLIC_RECORDING_RESPONSE,
      res,
    );
  }
}

export async function initPut(
  id: string,
  token: string,
  init: RequestInit = {},
): Promise<string> {
  const res = await fetch(
    `${config.apiUrl.replace(/\/$/, '')}/public/recording/${id}/audio/initPut`,
    {
      method: 'POST',
      ...init,
      headers: {
        ...config.headers,
        authorization: `Bearer ${token}`,
        ...init.headers,
      },
    },
  );

  ensure20x(res);

  try {
    const data = await res.json();
    if (!data || !Array.isArray(data)) {
      throw new Error('Unexpected format of /public/recording response');
    }

    return data[0].url;
  } catch (err) {
    throw new MusicubeApiError(
      err instanceof Error ? err.message : String(err),
      ERROR_INVALID_PUBLIC_RECORDING_RESPONSE,
      res,
    );
  }
}
