export const VALIDATION_ERROR_OVER_255 = 'validation.only255';
export const VALIDATION_ERROR_INVALID_EMAIL =
  'validation.emailMustHaveAtAndDot';
export const VALIDATION_ERROR_NOT_SET = 'validation.notSet';

export type RequestInitWithRecordHeaders = Omit<RequestInit, 'headers'> & {
  headers?: Record<string, string>;
};

export function ensure20x(res: Response) {
  if (!res.status.toString().match(/^20/)) {
    const e: any = new Error('Non-200 response');
    e.res = res;
    throw e;
  }
}
