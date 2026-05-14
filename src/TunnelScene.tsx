import React from 'react';
import {ThreeCanvas} from '@remotion/three';
import {Text} from '@react-three/drei';
import {interpolate, useCurrentFrame} from 'remotion';
import {AdditiveBlending} from 'three';
import {CameraRig} from './CameraRig';
import {Effects} from './Effects';
import {FormingTitle} from './FormingTitle';
import {CYAN, DEEP_BLUE, HEIGHT, MID_BLUE, SECONDARY_WORDS, SOFT_CYAN, WIDTH} from './constants';
import {Lighting} from './Lighting';
import {WordParticle} from './WordParticle';
import {stableRandom} from './utils/tunnel';

const HolographicRings: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <group>
      {Array.from({length: 13}).map((_, index) => {
        const z = -4 - index * 2.15 + Math.sin(frame * 0.012 + index) * 0.25;
        const radius = 1.75 + index * 0.22 + Math.sin(frame * 0.018 + index * 0.7) * 0.08;
        const opacity = interpolate(index, [0, 12], [0.12, 0.035]);

        return (
          <mesh key={index} position={[0, 0, z]} rotation={[Math.PI / 2, 0, frame * 0.004 + index * 0.18]}>
            <torusGeometry args={[radius, 0.006, 8, 132]} />
            <meshBasicMaterial color={index % 3 === 0 ? SOFT_CYAN : CYAN} transparent opacity={opacity} depthWrite={false} blending={AdditiveBlending} />
          </mesh>
        );
      })}
    </group>
  );
};

const DataParticles: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={220}
          array={new Float32Array(
            Array.from({length: 220}).flatMap((_, index) => {
              const angle = index * 0.51 + frame * 0.018;
              const radius = 1.2 + stableRandom(index + 7) * 5.2;
              const z = ((stableRandom(index + 70) * 34 + frame * 0.11) % 34) - 31;
              return [Math.cos(angle) * radius, Math.sin(angle) * radius, z];
            }),
          )}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color={SOFT_CYAN} size={0.025} transparent opacity={0.58} depthWrite={false} blending={AdditiveBlending} />
    </points>
  );
};

const MicroLetters: React.FC = () => {
  const frame = useCurrentFrame();
  const glyphs = 'AI API DATA CLOUD ML GPU SQL IO'.split(' ');

  return (
    <group>
      {Array.from({length: 28}).map((_, index) => {
        const angle = index * 0.93 + frame * 0.021;
        const radius = 2.4 + stableRandom(index + 33) * 4.4;
        const z = ((stableRandom(index + 303) * 32 + frame * 0.09) % 32) - 29;
        const opacity = interpolate(z, [-29, -4], [0.12, 0.48], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <Text
            key={index}
            position={[Math.cos(angle) * radius, Math.sin(angle) * radius, z]}
            rotation={[0, 0, -angle]}
            anchorX="center"
            anchorY="middle"
            fontSize={0.09 + stableRandom(index + 2) * 0.06}
            color="#8ff8ff"
            fillOpacity={opacity}
          >
            {glyphs[index % glyphs.length]}
            <meshBasicMaterial color="#8ff8ff" transparent opacity={opacity} depthWrite={false} toneMapped={false} />
          </Text>
        );
      })}
    </group>
  );
};

export const TunnelScene: React.FC = () => {
  return (
    <div style={{width: '100%', height: '100%', background: `radial-gradient(circle at 50% 42%, ${MID_BLUE} 0%, ${DEEP_BLUE} 58%, #00040d 100%)`}}>
      <ThreeCanvas
        width={WIDTH}
        height={HEIGHT}
        linear
        camera={{position: [0, 0, 7.2], fov: 36, near: 0.1, far: 80}}
        gl={{antialias: true, alpha: false, powerPreference: 'high-performance'}}
      >
        <Lighting />
        <CameraRig />
        <HolographicRings />
        <DataParticles />
        <MicroLetters />
        {SECONDARY_WORDS.map((word, index) => (
          <WordParticle key={`${word}-${index}`} word={word} index={index} />
        ))}
        <FormingTitle />
        <Effects />
      </ThreeCanvas>
    </div>
  );
};
