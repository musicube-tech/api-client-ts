import { ensure20x, RequestInitWithRecordHeaders } from '../common';
import { config } from '../config';
import { requireAuthorized } from '../helpers/requireAuthorized';

export async function folders(
  init: RequestInitWithRecordHeaders = {},
): Promise<string[]> {
  const res = await config.fetch(
    `${config.apiUrl.replace(/\/$/, '')}/user/folders`,
    {
      ...init,
      headers: requireAuthorized({
        ...config.headers,
        ...init.headers,
      }),
    },
  );

  ensure20x(res);

  const folders = await res.json();

  if (
    !Array.isArray(folders) ||
    folders.some((folder) => typeof folder !== 'string')
  ) {
    throw new Error('Unexpected format of /user/folders response');
  }

  return folders;
}
