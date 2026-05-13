import type {Vector3Tuple} from 'three';

export const COMP_ID = 'IamazingTunnel';
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;
export const DURATION_IN_FRAMES = 240;
export const DURATION_IN_SECONDS = DURATION_IN_FRAMES / FPS;
export const OUTPUT_PATH = 'out/iamazing-tunnel.mp4';

export const CENTRAL_TEXT = 'Iamazing School';

export const TECHNOLOGY_WORDS = [
  'Cloud Computing',
  'Big Data',
  'API',
  'Artificial Intelligence',
  'Data Center',
  'Machine Learning',
  'Open Source',
  'Cybersecurity',
  'Cryptography',
] as const;

export const WORD_RING_COUNT = 16;
export const CAMERA_TRAVEL = 34;
export const TUNNEL_DEPTH = 46;
export const BASE_RADIUS = 4.85;
export const HELIX_TWIST = 0.78;
export const FOCAL_PLANE_Z = -7.5;

export const COLORS = {
  background: '#03111f',
  deepBlue: '#071d34',
  cyan: '#74dff7',
  cyanSoft: '#9eefff',
  white: '#f4fbff',
  fog: '#0b2b43',
} as const;

export const KEY_LIGHT_POSITION: Vector3Tuple = [5.5, 7.5, 8.5];
export const RIM_LIGHT_POSITION: Vector3Tuple = [-4.5, -3.5, 6.5];
