import { ensure20x, RequestInitWithRecordHeaders } from '../../common';
import { config } from '../../config';

export async function initFileUpload(
  file: string,
  folder?: string,
  init: RequestInitWithRecordHeaders = {},
): Promise<{ isrc: string; url: string }> {
  const params = folder && new URLSearchParams({ folder });

  const res = await config.fetch(
    `${config.apiUrl.replace(/\/$/, '')}/public/recording/${encodeURIComponent(
      file,
    )}/initFileUpload${params ? `?${params.toString()}` : ''}`,
    {
      method: 'post',
      ...init,
      headers: {
        ...config.headers,
        ...init.headers,
      },
    },
  );

  ensure20x(res);

  const data = await res.json();

  if (typeof data.isrc !== 'string' || typeof data.url !== 'string') {
    throw new Error(
      'Unexpected format of /public/recording/:file/initFileUpload response',
    );
  }

  return data;
}
