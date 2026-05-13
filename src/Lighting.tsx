import {COLORS, KEY_LIGHT_POSITION, RIM_LIGHT_POSITION} from './constants';

export const Lighting = () => {
  return (
    <>
      <color attach="background" args={[COLORS.background]} />
      <fog attach="fog" args={[COLORS.fog, 9, 48]} />
      <ambientLight color={COLORS.deepBlue} intensity={0.85} />
      <directionalLight color={COLORS.white} intensity={1.45} position={KEY_LIGHT_POSITION} />
      <pointLight color={COLORS.cyan} intensity={42} distance={28} position={[0, 0, 2]} />
      <pointLight color={COLORS.cyanSoft} intensity={14} distance={36} position={RIM_LIGHT_POSITION} />
      <spotLight color={COLORS.white} intensity={8} angle={0.34} penumbra={0.82} position={[0, 5.5, 9]} />
    </>
  );
};
