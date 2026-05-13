export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export const lerp = (from: number, to: number, progress: number) => {
  return from + (to - from) * progress;
};

export const pingPong = (value: number) => {
  return 0.5 - Math.cos(value * Math.PI * 2) * 0.5;
};

export const easeInOutCubic = (value: number) => {
  const clamped = clamp(value, 0, 1);
  return clamped < 0.5
    ? 4 * clamped * clamped * clamped
    : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
};
