export const Lighting = () => {
  return (
    <>
      <color attach="background" args={["#020814"]} />
      <fog attach="fog" args={["#05152d", 14, 82]} />
      <ambientLight intensity={0.22} color="#2dbfff" />
      <pointLight position={[0, 0, -3]} intensity={18} color="#dffbff" distance={26} decay={2} />
      <pointLight position={[-5, 6, 16]} intensity={32} color="#1ccfff" distance={55} decay={2} />
      <pointLight position={[7, -4, 36]} intensity={18} color="#2d67ff" distance={68} decay={2} />
      <spotLight position={[0, 0, -10]} angle={0.42} penumbra={0.9} intensity={24} color="#9ff7ff" distance={90} />
    </>
  );
};
