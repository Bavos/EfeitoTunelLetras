import {Text} from '@react-three/drei';
import {memo, useMemo} from 'react';
import * as THREE from 'three';
import {useCinematicFrame} from './hooks/useCinematicFrame';
import {getHelixPoint} from './utils/tunnel';

type WordParticleProps = {
  word: string;
  index: number;
  phase?: number;
};

const cyan = new THREE.Color('#66e8ff');
const white = new THREE.Color('#f5fbff');
const blue = new THREE.Color('#0d6cff');

export const WordParticle = memo(({word, index, phase = 0}: WordParticleProps) => {
  const {frame, intro} = useCinematicFrame();
  const point = useMemo(() => getHelixPoint(index, frame, phase), [frame, index, phase]);
  const color = useMemo(() => cyan.clone().lerp(index % 4 === 0 ? white : blue, 0.18), [index]);
  const rotation: [number, number, number] = [
    Math.sin(frame * 0.012 + index) * 0.18,
    -point.angle + Math.PI / 2 + Math.sin(frame * 0.008 + index) * 0.08,
    Math.cos(frame * 0.01 + index) * 0.12,
  ];

  return (
    <group position={point.position} rotation={rotation} scale={point.scale * intro}>
      <Text
        anchorX="center"
        anchorY="middle"
        fontSize={word.length > 18 ? 0.44 : 0.52}
        letterSpacing={0.025}
        outlineWidth={0.018}
        outlineColor="#aef7ff"
        fillOpacity={point.opacity}
        color={color}
        material-toneMapped={false}
      >
        {word}
      </Text>
      <Text
        anchorX="center"
        anchorY="middle"
        fontSize={word.length > 18 ? 0.47 : 0.56}
        letterSpacing={0.025}
        fillOpacity={point.opacity * 0.18}
        color="#3adfff"
        material-transparent
        material-depthWrite={false}
        material-toneMapped={false}
        position={[0, 0, -0.015]}
        scale={[1.045, 1.045, 1]}
      >
        {word}
      </Text>
    </group>
  );
});

WordParticle.displayName = 'WordParticle';
