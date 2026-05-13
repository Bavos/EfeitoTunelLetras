export const CENTRAL_TITLE = 'Iamazing School';

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

export type TechnologyWord = (typeof TECHNOLOGY_WORDS)[number];
