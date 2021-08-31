import type { extend as JsfExtend } from 'json-schema-faker';

import faker from 'faker';

Object.assign(faker.date, {
  format: (format: string = 'yyyy-MM-DD', factory = 'recent', args = []) => {
    return require('date-fns/format')(
      (faker.date as any)[factory](...args),
      format,
    );
  },
});

export function extend(
  {
    extend,
  }: {
    extend: typeof JsfExtend;
  },
  _: object,
) {
  extend('faker', () => faker);
}
