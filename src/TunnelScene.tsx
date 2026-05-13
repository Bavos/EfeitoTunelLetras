import {Text} from '@react-three/drei';
import {ThreeCanvas} from '@remotion/three';
import {useMemo} from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {AdditiveBlending} from 'three';
import {CameraRig} from './CameraRig';
import {CENTRAL_TEXT, COLORS, FPS, HEIGHT, TECHNOLOGY_WORDS, WIDTH, WORD_RING_COUNT} from './constants';
import {CinematicOverlay, HolographicParticles, VolumetricHaze} from './Effects';
import {Lighting} from './Lighting';
import {WordParticle} from './WordParticle';

const CentralTitle = () => {
  const frame = useCurrentFrame();
  const intro = spring({frame, fps: FPS, config: {damping: 140, stiffness: 42, mass: 0.7}});
  const shimmer = interpolate(Math.sin(frame / 18), [-1, 1], [0.75, 1.25]);

  return (
    <group position={[0, 0, -9.4]} scale={1.85 + intro * 0.18} rotation={[0, Math.sin(frame / 95) * 0.08, Math.sin(frame / 120) * 0.025]}>
      <Text
        anchorX="center"
        anchorY="middle"
        fontSize={0.74}
        letterSpacing={0.035}
        outlineBlur={0.038}
        outlineColor={COLORS.cyan}
        outlineOpacity={0.34 * shimmer}
      >
        {CENTRAL_TEXT}
        <meshStandardMaterial
          color={COLORS.white}
          emissive={COLORS.cyan}
          emissiveIntensity={1.25 * shimmer}
          roughness={0.36}
          metalness={0.22}
          transparent
          opacity={0.92}
        />
      </Text>
      <mesh position={[0, -0.66, -0.02]} scale={[5.6, 0.035, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color={COLORS.cyan} transparent opacity={0.36} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
};

export const TunnelScene = () => {
  const {width, height} = useVideoConfig();
  const totalWords = TECHNOLOGY_WORDS.length * WORD_RING_COUNT;
  const wordIndexes = useMemo(() => Array.from({length: totalWords}, (_, index) => index), [totalWords]);

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.background}}>
      <ThreeCanvas
        width={width || WIDTH}
        height={height || HEIGHT}
        camera={{fov: 22, near: 0.1, far: 80, position: [0, 0, 8.3]}}
        gl={{antialias: true, alpha: false, powerPreference: 'high-performance'}}
      >
        <CameraRig />
        <Lighting />
        <VolumetricHaze />
        <HolographicParticles />
        <CentralTitle />
        {wordIndexes.map((index) => (
          <WordParticle key={index} index={index} />
        ))}
      </ThreeCanvas>
      <CinematicOverlay />
    </AbsoluteFill>
  );
};
