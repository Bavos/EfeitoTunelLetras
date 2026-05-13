import type {Vector3Tuple} from 'three';

export const tunnelSettings = {
  turns: 7.5,
  rows: 92,
  radius: 4.2,
  depthSpacing: 1.55,
  scrollSpeed: 0.185,
  focalDepth: 18,
  farDepth: 88,
};

export type HelixPoint = {
  angle: number;
  radius: number;
  position: Vector3Tuple;
  opacity: number;
  scale: number;
};

export const getHelixPoint = (index: number, frame: number, phase = 0): HelixPoint => {
  const progress = frame * tunnelSettings.scrollSpeed;
  const zRange = tunnelSettings.rows * tunnelSettings.depthSpacing;
  const wrappedZ = ((index * tunnelSettings.depthSpacing - progress) % zRange + zRange) % zRange;
  const z = tunnelSettings.farDepth - wrappedZ;
  const normalizedDepth = wrappedZ / zRange;
  const angle = index * 0.58 + frame * 0.012 + phase;
  const breathing = Math.sin(frame * 0.025 + index * 0.41) * 0.22;
  const radius = tunnelSettings.radius + breathing + Math.sin(index * 0.17) * 0.38;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius * 1.18;
  const frontFade = Math.min(1, Math.max(0, (z + 4) / 10));
  const backFade = Math.min(1, Math.max(0, (tunnelSettings.farDepth - z) / 18));
  const opacity = Math.max(0, Math.min(0.92, frontFade * backFade * (0.42 + normalizedDepth * 0.58)));
  const scale = 0.36 + (1 - normalizedDepth) * 0.52;

  return {angle, radius, position: [x, y, z], opacity, scale};
};
