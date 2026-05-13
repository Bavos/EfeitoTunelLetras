import {Text} from '@react-three/drei';
import {useCurrentFrame} from 'remotion';
import {AdditiveBlending, BackSide, Color} from 'three';
import {COLORS} from './constants';
import {getWordState} from './utils/tunnel';

type WordParticleProps = {
  index: number;
};

const cyan = new Color(COLORS.cyan);
const white = new Color(COLORS.white);

export const WordParticle = ({index}: WordParticleProps) => {
  const frame = useCurrentFrame();
  const state = getWordState(index, frame);
  const [x, y, z] = state.position;
  const [rx, ry, rz] = state.rotation;
  const trailCount = state.speedAlpha > 0.45 ? 3 : 2;

  return (
    <group position={[x, y, z]} rotation={[rx, ry, rz]} scale={state.scale}>
      {Array.from({length: trailCount}).map((_, trailIndex) => {
        const offset = (trailIndex + 1) * 0.055 * (1 + state.speedAlpha);
        const trailOpacity = state.opacity * (0.15 / (trailIndex + 1)) * (1 + state.speedAlpha * 0.8);

        return (
          <Text
            key={`trail-${trailIndex}`}
            anchorX="center"
            anchorY="middle"
            fontSize={0.62 + state.blur * 0.05 + trailIndex * 0.018}
            letterSpacing={0.028}
            outlineBlur={0.018 + state.blur * 0.024}
            outlineColor={COLORS.cyan}
            outlineOpacity={trailOpacity}
            position={[-offset, offset * 0.2, 0.012 * (trailIndex + 1)]}
          >
            {state.text}
            <meshBasicMaterial color={cyan} transparent opacity={trailOpacity} depthWrite={false} blending={AdditiveBlending} />
          </Text>
        );
      })}

      <Text
        anchorX="center"
        anchorY="middle"
        fontSize={0.62}
        letterSpacing={0.026}
        outlineBlur={0.026 + state.blur * 0.018}
        outlineColor={COLORS.cyanSoft}
        outlineOpacity={state.opacity * state.glow * 0.38}
      >
        {state.text}
        <meshStandardMaterial
          color={white.clone().lerp(cyan, 0.32)}
          emissive={cyan}
          emissiveIntensity={0.95 + state.glow * 1.9}
          roughness={0.42}
          metalness={0.18}
          transparent
          opacity={state.opacity}
          depthWrite={false}
        />
      </Text>

      <mesh scale={[1.08 + state.blur * 0.12, 0.28 + state.blur * 0.05, 1]} position={[0, 0, -0.015]}>
        <planeGeometry args={[state.text.length * 0.43, 0.92]} />
        <meshBasicMaterial color={COLORS.cyan} transparent opacity={state.opacity * state.glow * 0.055} blending={AdditiveBlending} side={BackSide} depthWrite={false} />
      </mesh>
    </group>
  );
};
