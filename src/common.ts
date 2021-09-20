export const ERROR_NON_200_RESPONSE = Symbol('NON_200_RESPONSE');
export const ERROR_INVALID_AUTH_RESPONSE = Symbol('INVALID_AUTH_RESPONSE');
export const ERROR_INVALID_ME_RESPONSE = Symbol('INVALID_ME_RESPONSE');
export const ERROR_INVALID_SHOWCASE_BIRTHDAYS_RESPONSE = Symbol(
  'INVALID_SHOWCASE_BIRTHDAYS_RESPONSE',
);
export const ERROR_INVALID_SHOWCASE_DEATHDAYS_RESPONSE = Symbol(
  'INVALID_SHOWCASE_DEATHDAYS_RESPONSE',
);
export const ERROR_INVALID_SHOWCASE_GET_PARTY_RESPONSE = Symbol(
  'INVALID_SHOWCASE_GET_PARTY_RESPONSE',
);
export const ERROR_INVALID_SHOWCASE_RELEASE_ANNIVERSARIES_RESPONSE = Symbol(
  'INVALID_SHOWCASE_RELEASE_ANNIVERSARIES_RESPONSE',
);
export const ERROR_INVALID_PUBLIC_RECORDING_RESPONSE = Symbol(
  'INVALID_PUBLIC_RECORDING_RESPONSE',
);
export const ERROR_INVALID_PUBLIC_RECORDING_INIT_PUT_RESPONSE = Symbol(
  'INVALID_PUBLIC_RECORDING_INIT_PUT_RESPONSE',
);
export const ERROR_INVALID_SHOWCASE_TAG_CATEGORIES_RESPONSE = Symbol(
  'INVALID_SHOWCASE_TAG_CATEGORIES_RESPONSE',
);
export const ERROR_INVALID_SHOWCASE_GENRES_RESPONSE = Symbol(
  'INVALID_SHOWCASE_GENRES_RESPONSE',
);
export const ERROR_INVALID_PUBLIC_RECORDING_SEARCH_RESPONSE = Symbol(
  'INVALID_PUBLIC_RECORDING_SEARCH_RESPONSE',
);
export const ERROR_INVALID_SHOWCASE_SEARCH_FILTERS_RESPONSE = Symbol(
  'INVALID_SHOWCASE_SEARCH_FILTERS_RESPONSE',
);
export const ERROR_INVALID_PUBLIC_RECORDING_COMPLETE_ARTIST_NAME_RESPONSE =
  Symbol('INVALID_PUBLIC_RECORDING_COMPLETE_ARTIST_NAME_RESPONSE');
export const ERROR_INVALID_REFERRERS_RESPONSE = Symbol(
  'ERROR_INVALID_REFERRERS_RESPONSE',
);
export const ERROR_INVALID_USER_FOLDERS_RESPONSE = Symbol(
  'ERROR_INVALID_USER_FOLDERS_RESPONSE',
);
export const ERROR_UNAUTHORIZED = Symbol('ERROR_UNAUTHORIZED');

export const VALIDATION_ERROR_OVER_255 = 'validation.only255';
export const VALIDATION_ERROR_INVALID_EMAIL =
  'validation.emailMustHaveAtAndDot';
export const VALIDATION_ERROR_NOT_SET = 'validation.notSet';

export type RequestInitWithRecordHeaders = Omit<RequestInit, 'headers'> & {
  headers?: Record<string, string>;
};

export class MusicubeApiError extends Error {
  code: string | symbol;
  response?: Response;
  constructor(message: string, code: string | symbol, response?: Response) {
    super(message);
    this.code = code;
    this.response = response;
    Object.setPrototypeOf(this, MusicubeApiError.prototype);
  }
}

export function ensure20x(res: Response) {
  if (!res.status.toString().match(/^20/)) {
    throw new MusicubeApiError('Non-200 response', ERROR_NON_200_RESPONSE, res);
  }
}
