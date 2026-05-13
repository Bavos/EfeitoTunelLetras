import {useMemo} from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {easeInOutCubic} from '../utils/math';

export const useTimeline = () => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();

  return useMemo(() => {
    const progress = frame / Math.max(durationInFrames - 1, 1);
    const seconds = frame / fps;
    const dolly = interpolate(frame, [0, durationInFrames - 1], [0, 16], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    return {
      frame,
      fps,
      seconds,
      progress,
      easedProgress: easeInOutCubic(progress),
      dolly,
    };
  }, [durationInFrames, fps, frame]);
};
