import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {
  CYAN,
  DURATION_IN_FRAMES,
  HEIGHT,
  SOFT_CYAN,
  TECH_WORDS,
  TITLE_ACCELERATE_START,
  TITLE_LINE_1,
  TITLE_LINE_2,
  TITLE_LOCK_FRAME,
  TITLE_REVEAL_START,
  WIDTH,
} from './constants';
import {clamp, easeInOutCubic, easeOutQuint, lerp, phaseProgress, seeded} from './math';

type WordLayer = {
  label: string;
  seed: number;
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
};

type TitleLetter = {
  char: string;
  index: number;
  finalX: number;
  finalY: number;
  startX: number;
  startY: number;
  startZ: number;
};

const WORD_COUNT = 86;
const PARTICLE_COUNT = 145;
const wordLayers: WordLayer[] = Array.from({length: WORD_COUNT}).map((_, index) => {
  const depthBand = index % 5;
  return {
    label: TECH_WORDS[index % TECH_WORDS.length],
    seed: index + 17,
    x: lerp(-430, 430, seeded(index + 3)),
    y: lerp(-780, 760, seeded(index + 33)),
    z: lerp(-1200, 520, seeded(index + 66)) - depthBand * 120,
    size: lerp(20, 46, seeded(index + 91)),
    opacity: lerp(0.12, 0.48, seeded(index + 123)),
  };
});

const particles = Array.from({length: PARTICLE_COUNT}).map((_, index) => ({
  x: lerp(-520, 520, seeded(index + 501)),
  y: lerp(-880, 880, seeded(index + 601)),
  z: lerp(-900, 700, seeded(index + 701)),
  size: lerp(1.2, 4.6, seeded(index + 801)),
  opacity: lerp(0.16, 0.72, seeded(index + 901)),
  seed: index + 1001,
}));

const buildTitleLetters = () => {
  const makeLine = (line: string, y: number, offset: number, spacing: number): TitleLetter[] => {
    const center = ((line.length - 1) * spacing) / 2;
    return line.split('').map((char, letterIndex) => {
      const index = offset + letterIndex;
      return {
        char,
        index,
        finalX: letterIndex * spacing - center,
        finalY: y,
        startX: lerp(-470, 470, seeded(index + 130)),
        startY: lerp(-720, 720, seeded(index + 230)),
        startZ: lerp(-1350, 640, seeded(index + 330)),
      };
    });
  };

  return [...makeLine(TITLE_LINE_1, -72, 0, 94), ...makeLine(TITLE_LINE_2, 62, TITLE_LINE_1.length, 100)];
};

