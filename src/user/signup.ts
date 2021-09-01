import {
  ensure20x,
  VALIDATION_ERROR_OVER_255,
  VALIDATION_ERROR_INVALID_EMAIL,
  VALIDATION_ERROR_NOT_SET,
} from '../common';
import { config } from '../config';
import type { Validation, SignUpData, SignUpDataValidations } from '../types';

function validateMax255(value?: string): Validation {
  if (!value || !value.length) {
    return { empty: true };
  }

  return {
    empty: false,
    error: value.length > 255 ? VALIDATION_ERROR_OVER_255 : false,
  };
}

function validateEmail(email?: string): Validation {
  if (!email || email.length < 5) {
    return { empty: true };
  }

  return {
    empty: false,
    error: email.match(/.+@.+\..+/) ? false : VALIDATION_ERROR_INVALID_EMAIL,
  };
}

function and<T>(
  ...validations: ((value: T) => Validation)[]
): (value: T) => Validation {
  return (value): Validation => {
    return validations.reduce(
      (prev, validation) => {
        if (prev.empty === true || prev.error === false) {
          return validation(value);
        }
        return prev;
      },
      { empty: true } as Validation,
    );
  };
}

function validateSet(value?: boolean): Validation {
  return { empty: false, error: !value ? VALIDATION_ERROR_NOT_SET : false };
}

const keys: (keyof SignUpData)[] = [
  'fullName',
  'password',
  'emailAddress',
  'tos',
  'captcha',
];

export function signUpSubmittable(validations: SignUpDataValidations): boolean {
  return (
    keys.reduce((ok, key) => {
      return (
        ok &&
        (validations[key] || {}).empty === false &&
        (validations[key] || {}).error === false
      );
    }, true) && !validations.companyName?.error
  );
}

export function validateSignUp(data: SignUpData): SignUpDataValidations {
  const validations: any = {};

  for (const [key, value] of Object.entries(data)) {
    switch (key) {
      case 'companyName':
      case 'fullName':
      case 'password':
      case 'captcha':
        validations[key] = validateMax255(value);
        break;
      case 'emailAddress':
        validations[key] = and(validateMax255, validateEmail)(value);
        break;
      case 'tos':
        validations[key] = validateSet(value);
        break;
    }
  }

  return validations;
}

export async function signUp(
  { emailAddress, password, fullName, companyName }: SignUpData,
  token: string,
  init: RequestInit = {},
): Promise<void> {
  const body = JSON.stringify({
    emailAddress,
    password,
    fullName,
    companyName,
  });
  const res = await config.fetch(
    `${config.apiUrl.replace(/\/$/, '')}/user/sign-up`,
    {
      method: 'post',
      body,
      ...init,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...init.headers,
      },
    },
  );

  ensure20x(res);
}
