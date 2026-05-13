export const holographicVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

export const holographicFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  varying vec3 vWorldPosition;

  float scanline(vec2 uv) {
    return 0.72 + 0.28 * sin((uv.y + uTime * 0.22) * 120.0);
  }

  void main() {
    float radial = smoothstep(0.72, 0.05, distance(vUv, vec2(0.5)));
    float shimmer = 0.78 + 0.22 * sin(uTime * 2.5 + vWorldPosition.z * 0.24);
    gl_FragColor = vec4(uColor * scanline(vUv) * shimmer, radial * 0.34);
  }
`;
