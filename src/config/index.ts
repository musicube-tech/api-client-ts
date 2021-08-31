interface Config {
  apiUrl: string;
  headers: HeadersInit;
}

export const config: Config = {
  apiUrl: 'https://api.musicu.be/api/v1',
  headers: {
    'x-mc-api-client-ts': `vVERSION`,
  },
};
