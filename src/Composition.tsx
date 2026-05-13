import {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, cancelRender, continueRender, delayRender, staticFile} from 'remotion';
import {TunnelScene} from './TunnelScene';

const OptionalAudio = () => {
  const src = staticFile('audio/ambient-tech.mp3');
  const [available, setAvailable] = useState(false);
  const [handle] = useState(() => delayRender('Checking optional ambient-tech.mp3 audio'));

  useEffect(() => {
    let active = true;

    fetch(src, {method: 'HEAD'})
      .then((response) => {
        if (active) {
          setAvailable(response.ok);
        }
      })
      .catch(() => {
        if (active) {
          setAvailable(false);
        }
      })
      .then(() => continueRender(handle))
      .catch((error: unknown) => cancelRender(error));

    return () => {
      active = false;
    };
  }, [handle, src]);

  if (!available) {
    return null;
  }

  return <Audio src={src} volume={0.42} />;
};

export const Composition = () => {
  return (
    <AbsoluteFill>
      <TunnelScene />
      <OptionalAudio />
    </AbsoluteFill>
  );
};
