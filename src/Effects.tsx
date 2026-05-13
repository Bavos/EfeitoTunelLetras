import {Bloom, ChromaticAberration, DepthOfField, EffectComposer, Noise, Vignette} from '@react-three/postprocessing';
import {BlendFunction} from 'postprocessing';
import {Vector2} from 'three';

export const Effects = () => {
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <DepthOfField focusDistance={0.018} focalLength={0.076} bokehScale={5.8} height={960} />
      <Bloom luminanceThreshold={0.18} luminanceSmoothing={0.62} intensity={1.42} mipmapBlur />
      <ChromaticAberration offset={new Vector2(0.00055, 0.00038)} blendFunction={BlendFunction.NORMAL} />
      <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.085} />
      <Vignette eskil={false} offset={0.28} darkness={0.72} />
    </EffectComposer>
  );
};
