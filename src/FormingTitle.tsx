import React from 'react';
import {Text} from '@react-three/drei';
import {interpolate, spring, useCurrentFrame} from 'remotion';
import {CYAN, FPS, SOFT_CYAN, TITLE} from './constants';
import {stableRandom} from './utils/tunnel';

const startFrame = 60;
const endFrame = 190;
const letterSpacing = 0.36;
const wordGap = 0.78;
const finalZ = -8;
const finalY = 0;
const finalScale = 0.31;

type TitleLetter = {
  char: string;
  sourceIndex: number;
  finalX: number;
};

const buildLetters = (): TitleLetter[] => {
  let cursor = 0;
  const measured = TITLE.split('').map((char) => {
    if (char === ' ') {
      const slot = {char, x: cursor};
      cursor += wordGap;
      return slot;
    }

    const slot = {char, x: cursor};
    cursor += letterSpacing;
    return slot;
  });

  const totalWidth = cursor - letterSpacing;
  const centerOffset = totalWidth / 2;

  return measured
    .map((slot, sourceIndex) => ({
      char: slot.char,
      sourceIndex,
      finalX: slot.x - centerOffset,
    }))
    .filter((slot) => slot.char !== ' ');
};

const LETTERS = buildLetters();

export const FormingTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const rawProgress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const easedProgress = spring({
    frame: frame - startFrame,
    fps: FPS,
    config: {
      damping: 18,
      stiffness: 70,
      mass: 0.9,
    },
  });

  const progress = Math.min(1, Math.max(0, easedProgress));
  const composedProgress = Math.min(1, Math.max(rawProgress * 0.92, progress * 0.98));
  const breathing = frame > endFrame ? 1 + Math.sin(frame * 0.04) * 0.015 : 1;

  return (
    <group position={[0, 0, 0]}>
      {LETTERS.map(({char, sourceIndex, finalX}, index) => {
        const swirl = frame * 0.025;
        const startX = Math.cos(index * 1.7 + swirl) * 5.5;
        const startY = Math.sin(index * 1.3 + swirl) * 4.2;
        const startZ = -18 - index * 0.7;

        const x = interpolate(composedProgress, [0, 1], [startX, finalX]);
        const y = interpolate(composedProgress, [0, 1], [startY, finalY]);
        const z = interpolate(composedProgress, [0, 1], [startZ, finalZ]);

        const initialRotX = (stableRandom(sourceIndex + 100) - 0.5) * 1.4;
        const initialRotY = (stableRandom(sourceIndex + 200) - 0.5) * 1.8;
        const initialRotZ = (stableRandom(sourceIndex + 300) - 0.5) * 1.1;
        const rotationX = interpolate(composedProgress, [0, 1], [initialRotX, 0]);
        const rotationY = interpolate(composedProgress, [0, 1], [initialRotY, 0]);
        const rotationZ = interpolate(composedProgress, [0, 1], [initialRotZ, 0]);

        const opacity = interpolate(frame, [startFrame - 18, startFrame + 34, endFrame], [0.18, 0.72, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const scale = finalScale * breathing * interpolate(composedProgress, [0, 1], [0.76, 1]);

        return (
          <group key={`${char}-${sourceIndex}`} position={[x, y, z]} rotation={[rotationX, rotationY, rotationZ]}>
            <Text
              anchorX="center"
              anchorY="middle"
              fontSize={scale * 1.95}
              letterSpacing={0}
              color={SOFT_CYAN}
              fillOpacity={opacity * 0.16}
            >
              {char}
              <meshBasicMaterial color={SOFT_CYAN} transparent opacity={opacity * 0.16} depthWrite={false} toneMapped={false} />
            </Text>
            <Text anchorX="center" anchorY="middle" fontSize={scale} color={CYAN} fillOpacity={opacity}>
              {char}
              <meshBasicMaterial color={CYAN} transparent opacity={opacity} depthWrite={false} toneMapped={false} />
            </Text>
          </group>
        );
      })}
    </group>
  );
};
