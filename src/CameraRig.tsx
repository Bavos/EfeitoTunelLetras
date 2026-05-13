import {useFrame, useThree} from '@react-three/fiber';
import {useMemo} from 'react';
import {Vector3} from 'three';
import {useTimeline} from './hooks/useTimeline';

export const CameraRig = () => {
  const {camera} = useThree();
  const {seconds, progress} = useTimeline();

  const lookAt = useMemo(() => new Vector3(0, 0, -16), []);

  useFrame(() => {
    const driftX = Math.sin(seconds * 0.58) * 0.18 + Math.sin(seconds * 1.17) * 0.045;
    const driftY = Math.cos(seconds * 0.51) * 0.14 + Math.sin(seconds * 0.83) * 0.035;
    const dollyZ = 6.3 - progress * 3.2;

    camera.position.set(driftX, driftY, dollyZ);
    lookAt.set(Math.sin(seconds * 0.3) * 0.32, Math.cos(seconds * 0.27) * 0.2, -18 - progress * 4);
    camera.lookAt(lookAt);
    camera.rotation.z += Math.sin(seconds * 0.42) * 0.018;
  });

  return null;
};
