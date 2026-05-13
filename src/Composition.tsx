import {Composition as RemotionComposition} from 'remotion';
import {TunnelScene, type TunnelSceneProps} from './TunnelScene';
import {DURATION_IN_FRAMES, FPS, VIDEO_HEIGHT, VIDEO_WIDTH} from './utils/constants';

export const Composition = () => {
  return (
    <RemotionComposition<TunnelSceneProps>
      id="IamazingTunnel"
      component={TunnelScene}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
      defaultProps={{
        audioTrack: null,
      }}
    />
  );
};
