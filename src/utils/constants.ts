export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const FPS = 30;
export const DURATION_SECONDS = 8;
export const DURATION_IN_FRAMES = FPS * DURATION_SECONDS;

export const PRIMARY_TITLE = 'Iamazing School';

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

export const TUNNEL_SETTINGS = {
  rings: 17,
  wordsPerRing: TECHNOLOGY_WORDS.length,
  radius: 4.8,
  depthSpacing: 3.1,
  travelSpeed: 0.16,
  spiralTwist: 0.46,
  titleDepth: -8,
};

export const COLORS = {
  background: '#020612',
  deepBlue: '#051538',
  cyan: '#33dcff',
  cyanSoft: '#8feeff',
  white: '#f3fbff',
  navyFog: '#07142c',
};
