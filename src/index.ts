import {createElement} from 'react';
import {Composition as RemotionComposition, registerRoot} from 'remotion';
import {Composition} from './Composition';
import {COMP_ID, DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH} from './constants';

const RemotionRoot = () =>
  createElement(RemotionComposition, {
    id: COMP_ID,
    component: Composition,
    durationInFrames: DURATION_IN_FRAMES,
    fps: FPS,
    width: WIDTH,
    height: HEIGHT,
  });

registerRoot(RemotionRoot);
