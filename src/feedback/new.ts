import { ensure20x, RequestInitWithRecordHeaders } from '../common';
import { config } from '../config';

export interface FeedbackData {
  email: string;
  comment: string;
  selectedUserRole?: string;
  selectedOption?: string;
}
export async function newFeedback(
  data: FeedbackData,
  init: RequestInitWithRecordHeaders = {},
): Promise<void> {
  const res = await fetch(`${config.apiUrl.replace(/\/$/, '')}/feedback/new`, {
    method: 'post',
    body: JSON.stringify(data),
    ...init,
    headers: {
      ...config.headers,
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });

  ensure20x(res);
}
