import React from 'react';
import {Text} from '@react-three/drei';
import {interpolate, useCurrentFrame} from 'remotion';
import {CYAN} from './constants';
import {stableRandom, tunnelPoint} from './utils/tunnel';

type WordParticleProps = {
  word: string;
  index: number;
};

export const WordParticle: React.FC<WordParticleProps> = ({word, index}) => {
  const frame = useCurrentFrame();
  const depth = 30;
  const baseAngle = index * 0.84 + stableRandom(index + 4) * Math.PI * 2;
  const baseZ = stableRandom(index + 19) * depth;
  const point = tunnelPoint({frame, index, baseAngle, baseZ, depth});

  const nearCamera = interpolate(point.z, [-30, -2.5], [0.16, 0.72], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleProtection = interpolate(frame, [140, 210], [1, 0.35], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = nearCamera * titleProtection;
  const scale = 0.12 + stableRandom(index + 55) * 0.07 + interpolate(point.z, [-30, -2.5], [0, 0.12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const blurGhostOffset = interpolate(point.z, [-9, -2.5], [0, 0.12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <group position={[point.x, point.y, point.z]} rotation={[0, 0, point.angle + Math.PI / 2]}>
      <Text
        anchorX="center"
        anchorY="middle"
        fontSize={scale}
        maxWidth={3.2}
        textAlign="center"
        color={CYAN}
        fillOpacity={opacity}
      >
        {word}
        <meshBasicMaterial color={CYAN} transparent opacity={opacity} depthWrite={false} toneMapped={false} />
      </Text>
      <Text
        anchorX="center"
        anchorY="middle"
        fontSize={scale * 1.04}
        position={[blurGhostOffset, -blurGhostOffset * 0.45, 0.01]}
        color="#c9feff"
        fillOpacity={opacity * 0.22}
      >
        {word}
        <meshBasicMaterial color="#c9feff" transparent opacity={opacity * 0.22} depthWrite={false} toneMapped={false} />
      </Text>
    </group>
  );
};
