import React from 'react';
import {Text} from '@react-three/drei';
import {interpolate, useCurrentFrame} from 'remotion';
import {CYAN, TITLE_END_FRAME} from './constants';
import {stableRandom, tunnelPoint} from './utils/tunnel';

type WordParticleProps = {
  word: string;
  index: number;
};

export const WordParticle: React.FC<WordParticleProps> = ({word, index}) => {
  const frame = useCurrentFrame();
  const depth = 34;
  const baseAngle = index * 0.84 + stableRandom(index + 4) * Math.PI * 2;
  const baseZ = stableRandom(index + 19) * depth;
  const point = tunnelPoint({frame, index, baseAngle, baseZ, depth});

  const depthOpacity = interpolate(point.z, [-34, -4], [0.1, 0.62], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const finalFade = interpolate(frame, [TITLE_END_FRAME - 25, TITLE_END_FRAME], [1, 0.2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = depthOpacity * finalFade;
  const scale = 0.13 + stableRandom(index + 55) * 0.075 + interpolate(point.z, [-34, -4], [0, 0.11], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const parallaxX = Math.sin(frame * 0.01 + index) * 0.035;
  const blurGhostOffset = interpolate(point.z, [-10, -4], [0, 0.09], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <group position={[point.x + parallaxX, point.y, point.z]} rotation={[0, 0, point.angle + Math.PI / 2]}>
      <Text anchorX="center" anchorY="middle" fontSize={scale} maxWidth={3.4} textAlign="center" color={CYAN} fillOpacity={opacity}>
        {word}
        <meshBasicMaterial color={CYAN} transparent opacity={opacity} depthWrite={false} toneMapped={false} />
      </Text>
      <Text
        anchorX="center"
        anchorY="middle"
        fontSize={scale * 1.05}
        position={[blurGhostOffset, -blurGhostOffset * 0.45, 0.01]}
        color="#ddffff"
        fillOpacity={opacity * 0.18}
      >
        {word}
        <meshBasicMaterial color="#ddffff" transparent opacity={opacity * 0.18} depthWrite={false} toneMapped={false} />
      </Text>
    </group>
  );
};
