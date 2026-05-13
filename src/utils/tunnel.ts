import {BASE_RADIUS, CAMERA_TRAVEL, FOCAL_PLANE_Z, FPS, HELIX_TWIST, TECHNOLOGY_WORDS, TUNNEL_DEPTH, WORD_RING_COUNT} from '../constants';

export type WordState = {
  text: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  opacity: number;
  blur: number;
  glow: number;
  distanceToFocus: number;
  speedAlpha: number;
};

const positiveModulo = (value: number, modulo: number) => ((value % modulo) + modulo) % modulo;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smoothstep = (edge0: number, edge1: number, value: number) => {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

export const getCameraProgress = (frame: number) => (frame / (WORD_RING_COUNT * FPS)) * CAMERA_TRAVEL;

export const getWordState = (index: number, frame: number): WordState => {
  const word = TECHNOLOGY_WORDS[index % TECHNOLOGY_WORDS.length];
  const ring = Math.floor(index / TECHNOLOGY_WORDS.length);
  const wordSlot = index % TECHNOLOGY_WORDS.length;
  const time = frame / FPS;
  const cameraProgress = getCameraProgress(frame);
  const depthSeed = ring * 3.25 + wordSlot * 0.2;
  const wrappedDepth = positiveModulo(depthSeed - cameraProgress, TUNNEL_DEPTH);
  const z = -wrappedDepth - 2.25;
  const angle = wordSlot * ((Math.PI * 2) / TECHNOLOGY_WORDS.length) + ring * HELIX_TWIST + time * 0.34;
  const radiusPulse = Math.sin(time * 0.7 + index * 1.73) * 0.24;
  const radius = BASE_RADIUS + radiusPulse + ring * 0.025;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius * 1.32;

  const nearAlpha = smoothstep(-18, -5, z);
  const farAlpha = 1 - smoothstep(-42, -27, z);
  const opacity = clamp(nearAlpha * farAlpha * 0.92, 0.035, 0.92);
  const mediumFocus = 1 - clamp(Math.abs(z - FOCAL_PLANE_Z) / 18, 0, 1);
  const proximity = smoothstep(-12, -2.75, z);
  const scale = clamp(0.34 + mediumFocus * 0.62 + proximity * 1.34, 0.25, 2.45);
  const blur = clamp(Math.abs(z - FOCAL_PLANE_Z) / 18 + proximity * 0.95, 0.03, 1.65);
  const speedAlpha = clamp(proximity * 1.25 + (1 - farAlpha) * 0.25, 0, 1);

  return {
    text: word,
    position: [x, y, z],
    rotation: [
      Math.sin(time * 0.45 + index) * 0.08,
      -angle + Math.PI / 2 + Math.sin(time * 0.22 + ring) * 0.05,
      Math.cos(time * 0.33 + index * 0.31) * 0.07,
    ],
    scale,
    opacity,
    blur,
    glow: clamp(0.18 + mediumFocus * 0.75 + proximity * 0.45, 0.12, 1.1),
    distanceToFocus: Math.abs(z - FOCAL_PLANE_Z),
    speedAlpha,
  };
};

export const getParticleState = (index: number, frame: number) => {
  const time = frame / FPS;
  const cameraProgress = getCameraProgress(frame) * 0.82;
  const seed = index * 12.9898;
  const depth = positiveModulo(seed * 0.77 - cameraProgress, TUNNEL_DEPTH + 18);
  const angle = seed * 0.37 + depth * 0.14 + time * 0.08;
  const radius = 1.2 + positiveModulo(seed, 1) * 8.4;

  return {
    position: [Math.cos(angle) * radius, Math.sin(angle) * radius * 1.42, -depth - 1.8] as [number, number, number],
    opacity: clamp(1 - depth / (TUNNEL_DEPTH + 18), 0.08, 0.68),
    size: 0.014 + positiveModulo(seed * 0.13, 1) * 0.028,
  };
};
