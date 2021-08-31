interface Config {
  fetch: typeof window.fetch;
  apiUrl: string;
  headers: HeadersInit;
}

export const config: Config = {
  fetch: (window || global).fetch,
  apiUrl: 'https://api.musicu.be/api/v1',
  headers: {
    'x-mc-api-client-ts': `vVERSION`,
  },
};
