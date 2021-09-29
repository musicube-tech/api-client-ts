import { ensure20x } from '../common';
import { config } from '../config';

export async function referrers(
  user: string,
  init: RequestInit = {},
): Promise<string[]> {
  const res = await config.fetch(
    `${config.apiUrl.replace(/\/$/, '')}/user/referrers/${user}`,
    {
      ...init,
      headers: {
        ...config.headers,
        ...init.headers,
      },
    },
  );

  ensure20x(res);

  const referrers = await res.json();

  if (
    !Array.isArray(referrers) ||
    referrers.some((code) => typeof code !== 'string')
  ) {
    throw new Error('Unexpected format of /users/referrers response');
  }

  return referrers;
}
