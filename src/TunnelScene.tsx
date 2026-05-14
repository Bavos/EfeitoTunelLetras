import React from 'react';
import {ThreeCanvas} from '@remotion/three';
import {Text} from '@react-three/drei';
import {interpolate, useCurrentFrame} from 'remotion';
import {AdditiveBlending} from 'three';
import {CameraRig} from './CameraRig';
import {Effects} from './Effects';
import {FormingTitle} from './FormingTitle';
import {CYAN, DEEP_BLUE, HEIGHT, MID_BLUE, SECONDARY_WORDS, SOFT_CYAN, TITLE_END_FRAME, WIDTH} from './constants';
import {Lighting} from './Lighting';
import {WordParticle} from './WordParticle';
import {stableRandom} from './utils/tunnel';

const HolographicRings: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <group>
      {Array.from({length: 15}).map((_, index) => {
        const z = -4.2 - index * 2.05 + Math.sin(frame * 0.011 + index) * 0.22;
        const radius = 1.75 + index * 0.23 + Math.sin(frame * 0.016 + index * 0.7) * 0.075;
        const opacity = interpolate(index, [0, 14], [0.12, 0.03]);

        return (
          <mesh key={index} position={[0, 0, z]} rotation={[Math.PI / 2, 0, frame * 0.0035 + index * 0.18]}>
            <torusGeometry args={[radius, 0.006, 8, 144]} />
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
          count={260}
          array={new Float32Array(
            Array.from({length: 260}).flatMap((_, index) => {
              const angle = index * 0.51 + frame * 0.016;
              const radius = 1.1 + stableRandom(index + 7) * 5.6;
              const z = ((stableRandom(index + 70) * 36 + frame * 0.095) % 36) - 33;
              return [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.76, z];
            }),
          )}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color={SOFT_CYAN} size={0.024} transparent opacity={0.56} depthWrite={false} blending={AdditiveBlending} />
    </points>
  );
};

const MicroLetters: React.FC = () => {
  const frame = useCurrentFrame();
  const glyphs = 'AI API DATA CLOUD ML GPU SQL IO'.split(' ');
  const finalFade = interpolate(frame, [TITLE_END_FRAME - 20, TITLE_END_FRAME], [1, 0.32], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <group>
      {Array.from({length: 34}).map((_, index) => {
        const angle = index * 0.93 + frame * 0.018;
        const radius = 2.4 + stableRandom(index + 33) * 4.6;
        const z = ((stableRandom(index + 303) * 34 + frame * 0.08) % 34) - 31;
        const opacity = interpolate(z, [-31, -4], [0.1, 0.42], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }) * finalFade;

        return (
          <Text
            key={index}
            position={[Math.cos(angle) * radius, Math.sin(angle) * radius * 0.74, z]}
            rotation={[0, 0, -angle]}
            anchorX="center"
            anchorY="middle"
            fontSize={0.08 + stableRandom(index + 2) * 0.055}
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

const AtmosphericVeils: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <group>
      {Array.from({length: 6}).map((_, index) => {
        const z = -6 - index * 4.2;
        const pulse = 0.045 + Math.sin(frame * 0.018 + index) * 0.012;
        return (
          <mesh key={index} position={[0, 0, z]} rotation={[0, 0, frame * 0.002 + index * 0.6]}>
            <planeGeometry args={[8.6 + index * 0.8, 8.6 + index * 0.8]} />
            <meshBasicMaterial color={index % 2 === 0 ? '#0a66aa' : '#0e9fc3'} transparent opacity={pulse} depthWrite={false} blending={AdditiveBlending} />
          </mesh>
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
        camera={{position: [0, 0, 7.4], fov: 35, near: 0.1, far: 80}}
        gl={{antialias: true, alpha: false, powerPreference: 'high-performance'}}
      >
        <Lighting />
        <CameraRig />
        <AtmosphericVeils />
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
