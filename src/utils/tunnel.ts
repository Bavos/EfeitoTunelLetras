export type TunnelPoint = {
  x: number;
  y: number;
  z: number;
  angle: number;
  radius: number;
};

export const stableRandom = (seed: number): number => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

export const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

export const easeInOutCubic = (t: number): number => {
  const clamped = clamp01(t);
  return clamped < 0.5 ? 4 * clamped * clamped * clamped : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
};

export const tunnelPoint = ({
  frame,
  index,
  baseAngle,
  baseZ,
  depth,
}: {
  frame: number;
  index: number;
  baseAngle: number;
  baseZ: number;
  depth: number;
}): TunnelPoint => {
  const angle = baseAngle + frame * 0.017 + Math.sin(frame * 0.006 + index) * 0.035;
  const radius = 3.4 + stableRandom(index + 12) * 2.4 + Math.sin(index * 0.7) * 0.42;
  const z = ((baseZ + frame * 0.075) % depth) - depth;

  return {
    angle,
    radius,
    z,
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius * 0.72,
  };
};
