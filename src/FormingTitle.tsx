import {Text} from '@react-three/drei';
import {interpolate, useCurrentFrame} from 'remotion';
import {AdditiveBlending, Color} from 'three';
import {COLORS} from './constants';

const TITLE = 'Iamazing School';
const startFrame = 80;
const endFrame = 190;
const titleCharacters = TITLE.split('');
const cyan = new Color(COLORS.cyan);
const white = new Color(COLORS.white);

const easeInOutCubic = (value: number) => (value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2);

const getFinalX = (index: number) => {
  const totalWidth = titleCharacters.reduce((width, character) => width + (character === ' ' ? 0.34 : 0.42), 0);
  const leftEdge = -totalWidth / 2;
  const previousWidth = titleCharacters.slice(0, index).reduce((width, character) => width + (character === ' ' ? 0.34 : 0.42), 0);
  const currentWidth = titleCharacters[index] === ' ' ? 0.34 : 0.42;

  return leftEdge + previousWidth + currentWidth / 2;
};

const getInitialPosition = (index: number): [number, number, number] => {
  const angle = index * 1.37 + Math.sin(index * 0.61) * 0.45;
  const radius = 3.15 + (index % 5) * 0.36;
  const depth = 8.5 + (index % 7) * 3.7;

  return [Math.cos(angle) * radius, Math.sin(angle) * radius * 1.42, -depth];
};

const lerp = (from: number, to: number, progress: number) => from + (to - from) * progress;

export const FormingTitle = () => {
  const frame = useCurrentFrame();
  const rawProgress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const progress = easeInOutCubic(rawProgress);
  const breathing = frame >= endFrame ? Math.sin((frame - endFrame) / 18) * 0.035 : 0;
  const shimmer = interpolate(Math.sin(frame / 16), [-1, 1], [0.82, 1.18]);
  const groupScale = 1.46 + progress * 0.16 + breathing;

  return (
    <group position={[0, 0, -8.85]} scale={groupScale} rotation={[0, Math.sin(frame / 110) * 0.025 * (1 - progress), Math.sin(frame / 128) * 0.018]}>
      {titleCharacters.map((character, index) => {
        const [startX, startY, startZ] = getInitialPosition(index);
        const finalX = getFinalX(index);
        const finalY = 0;
        const finalZ = 0;
        const x = lerp(startX, finalX, progress);
        const y = lerp(startY, finalY, progress);
        const z = lerp(startZ, finalZ, progress);
        const startRotationY = Math.sin(index * 1.11) * 1.15;
        const startRotationZ = Math.cos(index * 0.83) * 0.72;
        const opacity = interpolate(frame, [0, startFrame, endFrame], [0.38, 0.58, 0.96], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const glow = interpolate(progress, [0, 1], [0.55, 1.65]);

        if (character === ' ') {
          return null;
        }

        return (
          <group
            key={`${character}-${index}`}
            position={[x, y, z]}
            rotation={[Math.sin(frame / 34 + index) * 0.05 * (1 - progress), lerp(startRotationY, 0, progress), lerp(startRotationZ, 0, progress)]}
          >
            <Text
              anchorX="center"
              anchorY="middle"
              fontSize={0.62}
              letterSpacing={0}
              outlineBlur={0.026 + glow * 0.008}
              outlineColor={COLORS.cyan}
              outlineOpacity={0.34 + progress * 0.24}
            >
              {character}
              <meshStandardMaterial
                color={white.clone().lerp(cyan, 0.22)}
                emissive={cyan}
                emissiveIntensity={(1.35 + glow) * shimmer}
                roughness={0.34}
                metalness={0.18}
                transparent
                opacity={opacity}
                depthWrite={false}
              />
            </Text>
            <mesh position={[0, 0, -0.035]} scale={[0.62 + progress * 0.16, 0.82 + progress * 0.08, 1]}>
              <planeGeometry args={[1, 1]} />
              <meshBasicMaterial color={COLORS.cyan} transparent opacity={(0.055 + progress * 0.06) * shimmer} blending={AdditiveBlending} depthWrite={false} />
            </mesh>
          </group>
        );
      })}
      <mesh position={[0, -0.56, -0.04]} scale={[4.95, 0.028, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color={COLORS.cyan} transparent opacity={progress * 0.34 * shimmer} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
};
