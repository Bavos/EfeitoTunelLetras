export const radialMistVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const radialMistFragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uFrame;
  uniform float uIntensity;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec2 centered = vUv - 0.5;
    float radius = length(centered);
    float vignette = smoothstep(0.78, 0.18, radius);
    float beams = pow(abs(sin(atan(centered.y, centered.x) * 8.0 + uFrame * 0.01)), 16.0);
    float n = hash(floor((vUv + uFrame * 0.0007) * 420.0));
    vec3 color = vec3(0.02, 0.25, 0.45) * vignette + vec3(0.0, 0.75, 1.0) * beams * 0.08;
    color += n * 0.018;
    gl_FragColor = vec4(color, vignette * uIntensity * 0.18);
  }
`;
