import { ensure20x } from '../common';
import { config } from '../config';
import { Anniversary } from '../types';

export async function birthdays(
  date: string,
  init: RequestInit = {},
): Promise<Anniversary[]> {
  const res = await config.fetch(
    `${config.apiUrl.replace(/\/$/, '')}/showcase/birthdays/${date}`,
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
    throw new Error('Unexpected format of /showcase/birthdays response');
  }
  return data;
}
