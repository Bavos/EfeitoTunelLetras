import {Canvas} from '@react-three/fiber';
import {Text, Stars} from '@react-three/drei';
import {Suspense, useMemo} from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {AdditiveBlending, BackSide, Color, CylinderGeometry, InstancedMesh, Matrix4, MeshBasicMaterial, ShaderMaterial, Vector3} from 'three';
import {CameraRig} from './CameraRig';
import {Effects} from './Effects';
import {Lighting} from './Lighting';
import {WordParticle} from './WordParticle';
import {useTimeline} from './hooks/useTimeline';
import {holographicFragmentShader, holographicVertexShader} from './shaders/atmosphere';
import {COLORS, DURATION_IN_FRAMES, FPS, PRIMARY_TITLE, TECHNOLOGY_WORDS, TUNNEL_SETTINGS} from './utils/constants';
import {pingPong} from './utils/math';

export type TunnelSceneProps = {
  audioTrack?: string | null;
};

const HolographicParticles = ({frame}: {frame: number}) => {
  const particleCount = 360;

  const mesh = useMemo(() => {
    const geometry = new CylinderGeometry(0.011, 0.011, 0.026, 6);
    const material = new MeshBasicMaterial({
      color: new Color(COLORS.cyan),
      transparent: true,
      opacity: 0.36,
      blending: AdditiveBlending,
      depthWrite: false,
    });

    const instanced = new InstancedMesh(geometry, material, particleCount);
    const matrix = new Matrix4();
    const position = new Vector3();

    for (let index = 0; index < particleCount; index += 1) {
      const angle = index * 2.399963229728653;
      const radius = 1.8 + (index % 47) * 0.082;
      const z = -2 - (index % 120) * 0.31;
      position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 1.32, z);
      matrix.makeTranslation(position.x, position.y, position.z);
      instanced.setMatrixAt(index, matrix);
    }

    instanced.instanceMatrix.needsUpdate = true;
    return instanced;
  }, []);

  mesh.rotation.z = frame * 0.0009;
  mesh.rotation.y = Math.sin(frame * 0.006) * 0.045;

  return <primitive object={mesh} />;
};

const AtmosphereShell = ({frame}: {frame: number}) => {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: holographicVertexShader,
        fragmentShader: holographicFragmentShader,
        uniforms: {
          uTime: {value: 0},
          uColor: {value: new Color(COLORS.cyan)},
        },
        transparent: true,
        blending: AdditiveBlending,
        depthWrite: false,
        side: BackSide,
      }),
    [],
  );

  material.uniforms.uTime.value = frame / FPS;

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -16]} material={material}>
      <cylinderGeometry args={[6.4, 2.4, 42, 96, 1, true]} />
    </mesh>
  );
};

const CentralTitle = ({frame}: {frame: number}) => {
  const t = frame / FPS;
  const pulse = 0.86 + pingPong(t * 0.22) * 0.2;

  return (
    <group position={[0, 0, TUNNEL_SETTINGS.titleDepth + Math.sin(t * 0.28) * 0.26]} rotation={[0, Math.sin(t * 0.2) * 0.08, 0]}>
      <Text fontSize={0.92} anchorX="center" anchorY="middle" letterSpacing={0.018} maxWidth={7}>
        {PRIMARY_TITLE}
        <meshStandardMaterial
          color="#f7fcff"
          emissive="#5de9ff"
          emissiveIntensity={2.8 * pulse}
          roughness={0.18}
          metalness={0.08}
          transparent
          opacity={0.96}
        />
      </Text>
      <Text position={[0, -0.74, -0.05]} fontSize={0.19} anchorX="center" anchorY="middle" letterSpacing={0.14} maxWidth={6}>
        CLOUD • AI • SECURITY • DATA
        <meshBasicMaterial color="#9ff5ff" transparent opacity={0.72} blending={AdditiveBlending} depthWrite={false} />
      </Text>
    </group>
  );
};

const SceneContent = () => {
  const {frame, dolly, progress} = useTimeline();

  const wordMap = useMemo(() => {
    return Array.from({length: TUNNEL_SETTINGS.rings * TUNNEL_SETTINGS.wordsPerRing}, (_, index) => ({
      ringIndex: Math.floor(index / TUNNEL_SETTINGS.wordsPerRing),
      wordIndex: index % TECHNOLOGY_WORDS.length,
      key: `word-${index}`,
    }));
  }, []);

  return (
    <>
      <Lighting />
      <CameraRig />
      <Stars radius={46} depth={28} count={760} factor={1.6} saturation={0} fade speed={0.16} />
      <AtmosphereShell frame={frame} />
      <HolographicParticles frame={frame} />

      <group position={[0, 0, -dolly * TUNNEL_SETTINGS.travelSpeed]} rotation={[0, 0, progress * Math.PI * 0.1]}>
        {wordMap.map(({key, ringIndex, wordIndex}) => (
          <WordParticle key={key} ringIndex={ringIndex} wordIndex={wordIndex} frame={frame} cameraProgress={dolly} />
        ))}
      </group>

      <CentralTitle frame={frame} />
      <Effects />
    </>
  );
};

export const TunnelScene = ({audioTrack = null}: TunnelSceneProps) => {
  return (
    <AbsoluteFill style={{backgroundColor: COLORS.background}}>
      {audioTrack ? <Audio src={staticFile(audioTrack)} volume={(frame: number) => (frame < DURATION_IN_FRAMES - 18 ? 0.62 : 0.62 * (1 - (frame - (DURATION_IN_FRAMES - 18)) / 18))} /> : null}
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        camera={{position: [0, 0, 6.3], fov: 24, near: 0.1, far: 90}}
        dpr={[1, 1.5]}
        linear={false}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 50% 46%, rgba(80,230,255,0.08) 0%, rgba(2,6,18,0.08) 34%, rgba(2,6,18,0.5) 100%)',
          mixBlendMode: 'screen',
        }}
      />
    </AbsoluteFill>
  );
};
