import React from 'react';
import {useThree} from '@react-three/fiber';
import {useCurrentFrame} from 'remotion';

export const CameraRig: React.FC = () => {
  const frame = useCurrentFrame();
  const {camera} = useThree();

  const dolly = Math.min(1.05, frame * 0.0038);
  const driftX = Math.sin(frame * 0.016) * 0.12 + Math.sin(frame * 0.004) * 0.05;
  const driftY = Math.cos(frame * 0.013) * 0.09;
  const roll = Math.sin(frame * 0.01) * 0.016;

  camera.position.set(driftX, driftY, 7.4 - dolly);
  camera.rotation.set(driftY * 0.014, -driftX * 0.014, roll);
  camera.lookAt(0, 0, -8.4);

  return null;
};
