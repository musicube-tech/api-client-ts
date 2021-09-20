import {
  ensure20x,
  MusicubeApiError,
  ERROR_INVALID_USER_FOLDERS_RESPONSE,
  RequestInitWithRecordHeaders,
} from '../common';
import { config } from '../config';
import { requireAuthorized } from '../helpers/requireAuthorized';

export interface Folder {
  folder: string;
}

export async function folders(
  init: RequestInitWithRecordHeaders = {},
): Promise<Folder[]> {
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

  try {
    const folders = await res.json();

    if (
      !Array.isArray(folders) ||
      folders.some(({ folder }) => typeof folder !== 'string')
    ) {
      throw new Error('Unexpected format of /user/folders response');
    }

    return folders;
  } catch (err) {
    throw new MusicubeApiError(
      err instanceof Error ? err.message : String(err),
      ERROR_INVALID_USER_FOLDERS_RESPONSE,
      res,
    );
  }
}
