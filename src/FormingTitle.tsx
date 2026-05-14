import React from 'react';
import {Text} from '@react-three/drei';
import {interpolate, useCurrentFrame} from 'remotion';
import {
  CYAN,
  SOFT_CYAN,
  TITLE_END_FRAME,
  TITLE_FINAL_SCALE,
  TITLE_FINAL_Z,
  TITLE_LETTER_SPACING,
  TITLE_LINE_1,
  TITLE_LINE_1_Y,
  TITLE_LINE_2,
  TITLE_LINE_2_Y,
  TITLE_START_FRAME,
} from './constants';
import {easeInOutCubic, stableRandom} from './utils/tunnel';

type TitleLetter = {
  char: string;
  globalIndex: number;
  lineIndex: number;
  finalX: number;
  finalY: number;
};

const buildLineLetters = (line: string, lineIndex: number, finalY: number, globalOffset: number): TitleLetter[] => {
  const centerOffset = ((line.length - 1) * TITLE_LETTER_SPACING) / 2;

  return line.split('').map((char, index) => ({
    char,
    globalIndex: globalOffset + index,
    lineIndex,
    finalX: index * TITLE_LETTER_SPACING - centerOffset,
    finalY,
  }));
};

const LETTERS = [
  ...buildLineLetters(TITLE_LINE_1, 0, TITLE_LINE_1_Y, 0),
  ...buildLineLetters(TITLE_LINE_2, 1, TITLE_LINE_2_Y, TITLE_LINE_1.length),
];

export const FormingTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const rawProgress = interpolate(frame, [TITLE_START_FRAME, TITLE_END_FRAME], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const progress = easeInOutCubic(rawProgress);
  const breathing = frame >= TITLE_END_FRAME ? 1 + Math.sin((frame - TITLE_END_FRAME) * 0.055) * 0.018 : 1;
  const finalGlow = interpolate(frame, [TITLE_END_FRAME - 22, TITLE_END_FRAME, 300], [0.72, 1, 0.94], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <group>
      {LETTERS.map(({char, globalIndex, lineIndex, finalX, finalY}) => {
        const swirl = frame * 0.025;
        const startX = Math.cos(globalIndex * 1.4 + swirl) * 5;
        const startY = Math.sin(globalIndex * 1.2 + swirl) * 3.5;
        const startZ = -16 - globalIndex * 0.6;
        const float = Math.sin(frame * 0.035 + globalIndex * 0.8) * 0.045 * (1 - progress);
        const lineSettle = Math.sin(frame * 0.018 + lineIndex) * 0.012 * progress;

        const x = interpolate(progress, [0, 1], [startX, finalX]);
        const y = interpolate(progress, [0, 1], [startY, finalY + lineSettle]) + float;
        const z = interpolate(progress, [0, 1], [startZ, TITLE_FINAL_Z]);

        const initialRotX = (stableRandom(globalIndex + 100) - 0.5) * 1.45 + frame * 0.006 * (1 - progress);
        const initialRotY = (stableRandom(globalIndex + 200) - 0.5) * 1.9 + frame * 0.008 * (1 - progress);
        const initialRotZ = (stableRandom(globalIndex + 300) - 0.5) * 1.15 + frame * 0.004 * (1 - progress);
        const rotationX = interpolate(progress, [0, 1], [initialRotX, 0]);
        const rotationY = interpolate(progress, [0, 1], [initialRotY, 0]);
        const rotationZ = interpolate(progress, [0, 1], [initialRotZ, 0]);

        const opacity = interpolate(frame, [20, TITLE_START_FRAME, TITLE_END_FRAME - 20, TITLE_END_FRAME], [0.28, 0.68, 0.94, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const scale = TITLE_FINAL_SCALE * breathing * interpolate(progress, [0, 1], [0.58, 1]);

        return (
          <group key={`${char}-${globalIndex}`} position={[x, y, z]} rotation={[rotationX, rotationY, rotationZ]} scale={scale}>
            <Text anchorX="center" anchorY="middle" fontSize={0.52} color={SOFT_CYAN} fillOpacity={opacity * 0.28 * finalGlow}>
              {char}
              <meshBasicMaterial color={SOFT_CYAN} transparent opacity={opacity * 0.28 * finalGlow} depthWrite={false} toneMapped={false} />
            </Text>
            <Text anchorX="center" anchorY="middle" fontSize={0.36} color={CYAN} fillOpacity={opacity * finalGlow}>
              {char}
              <meshBasicMaterial color={CYAN} transparent opacity={opacity * finalGlow} depthWrite={false} toneMapped={false} />
            </Text>
            <Text anchorX="center" anchorY="middle" fontSize={0.2} position={[0.012, -0.01, 0.015]} color="#ffffff" fillOpacity={opacity * 0.4 * finalGlow}>
              {char}
              <meshBasicMaterial color="#ffffff" transparent opacity={opacity * 0.4 * finalGlow} depthWrite={false} toneMapped={false} />
            </Text>
          </group>
        );
      })}
    </group>
  );
};
