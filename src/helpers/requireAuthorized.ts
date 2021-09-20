import { MusicubeApiError, ERROR_UNAUTHORIZED } from '../common';

export function requireAuthorized(
  headers: Record<string, string>,
): Record<string, string> {
  if (!headers.Authorization && !headers.authorization) {
    throw new MusicubeApiError('Unauthorized', ERROR_UNAUTHORIZED);
  }

  return headers;
}
