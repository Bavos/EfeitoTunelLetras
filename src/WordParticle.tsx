import {Text} from '@react-three/drei';
import {memo, useMemo} from 'react';
import {AdditiveBlending, Color, Euler, Vector3} from 'three';
import {TECHNOLOGY_WORDS, TUNNEL_SETTINGS} from './utils/constants';

export type WordParticleProps = {
  ringIndex: number;
  wordIndex: number;
  frame: number;
  cameraProgress: number;
};

const tunnelDepth = TUNNEL_SETTINGS.rings * TUNNEL_SETTINGS.depthSpacing;

export const WordParticle = memo(({ringIndex, wordIndex, frame, cameraProgress}: WordParticleProps) => {
  const word = TECHNOLOGY_WORDS[wordIndex % TECHNOLOGY_WORDS.length];

  const layout = useMemo(() => {
    const baseAngle = (wordIndex / TUNNEL_SETTINGS.wordsPerRing) * Math.PI * 2;
    const stagger = ringIndex * TUNNEL_SETTINGS.spiralTwist;
    const radiusBias = 1 + Math.sin(ringIndex * 1.73 + wordIndex) * 0.055;
    const depth = -ringIndex * TUNNEL_SETTINGS.depthSpacing - 4;

    return {baseAngle, stagger, radiusBias, depth};
  }, [ringIndex, wordIndex]);

  const time = frame / 30;
  const movingDepth = ((((layout.depth + cameraProgress) % tunnelDepth) + tunnelDepth) % tunnelDepth) - tunnelDepth;
  const angle = layout.baseAngle + layout.stagger + time * 0.18 + Math.sin(time * 0.42 + ringIndex) * 0.035;
  const radius = TUNNEL_SETTINGS.radius * layout.radiusBias + Math.sin(time + ringIndex * 0.31) * 0.18;

  const position = new Vector3(
    Math.cos(angle) * radius,
    Math.sin(angle) * radius * 1.18,
    movingDepth,
  );

  const rotation = new Euler(
    Math.sin(time * 0.32 + wordIndex) * 0.08,
    -angle + Math.PI / 2 + Math.sin(time * 0.21 + ringIndex) * 0.12,
    Math.cos(time * 0.26 + ringIndex) * 0.1,
  );

  const nearCamera = Math.max(0, 1 - Math.abs(movingDepth + 2.4) / 8);
  const opacity = Math.min(0.92, 0.22 + nearCamera * 0.62 + ringIndex * 0.006);
  const size = word === 'Artificial Intelligence' || word === 'Machine Learning' ? 0.31 : 0.36;

  const ghostOffset = 0.34;
  const cyan = new Color('#38dcff');
  const white = new Color('#f1fbff');

  return (
    <group position={position} rotation={rotation}>
      {[2, 1].map((ghost) => (
        <Text
          key={ghost}
          position={[0, 0, ghost * ghostOffset]}
          fontSize={size}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.018}
          maxWidth={3.4}
        >
          {word}
          <meshBasicMaterial
            color={cyan}
            transparent
            opacity={opacity * (0.08 / ghost)}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </Text>
      ))}

      <Text
        fontSize={size}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.018}
        maxWidth={3.5}
      >
        {word}
        <meshStandardMaterial
          color={white}
          emissive={cyan}
          emissiveIntensity={1.9 + nearCamera * 1.6}
          transparent
          opacity={opacity}
          roughness={0.28}
          metalness={0.05}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </Text>
    </group>
  );
});

WordParticle.displayName = 'WordParticle';
