import { ensure20x } from '../common';
import { config } from '../config';
import type { File, ApiFile } from '../types';

export interface Filters {
  name?: string | null;
  contributor?: string | null;
  mainArtist?: string | null;
  composer?: string | null;
  genre?: string | null;
  folder?: string | null;
  extension?: string | null;
  fingerprintStatus?: string | null;
  inferenceStatus?: string | null;
  uploadStartTime?: Date;
  uploadEndTime?: Date;
  inferenceStartTime?: Date;
  inferenceEndTime?: Date;
  fingerprintStartTime?: Date;
  fingerprintEndTime?: Date;
  musicalFeatures?: Record<string, string | null>;
}
export interface Options {
  page?: number;
  sort?:
    | 'folderAsc'
    | 'folderDesc'
    | 'nameAsc'
    | 'nameDesc'
    | 'UploadStartTimeAsc'
    | 'UploadStartTimeDesc';
  shuffled?: boolean;
}

export async function files(
  { musicalFeatures = {}, ...filters }: Filters,
  { page = 0, shuffled, sort }: Options,
  init: RequestInit = {},
): Promise<File[]> {
  const filtersWithValue = Object.fromEntries(
    Object.entries(filters)
      .map(([k, v]: [string, string | null | undefined | Date]) => [
        k,
        v instanceof Date ? v.toISOString() : v,
      ])
      .concat(Object.entries(musicalFeatures))
      .filter((entry): entry is [string, string] =>
        Boolean(entry[1] && entry[1].length > 0),
      ),
  );
  const query = new URLSearchParams({
    ...filtersWithValue,
    page: String(page),
  });
  if (shuffled) {
    query.append('shuffled', 'true');
  }
  if (sort) {
    query.append('sort', sort);
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
