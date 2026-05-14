import React from 'react';
import {Bloom, ChromaticAberration, DepthOfField, EffectComposer, Noise, Vignette} from '@react-three/postprocessing';
import {BlendFunction} from 'postprocessing';
import {Vector2} from 'three';

export const Effects: React.FC = () => {
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom intensity={0.42} luminanceThreshold={0.2} luminanceSmoothing={0.78} mipmapBlur />
      <DepthOfField focusDistance={0.024} focalLength={0.038} bokehScale={0.9} height={720} />
      <ChromaticAberration offset={new Vector2(0.00032, 0.00024)} radialModulation={false} modulationOffset={0} blendFunction={BlendFunction.NORMAL} />
      <Noise opacity={0.026} blendFunction={BlendFunction.SOFT_LIGHT} />
      <Vignette eskil={false} offset={0.18} darkness={0.72} blendFunction={BlendFunction.NORMAL} />
    </EffectComposer>
  );
};
