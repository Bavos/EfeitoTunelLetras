import React from 'react';
import {Color} from 'three';
import {CYAN, DEEP_BLUE, SOFT_CYAN} from './constants';

export const Lighting: React.FC = () => {
  return (
    <>
      <color attach="background" args={[DEEP_BLUE]} />
      <fog attach="fog" args={[new Color('#041129'), 8, 34]} />
      <ambientLight color="#5da6ff" intensity={0.55} />
      <pointLight position={[0, 0, -6]} color={CYAN} intensity={3.8} distance={18} decay={1.8} />
      <pointLight position={[-4.8, 3.8, -11]} color="#2c7fff" intensity={1.2} distance={22} decay={2} />
      <pointLight position={[4.2, -3.2, -15]} color={SOFT_CYAN} intensity={1.1} distance={24} decay={2} />
    </>
  );
};
