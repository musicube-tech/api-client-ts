interface Config {
  fetch: typeof window.fetch;
  apiUrl: string;
  headers: Record<string, string>;
}

export const config: Config = {
  fetch: typeof fetch ? fetch.bind(window || global) : (undefined as any),
  apiUrl: 'https://api.musicu.be/api/v1',
  headers: {
    'x-mc-api-client-ts': `vVERSION`,
  },
};
