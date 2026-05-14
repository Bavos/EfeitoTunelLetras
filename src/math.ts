import {interpolate} from 'remotion';

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const easeInOutCubic = (t: number) => {
  const x = clamp(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

export const easeOutQuint = (t: number) => 1 - Math.pow(1 - clamp(t), 5);

export const lerp = (from: number, to: number, progress: number) => from + (to - from) * progress;

export const seeded = (seed: number) => {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
};

export const phaseProgress = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
