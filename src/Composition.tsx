import {Composition} from 'remotion';
import {TunnelScene} from './TunnelScene';

export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const VIDEO_FPS = 30;
export const VIDEO_DURATION_IN_FRAMES = 240;

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="TechWordTunnel"
        component={TunnelScene}
        durationInFrames={VIDEO_DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{}}
      />
    </>
  );
};
