import { ensure20x, RequestInitWithRecordHeaders } from '../common';
import { config } from '../config';
import { isValidEmail } from '../helpers/isValidEmail';
import { MusicubeApiError, ERROR_INVALID_SIGNUP_NEW_EMAIL } from '../common';

export { isValidEmail };

export interface FeedbackData {
  email: string;
  message: string;
  fields?: Record<string, string>;
}
export async function newFeedback(
  { fields = {}, ...required }: FeedbackData,
  init: RequestInitWithRecordHeaders = {},
): Promise<void> {
  if (!isValidEmail(required.email)) {
    throw new MusicubeApiError('Invalid email', ERROR_INVALID_SIGNUP_NEW_EMAIL);
  }
  const res = await fetch(`${config.apiUrl.replace(/\/$/, '')}/feedback/new`, {
    method: 'post',
    body: JSON.stringify({ ...required, ...fields }),
    ...init,
    headers: {
      ...config.headers,
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });

  ensure20x(res);
}
