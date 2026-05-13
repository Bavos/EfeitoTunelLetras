import {ThreeCanvas} from '@remotion/three';
import {useMemo} from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {CameraRig} from './CameraRig';
import {COLORS, HEIGHT, TECHNOLOGY_WORDS, WIDTH, WORD_RING_COUNT} from './constants';
import {CinematicOverlay, HolographicParticles, VolumetricHaze} from './Effects';
import {FormingTitle} from './FormingTitle';
import {Lighting} from './Lighting';
import {WordParticle} from './WordParticle';

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
        {wordIndexes.map((index) => (
          <WordParticle key={index} index={index} />
        ))}
        <FormingTitle />
      </ThreeCanvas>
      <CinematicOverlay />
    </AbsoluteFill>
  );
};
