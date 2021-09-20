interface Config {
  fetch: typeof window.fetch;
  apiUrl: string;
  headers: Record<string, string>;
}

const g =
  typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : false;

export const config: Config = {
  fetch:
    g && typeof g.fetch === 'function' ? g.fetch.bind(g) : (undefined as any),
  apiUrl: 'https://api.musicu.be/api/v1',
  headers: {
    Accept: 'application/json',
    'x-mc-api-client-ts': `vVERSION`,
  },
};
