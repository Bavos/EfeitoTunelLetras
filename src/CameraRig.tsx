import {useFrame, useThree} from '@react-three/fiber';
import {useCurrentFrame} from 'remotion';
import {Vector3} from 'three';
import {FPS} from './constants';

const lookAtTarget = new Vector3(0, 0, -22);

export const CameraRig = () => {
  const frame = useCurrentFrame();
  const {camera} = useThree();

  useFrame(() => {
    const time = frame / FPS;
    camera.position.x = Math.sin(time * 0.55) * 0.24 + Math.sin(time * 0.17) * 0.12;
    camera.position.y = Math.cos(time * 0.43) * 0.18 + Math.sin(time * 0.29) * 0.08;
    camera.position.z = 8.3 - time * 0.58;
    camera.rotation.z = Math.sin(time * 0.32) * 0.035;
    camera.lookAt(lookAtTarget.x + Math.sin(time * 0.24) * 0.22, lookAtTarget.y, lookAtTarget.z);
    camera.rotation.z += Math.sin(time * 0.32) * 0.035;
  });

  return null;
};
