import {COLORS} from './utils/constants';

export const Lighting = () => {
  return (
    <>
      <color attach="background" args={[COLORS.background]} />
      <fog attach="fog" args={[COLORS.navyFog, 8, 42]} />
      <ambientLight color="#113b72" intensity={0.45} />
      <directionalLight color="#eaf9ff" intensity={1.4} position={[3.2, 4.5, 8]} />
      <pointLight color="#32dfff" intensity={58} distance={34} decay={2} position={[0, 0, 2]} />
      <pointLight color="#74f4ff" intensity={24} distance={28} decay={2} position={[-4, 6, -11]} />
      <spotLight
        color="#dffaff"
        intensity={4.5}
        angle={0.38}
        penumbra={0.86}
        distance={44}
        position={[0, 0.4, 7]}
      />
    </>
  );
};
