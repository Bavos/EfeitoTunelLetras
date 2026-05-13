import {useFrame, useThree} from '@react-three/fiber';
import {useMemo} from 'react';
import * as THREE from 'three';
import {useCinematicFrame} from './hooks/useCinematicFrame';

export const CameraRig = () => {
  const {camera} = useThree();
  const {frame, progress} = useCinematicFrame();
  const lookAt = useMemo(() => new THREE.Vector3(0, 0, 36), []);

  useFrame(() => {
    const driftX = Math.sin(frame * 0.018) * 0.22 + Math.sin(frame * 0.006) * 0.14;
    const driftY = Math.cos(frame * 0.014) * 0.18;
    const dolly = progress * 10.5;
    camera.position.set(driftX, driftY, -8 + dolly);
    camera.rotation.z = Math.sin(frame * 0.006) * 0.025;
    camera.lookAt(lookAt.x + driftX * 0.18, lookAt.y + driftY * 0.12, lookAt.z + dolly * 0.22);
  });

  return null;
};
