import React from 'react';
import {Audio, Composition, getStaticFiles, staticFile} from 'remotion';
import {COMP_ID, DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH} from './constants';
import {TunnelScene} from './TunnelScene';

const OptionalAudio: React.FC = () => {
  const ambientAudio = getStaticFiles().find(
    (file) => file.src === '/audio/ambient-tech.mp3' || file.src.endsWith('/audio/ambient-tech.mp3'),
  );

  if (!ambientAudio) {
    return null;
  }

  return <Audio src={staticFile('audio/ambient-tech.mp3')} volume={0.45} />;
};

const IamazingComposition: React.FC = () => {
  return (
    <>
      <TunnelScene />
      <OptionalAudio />
    </>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id={COMP_ID}
      component={IamazingComposition}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
