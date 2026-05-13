import {EffectComposer, Bloom, ChromaticAberration, DepthOfField, Noise, Vignette} from '@react-three/postprocessing';
import {BlendFunction} from 'postprocessing';
import {useMemo} from 'react';
import * as THREE from 'three';
import {useCinematicFrame} from './hooks/useCinematicFrame';
import {radialMistFragmentShader, radialMistVertexShader} from './shaders/atmosphere';

export const AtmosphericOverlay = () => {
  const {frame} = useCinematicFrame();
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: radialMistVertexShader,
        fragmentShader: radialMistFragmentShader,
        uniforms: {
          uFrame: {value: 0},
          uIntensity: {value: 1},
        },
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  material.uniforms.uFrame.value = frame;

  return (
    <mesh renderOrder={999} material={material} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
};

export const MotionBlurStreaks = () => {
  const {frame} = useCinematicFrame();
  const streaks = useMemo(
    () =>
      Array.from({length: 34}, (_, index) => ({
        angle: index * 0.73,
        z: 3 + index * 2.1,
        length: 1.2 + (index % 5) * 0.38,
      })),
    [],
  );

  return (
    <group>
      {streaks.map((streak, index) => {
        const pulse = Math.sin(frame * 0.03 + index) * 0.5 + 0.5;
        const radius = 4.8 + Math.sin(frame * 0.01 + index) * 0.4;
        const angle = streak.angle + frame * 0.012;
        return (
          <mesh
            key={index}
            position={[Math.cos(angle) * radius, Math.sin(angle) * radius * 1.2, streak.z]}
            rotation={[0, 0, angle]}
          >
            <planeGeometry args={[0.018, streak.length]} />
            <meshBasicMaterial color="#8df5ff" transparent opacity={0.09 + pulse * 0.08} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
          </mesh>
        );
      })}
    </group>
  );
};

export const Effects = () => {
  return (
    <>
      <MotionBlurStreaks />
      <AtmosphericOverlay />
      <EffectComposer multisampling={0} enableNormalPass>
        <DepthOfField focusDistance={0.28} focalLength={0.095} bokehScale={7.5} height={720} />
        <Bloom luminanceThreshold={0.12} luminanceSmoothing={0.72} intensity={1.65} mipmapBlur radius={0.82} />
        <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0009, 0.00135]} radialModulation modulationOffset={0.15} />
        <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.085} />
        <Vignette eskil={false} offset={0.22} darkness={0.82} />
      </EffectComposer>
    </>
  );
};
