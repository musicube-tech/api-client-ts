import type { Recording } from '../types';

const AFFINITY_POSTFIX = 'Affinity';

export default function getAffinityFeatures(
  features: Recording['musicalFeatures'],
  affinityThreshold: number = 0.3,
): [category: string, value: string, affinity: number][] {
  if (!features) {
    return [];
  }
  return Object.entries(features)
    .filter(
      ([key, value]: [string, unknown]) =>
        key.endsWith(AFFINITY_POSTFIX) &&
        typeof value === 'number' &&
        value > affinityThreshold,
    )
    .map(([key]): [string, string | undefined, number | undefined] => {
      const category = key.replace(new RegExp(`${AFFINITY_POSTFIX}$`), '');
      const value = features[category];
      const affinity = features[key];

      return [
        category,
        typeof value === 'string' ? value : undefined,
        typeof affinity === 'number' ? affinity : undefined,
      ];
    })
    .filter(
      (v): v is [string, string, number] => ![v[1], v[2]].includes(undefined),
    );
}
