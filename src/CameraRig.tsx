import {useFrame, useThree} from '@react-three/fiber';
import {useCurrentFrame} from 'remotion';

export const CameraRig: React.FC = () => {
  const frame = useCurrentFrame();
  const {camera} = useThree();

  useFrame(() => {
    const dolly = Math.min(1.2, frame * 0.0048);
    const driftX = Math.sin(frame * 0.018) * 0.12;
    const driftY = Math.cos(frame * 0.014) * 0.1;
    const roll = Math.sin(frame * 0.012) * 0.018;

    camera.position.set(driftX, driftY, 7.2 - dolly);
    camera.rotation.set(driftY * 0.018, -driftX * 0.018, roll);
    camera.lookAt(0, 0, -8);
  });

  return null;
};
