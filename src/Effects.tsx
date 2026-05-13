import {useMemo} from 'react';
import {useCurrentFrame} from 'remotion';
import {AdditiveBlending, BufferAttribute, BufferGeometry, Color, ShaderMaterial} from 'three';
import {COLORS, FPS} from './constants';
import {getParticleState} from './utils/tunnel';

export const HolographicParticles = () => {
  const frame = useCurrentFrame();
  const particleCount = 360;
  const geometry = useMemo(() => new BufferGeometry(), []);
  const positions = useMemo(() => new Float32Array(particleCount * 3), []);
  const colors = useMemo(() => new Float32Array(particleCount * 3), []);
  const sizes = useMemo(() => new Float32Array(particleCount), []);
  const cyan = useMemo(() => new Color(COLORS.cyan), []);
  const white = useMemo(() => new Color(COLORS.white), []);

  for (let index = 0; index < particleCount; index++) {
    const state = getParticleState(index, frame);
    const color = cyan.clone().lerp(white, state.opacity * 0.45);
    positions[index * 3] = state.position[0];
    positions[index * 3 + 1] = state.position[1];
    positions[index * 3 + 2] = state.position[2];
    colors[index * 3] = color.r;
    colors[index * 3 + 1] = color.g;
    colors[index * 3 + 2] = color.b;
    sizes[index] = state.size * (1 + state.opacity * 4);
  }

  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('color', new BufferAttribute(colors, 3));
  geometry.setAttribute('size', new BufferAttribute(sizes, 1));

  return (
    <points geometry={geometry}>
      <pointsMaterial vertexColors color={COLORS.cyan} size={0.045} transparent opacity={0.62} blending={AdditiveBlending} depthWrite={false} />
    </points>
  );
};

export const VolumetricHaze = () => {
  const frame = useCurrentFrame();
  const time = frame / FPS;
  const material = useMemo(
    () =>
      new ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: {
          uTime: {value: 0},
          uColor: {value: new Color(COLORS.cyan)},
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uColor;
          varying vec2 vUv;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
          }

          void main() {
            vec2 center = vUv - vec2(0.5);
            float radial = 1.0 - smoothstep(0.05, 0.72, length(center));
            float scan = sin((vUv.y + uTime * 0.025) * 44.0) * 0.5 + 0.5;
            float noise = hash(vUv * 180.0 + uTime * 0.08) * 0.045;
            float alpha = radial * (0.075 + scan * 0.025) + noise;
            gl_FragColor = vec4(uColor, alpha);
          }
        `,
      }),
    [],
  );

  material.uniforms.uTime.value = time;

  return (
    <mesh position={[0, 0, -18]} scale={[18, 32, 1]} material={material}>
      <planeGeometry args={[1, 1, 1, 1]} />
    </mesh>
  );
};

export const CinematicOverlay = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background:
          'radial-gradient(circle at 50% 46%, rgba(115,223,247,0.12) 0%, rgba(6,22,38,0.12) 32%, rgba(1,8,15,0.92) 100%), linear-gradient(90deg, rgba(255,255,255,0.018), rgba(116,223,247,0.015), rgba(255,255,255,0.018))',
        mixBlendMode: 'screen',
      }}
    />
  );
};
