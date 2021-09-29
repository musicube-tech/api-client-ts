export function requireAuthorized(
  headers: Record<string, string>,
): Record<string, string> {
  if (!headers.Authorization && !headers.authorization) {
    throw new Error('Unauthorized');
  }

  return headers;
}
