import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname} from 'node:path';

const sampleRate = 44100;
const duration = 8;
const channels = 2;
const samples = sampleRate * duration;
const output = 'public/audio/futuristic-ambience.wav';

const clamp16 = (value) => Math.max(-1, Math.min(1, value));
const buffer = Buffer.alloc(44 + samples * channels * 2);

const writeString = (offset, value) => buffer.write(value, offset, 'ascii');
writeString(0, 'RIFF');
buffer.writeUInt32LE(36 + samples * channels * 2, 4);
writeString(8, 'WAVE');
writeString(12, 'fmt ');
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20);
buffer.writeUInt16LE(channels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * channels * 2, 28);
buffer.writeUInt16LE(channels * 2, 32);
buffer.writeUInt16LE(16, 34);
writeString(36, 'data');
buffer.writeUInt32LE(samples * channels * 2, 40);

let offset = 44;
for (let i = 0; i < samples; i += 1) {
  const t = i / sampleRate;
  const fadeIn = Math.min(1, t / 1.2);
  const fadeOut = Math.min(1, (duration - t) / 1.1);
  const envelope = fadeIn * fadeOut;
  const hum = Math.sin(2 * Math.PI * 55 * t) * 0.12 + Math.sin(2 * Math.PI * 110 * t + 0.4) * 0.045;
  const shimmer = Math.sin(2 * Math.PI * 440 * t + Math.sin(t * 1.4) * 2.1) * 0.018;
  const whoosh = Math.sin(2 * Math.PI * (180 + t * 26) * t) * Math.pow(Math.sin(Math.PI * t / duration), 4) * 0.06;
  const glitch = (Math.sin(t * 29) > 0.992 ? Math.sin(2 * Math.PI * 1800 * t) * 0.045 : 0);
  const noise = (Math.random() * 2 - 1) * 0.006;
  const left = clamp16((hum + shimmer + whoosh + glitch + noise) * envelope);
  const right = clamp16((hum * 0.94 + shimmer * 1.08 + whoosh * 0.9 - glitch + noise) * envelope);
  buffer.writeInt16LE(Math.round(left * 32767), offset);
  offset += 2;
  buffer.writeInt16LE(Math.round(right * 32767), offset);
  offset += 2;
}

mkdirSync(dirname(output), {recursive: true});
writeFileSync(output, buffer);
console.log(`Generated ${output}. Convert to MP3 if needed; generated audio files are ignored by git.`);
