import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const useCinematicFrame = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const intro = spring({frame, fps, config: {damping: 120, mass: 1.2, stiffness: 70}});
  const progress = frame / Math.max(1, durationInFrames - 1);

  return {frame, fps, intro, progress};
};
