import {Float, Sparkles, Stars, Text} from '@react-three/drei';
import {ThreeCanvas} from '@remotion/three';
import {useMemo} from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import * as THREE from 'three';
import {CameraRig} from './CameraRig';
import {Effects} from './Effects';
import {Lighting} from './Lighting';
import {WordParticle} from './WordParticle';
import {CENTRAL_TITLE, TECHNOLOGY_WORDS} from './utils/words';

type TunnelSceneProps = {
  audioSrc?: string;
};

const WORD_COUNT = 138;

const CentralTitle = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [18, 58, 210, 238], [0, 1, 1, 0.88], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const z = interpolate(frame, [0, 239], [20, 11], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.18}>
      <group position={[0, 0, z]} rotation={[0, Math.sin(frame * 0.008) * 0.05, Math.sin(frame * 0.006) * 0.018]}>
        <mesh position={[0, -0.03, -0.08]}>
          <planeGeometry args={[6.9, 1.55]} />
          <meshBasicMaterial color="#042a45" transparent opacity={0.26 * opacity} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
        <Text
          anchorX="center"
          anchorY="middle"
          fontSize={0.98}
          letterSpacing={0.035}
          outlineWidth={0.028}
          outlineColor="#c8fbff"
          fillOpacity={opacity}
          color="#f4fbff"
          material-toneMapped={false}
        >
          {CENTRAL_TITLE}
        </Text>
        <Text
          anchorX="center"
          anchorY="middle"
          fontSize={1.08}
          letterSpacing={0.035}
          fillOpacity={opacity * 0.22}
          color="#40e8ff"
          material-transparent
          material-depthWrite={false}
          material-toneMapped={false}
          position={[0, 0, -0.05]}
          scale={[1.045, 1.045, 1]}
        >
          {CENTRAL_TITLE}
        </Text>
      </group>
    </Float>
  );
};

export const TunnelScene = ({audioSrc}: TunnelSceneProps) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const words = useMemo(
    () =>
      Array.from({length: WORD_COUNT}, (_, index) => ({
        word: TECHNOLOGY_WORDS[index % TECHNOLOGY_WORDS.length],
        index,
        phase: (index % TECHNOLOGY_WORDS.length) * 0.21,
      })),
    [],
  );
  const defaultAudio = audioSrc ?? staticFile('audio/corporate-ambient.wav');
  const audioVolume = interpolate(frame, [0, 24, durationInFrames - 28, durationInFrames - 1], [0, 0.42, 0.42, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at center, #06152b 0%, #020814 58%, #00030a 100%)'}}>
      <ThreeCanvas
        width={1080}
        height={1920}
        camera={{fov: 28, near: 0.1, far: 140, position: [0, 0, -8]}}
        gl={{antialias: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace}}
        linear={false}
      >
        <CameraRig />
        <Lighting />
        <Stars radius={64} depth={34} count={520} factor={1.8} saturation={0} fade speed={0.18} />
        <Sparkles count={260} scale={[11, 14, 78]} size={1.3} speed={0.28} color="#91f4ff" opacity={0.42} position={[0, 0, 34]} />
        <group>
          {words.map((item) => (
            <WordParticle key={`${item.word}-${item.index}`} word={item.word} index={item.index} phase={item.phase} />
          ))}
        </group>
        <CentralTitle />
        <Effects />
      </ThreeCanvas>
      <Audio src={defaultAudio} volume={audioVolume} startFrom={0} endAt={durationInFrames} />
    </AbsoluteFill>
  );
};
