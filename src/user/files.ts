import { ensure20x } from '../common';
import { config } from '../config';
import type { File, ApiFile } from '../types';

export interface Filters {
  contributor?: string | null;
  mainArtist?: string | null;
  composer?: string | null;
  genre?: string | null;
  musicalFeatures?: Record<string, string | null>;
}
export interface Options {
  page?: number;
  // sort?:
  //   | 'folderAsc'
  //   | 'folderDesc'
  //   | 'nameAsc'
  //   | 'nameDesc'
  //   | 'UploadStartTimeAsc'
  //   | 'UploadStartTimeDesc';
  shuffled?: boolean;
}

export async function files(
  { musicalFeatures = {}, ...filters }: Filters,
  { page = 0, shuffled }: Options,
  init: RequestInit = {},
): Promise<File[]> {
  const filtersWithValue = Object.fromEntries(
    Object.entries(filters)
      .concat(Object.entries(musicalFeatures))
      .filter(
        (entry): entry is [string, string] =>
          entry[1] !== null && entry[1].length > 0,
      ),
  );
  const query = new URLSearchParams({
    ...filtersWithValue,
    page: String(page),
  });
  if (shuffled) {
    query.append('shuffled', 'true');
  }

  const res = await config.fetch(
    `${config.apiUrl.replace(/\/$/, '')}/user/files?${query.toString()}`,
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
  if (!Array.isArray(data)) {
    throw new Error('Unexpected format of /user/files response');
  }
  return data.map(
    ({
      uploadStartTime,
      uploadEndTime,
      fingerprintStartTime,
      fingerprintEndTime,
      inferenceStartTime,
      inferenceEndTime,
      ...file
    }: ApiFile): File => ({
      uploadStartTime: uploadStartTime ? new Date(uploadStartTime) : null,
      uploadEndTime: uploadEndTime ? new Date(uploadEndTime) : null,
      fingerprintStartTime: fingerprintStartTime
        ? new Date(fingerprintStartTime)
        : null,
      fingerprintEndTime: fingerprintEndTime
        ? new Date(fingerprintEndTime)
        : null,
      inferenceStartTime: inferenceStartTime
        ? new Date(inferenceStartTime)
        : null,
      inferenceEndTime: inferenceEndTime ? new Date(inferenceEndTime) : null,
      ...file,
    }),
  );
}
