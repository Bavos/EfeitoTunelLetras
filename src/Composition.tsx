import React from 'react';
import {Composition} from 'remotion';
import {CinematicScene} from './CinematicScene';
import {COMP_ID, DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH} from './constants';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id={COMP_ID}
      component={CinematicScene}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
