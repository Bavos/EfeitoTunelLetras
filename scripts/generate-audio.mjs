import {existsSync, mkdirSync, writeFileSync} from 'node:fs';
import {dirname} from 'node:path';

const output = 'public/audio/corporate-ambient.wav';
const onlyIfMissing = process.argv.includes('--if-missing');

if (onlyIfMissing && existsSync(output)) {
  console.log(`Audio asset already exists: ${output}`);
  process.exit(0);
}

const sampleRate = 48000;
const durationSeconds = 8;
const channels = 2;
const totalSamples = sampleRate * durationSeconds;
const data = new Int16Array(totalSamples * channels);

const envelope = (time) => {
  const fadeIn = Math.min(1, time / 0.9);
  const fadeOut = Math.min(1, (durationSeconds - time) / 1.1);
  return Math.max(0, Math.min(fadeIn, fadeOut));
};

const deterministicNoise = (seed) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
};

for (let sampleIndex = 0; sampleIndex < totalSamples; sampleIndex += 1) {
  const time = sampleIndex / sampleRate;
  const env = envelope(time);
  const hum = Math.sin(2 * Math.PI * 55 * time) * 0.13 + Math.sin(2 * Math.PI * 110 * time) * 0.055;
  const shimmer = Math.sin(2 * Math.PI * (430 + Math.sin(time * 0.9) * 18) * time) * 0.018;
  const air = deterministicNoise(sampleIndex * 0.017) * 0.018;
  const whoosh = Math.sin(2 * Math.PI * (180 + time * 65) * time) * Math.pow(Math.sin(Math.PI * time / durationSeconds), 7) * 0.12;
  const glitchPulse = [1.28, 2.75, 4.12, 5.65, 6.82].reduce((sum, hit) => {
    const distance = Math.abs(time - hit);
    return sum + (distance < 0.045 ? (1 - distance / 0.045) * Math.sin(2 * Math.PI * 980 * time) * 0.07 : 0);
  }, 0);
  const sample = Math.max(-1, Math.min(1, (hum + shimmer + air + whoosh + glitchPulse) * env));
  const left = sample * (0.92 + Math.sin(time * 0.7) * 0.08);
  const right = sample * (0.92 + Math.cos(time * 0.8) * 0.08);
  data[sampleIndex * 2] = Math.round(left * 32767);
  data[sampleIndex * 2 + 1] = Math.round(right * 32767);
}

const byteRate = sampleRate * channels * 2;
const blockAlign = channels * 2;
const buffer = Buffer.alloc(44 + data.length * 2);
let offset = 0;
const writeString = (value) => {
  buffer.write(value, offset, 'ascii');
  offset += value.length;
};
const writeUInt32 = (value) => {
  buffer.writeUInt32LE(value, offset);
  offset += 4;
};
const writeUInt16 = (value) => {
  buffer.writeUInt16LE(value, offset);
  offset += 2;
};

writeString('RIFF');
writeUInt32(36 + data.length * 2);
writeString('WAVE');
writeString('fmt ');
writeUInt32(16);
writeUInt16(1);
writeUInt16(channels);
writeUInt32(sampleRate);
writeUInt32(byteRate);
writeUInt16(blockAlign);
writeUInt16(16);
writeString('data');
writeUInt32(data.length * 2);

for (let dataIndex = 0; dataIndex < data.length; dataIndex += 1) {
  buffer.writeInt16LE(data[dataIndex], offset);
  offset += 2;
}

mkdirSync(dirname(output), {recursive: true});
writeFileSync(output, buffer);
console.log(`Generated ${output} (${durationSeconds}s, ${sampleRate}Hz stereo WAV).`);