const titleLetters = buildTitleLetters();

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame * 0.012) * 2.5;

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(circle at 50% 42%, rgba(19, 80, 134, 0.45) 0%, rgba(3, 18, 45, 0.96) 36%, #01040b 76%, #000208 100%)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: -220,
          background:
            'radial-gradient(circle at 28% 25%, rgba(31, 180, 255, 0.18), transparent 27%), radial-gradient(circle at 74% 62%, rgba(0, 238, 255, 0.12), transparent 25%), radial-gradient(circle at 50% 78%, rgba(24, 66, 172, 0.16), transparent 33%)',
          filter: 'blur(52px)',
          opacity: 0.88,
          transform: `translate3d(${pulse}px, ${-pulse * 0.7}px, 0) scale(1.04)`,
        }}
      />
      {[0, 1, 2, 3, 4].map((layer) => (
        <div
          key={layer}
          style={{
            position: 'absolute',
            left: `${12 + layer * 17}%`,
            top: `${13 + ((layer * 29) % 64)}%`,
            width: 330 + layer * 76,
            height: 330 + layer * 76,
            borderRadius: '50%',
            background: layer % 2 === 0 ? 'rgba(53, 200, 255, 0.08)' : 'rgba(27, 92, 255, 0.09)',
            filter: `blur(${64 + layer * 12}px)`,
            transform: `translate3d(${Math.sin(frame * 0.01 + layer) * 24}px, ${Math.cos(frame * 0.008 + layer) * 28}px, 0)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

const TechnologyWords: React.FC = () => {
  const frame = useCurrentFrame();
  const cameraForward = frame * 2.35;
  const focusFade = interpolate(frame, [248, 318], [1, 0.38], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{perspective: 1050, transformStyle: 'preserve-3d'}}>
      {wordLayers.map((word, index) => {
        const orbital = frame * (0.006 + seeded(word.seed) * 0.006) + word.seed;
        const localX = word.x + Math.sin(orbital) * (34 + seeded(word.seed + 1) * 62);
        const localY = word.y + Math.cos(orbital * 0.83) * (26 + seeded(word.seed + 2) * 54);
        const z = ((word.z + cameraForward + 1700) % 2200) - 1350;
        const depth = clamp((z + 1350) / 1870);
        const scale = lerp(0.42, 1.42, depth);
        const opacity = word.opacity * focusFade * interpolate(z, [-1200, -640, 320, 720], [0.02, 0.36, 0.74, 0.0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const blur = lerp(8.5, 0.2, depth) + interpolate(frame, [126, 260], [0, 2.4], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

        return (
          <div
            key={`${word.label}-${index}`}
            style={{
              position: 'absolute',
              left: WIDTH / 2,
              top: HEIGHT / 2,
              color: index % 4 === 0 ? SOFT_CYAN : CYAN,
              fontFamily: 'Inter, Montserrat, Space Grotesk, Arial, sans-serif',
              fontSize: word.size,
              fontWeight: 500,
              letterSpacing: '0.04em',
              opacity,
              whiteSpace: 'nowrap',
              textShadow: `0 0 ${10 + depth * 22}px rgba(109, 247, 255, ${0.2 + depth * 0.42})`,
              filter: `blur(${blur}px)`,
              transform: `translate(-50%, -50%) translate3d(${localX}px, ${localY}px, ${z}px) rotateX(${Math.sin(orbital) * 7}deg) rotateY(${Math.cos(orbital * 0.7) * 12}deg) scale(${scale})`,
              transformStyle: 'preserve-3d',
            }}
          >
            {word.label}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  const cameraForward = frame * 2.9;

  return (
    <AbsoluteFill style={{perspective: 1000, transformStyle: 'preserve-3d'}}>
      {particles.map((particle, index) => {
        const drift = frame * 0.012 + particle.seed;
        const z = ((particle.z + cameraForward + 1300) % 1800) - 1000;
        const depth = clamp((z + 1000) / 1540);
        const opacity = particle.opacity * interpolate(z, [-900, -520, 280, 780], [0.02, 0.48, 0.82, 0.0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: WIDTH / 2,
              top: HEIGHT / 2,
              width: particle.size * (0.8 + depth),
              height: particle.size * (0.8 + depth),
              borderRadius: '50%',
              background: 'rgba(198, 253, 255, 0.95)',
              boxShadow: `0 0 ${8 + depth * 18}px rgba(94, 239, 255, ${0.25 + depth * 0.45})`,
              opacity,
              filter: `blur(${lerp(2.6, 0.1, depth)}px)`,
              transform: `translate(-50%, -50%) translate3d(${particle.x + Math.sin(drift) * 20}px, ${particle.y + Math.cos(drift * 0.9) * 26}px, ${z}px)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const FormingTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const slowConverge = easeInOutCubic(phaseProgress(frame, TITLE_REVEAL_START, TITLE_ACCELERATE_START));
  const finalConverge = easeOutQuint(phaseProgress(frame, TITLE_ACCELERATE_START, TITLE_LOCK_FRAME));
  const progress = lerp(slowConverge * 0.58, 1, finalConverge);
  const reveal = interpolate(frame, [TITLE_REVEAL_START, TITLE_REVEAL_START + 52, TITLE_LOCK_FRAME], [0, 0.78, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lock = phaseProgress(frame, TITLE_LOCK_FRAME, DURATION_IN_FRAMES);
  const finalGlow = interpolate(frame, [250, 304, 360], [0.45, 1, 0.93], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{perspective: 1000, transformStyle: 'preserve-3d'}}>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 720,
          height: 330,
          borderRadius: '42%',
          background: 'radial-gradient(circle, rgba(80, 219, 255, 0.18), rgba(21, 87, 179, 0.06) 46%, transparent 70%)',
          filter: 'blur(36px)',
          opacity: interpolate(frame, [250, 310], [0, 0.92], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          transform: 'translate(-50%, -50%)',
        }}
      />
      {titleLetters.map((letter) => {
        const organic = frame * 0.016 + letter.index * 0.74;
        const floatStrength = 1 - progress;
        const x = lerp(letter.startX + Math.sin(organic) * 40 * floatStrength, letter.finalX, progress);
        const y = lerp(letter.startY + Math.cos(organic * 0.86) * 56 * floatStrength, letter.finalY, progress);
        const z = lerp(letter.startZ + Math.sin(organic * 0.72) * 160 * floatStrength, 120, progress);
        const rotationX = lerp(lerp(-48, 48, seeded(letter.index + 400)) + Math.sin(organic) * 9, 0, progress);
        const rotationY = lerp(lerp(-72, 72, seeded(letter.index + 500)) + Math.cos(organic * 0.8) * 12, 0, progress);
        const rotationZ = lerp(lerp(-26, 26, seeded(letter.index + 600)), 0, progress);
        const depth = clamp((z + 1350) / 1700);
        const opacity = reveal * interpolate(z, [-1400, -650, 240, 680], [0.04, 0.45, 1, 0.76], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const scale = lerp(0.54 + depth * 0.36, 1, progress) * lerp(1, 1.012, Math.sin(lock * Math.PI));

        return (
          <div
            key={`${letter.char}-${letter.index}`}
            style={{
              position: 'absolute',
              left: WIDTH / 2,
              top: HEIGHT / 2,
              width: 104,
              height: 122,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Inter, Montserrat, Space Grotesk, Arial, sans-serif',
              fontSize: 116,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '0.02em',
              color: SOFT_CYAN,
              opacity,
              textShadow: `0 0 ${12 * finalGlow}px rgba(255,255,255,0.55), 0 0 ${34 * finalGlow}px rgba(109,247,255,0.72), 0 0 ${76 * finalGlow}px rgba(0,134,255,0.45)`,
              filter: `drop-shadow(0 0 ${18 * finalGlow}px rgba(109,247,255,0.58)) blur(${lerp(3.4, 0, progress)}px)`,
              transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg) scale(${scale})`,
              transformStyle: 'preserve-3d',
            }}
          >
            {letter.char}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const CinematicScene: React.FC = () => {
  const frame = useCurrentFrame();
  const cameraEase = easeInOutCubic(phaseProgress(frame, 0, DURATION_IN_FRAMES));
  const handheldX = Math.sin(frame * 0.011) * 10 + Math.sin(frame * 0.023) * 4;
  const handheldY = Math.cos(frame * 0.009) * 12;
  const cameraScale = lerp(1, 1.055, cameraEase);

  return (
    <AbsoluteFill style={{backgroundColor: '#00040d', overflow: 'hidden'}}>
      <Background />
      <AbsoluteFill
        style={{
          transform: `translate3d(${handheldX}px, ${handheldY}px, 0) scale(${cameraScale})`,
          transformOrigin: '50% 50%',
        }}
      >
        <TechnologyWords />
        <Particles />
        <FormingTitle />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 50% 50%, transparent 0%, transparent 54%, rgba(0, 0, 0, 0.5) 100%), linear-gradient(180deg, rgba(0,0,0,0.18), transparent 18%, transparent 82%, rgba(0,0,0,0.28))',
        }}
      />
    </AbsoluteFill>
  );
};
