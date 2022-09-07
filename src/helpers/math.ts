export const clampFromMax = (min: number, value: number, max: number) =>
  Math.max(min, Math.min(max - value, max));

export const clampFromMin = (min: number, value: number, max: number) =>
  Math.max(min, Math.min(min + value, max));
