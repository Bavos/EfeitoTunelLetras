import React from 'react';
import {Bloom, ChromaticAberration, DepthOfField, EffectComposer, Noise} from '@react-three/postprocessing';
import {BlendFunction} from 'postprocessing';
import {Vector2} from 'three';

export const Effects: React.FC = () => {
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom intensity={0.48} luminanceThreshold={0.18} luminanceSmoothing={0.72} mipmapBlur />
      <DepthOfField focusDistance={0.022} focalLength={0.036} bokehScale={1.15} height={720} />
      <ChromaticAberration offset={new Vector2(0.00045, 0.00035)} radialModulation={false} modulationOffset={0} blendFunction={BlendFunction.NORMAL} />
      <Noise opacity={0.035} blendFunction={BlendFunction.SOFT_LIGHT} />
    </EffectComposer>
  );
};
