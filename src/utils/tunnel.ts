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
  const angle = baseAngle + frame * 0.025;
  const radius = 4.5 + Math.sin(index) * 1.2;
  const z = ((baseZ + frame * 0.08) % depth) - depth;

  return {
    angle,
    radius,
    z,
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
};

export const smoothStep = (value: number): number => {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
};
