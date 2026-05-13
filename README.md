# Efeito Túnel de Letras — Iamazing School

Projeto Remotion + React Three Fiber + Three.js para renderizar um vídeo vertical cinematográfico 9:16 com túnel holográfico de palavras tecnológicas orbitando em espiral e avançando em direção à câmera.

## Conceito visual

- **Texto central:** `Iamazing School`
- **Formato:** 1080x1920, 30fps, 8 segundos
- **Estética:** comercial tecnológico premium inspirado em AWS, NVIDIA, IBM Quantum e OpenAI
- **Movimento:** dolly-in contínuo, micro drifting, camera roll sutil e túnel helicoidal procedural
- **Ótica simulada:** compressão de lente macro, depth of field, bokeh, haze e perspectiva atmosférica
- **Pós-processamento:** bloom, depth of field, aberração cromática leve, noise, vinheta e streaks de motion blur
- **Som:** ambiência eletrônica corporativa com hum, glitches discretos e whoosh leve

## Stack

- Remotion
- React
- TypeScript
- React Three Fiber
- Three.js
- @react-three/drei
- @react-three/postprocessing
- postprocessing

## Estrutura

```txt
src/
 ├── Composition.tsx       # Composição Remotion 1080x1920, 30fps, 240 frames
 ├── TunnelScene.tsx       # Cena principal, Canvas 3D, áudio e timeline
 ├── WordParticle.tsx      # Palavra 3D com glow, rotação e opacidade procedural
 ├── CameraRig.tsx         # Dolly-in, drift e roll cinematográfico
 ├── Lighting.tsx          # Luzes, fog e atmosfera azul/ciano
 ├── Effects.tsx           # Bloom, DOF, chromatic aberration, noise, haze e motion blur visual
 ├── hooks/
 ├── utils/
 └── shaders/
audio/                     # Fontes e instruções para trilhas MP3 aprovadas
public/audio/              # Assets usados pelo Remotion via staticFile()
scripts/                   # Geração de ambiência sonora sintética
```

## Como usar localmente

```bash
npm install
npm run dev
```

Abra o Remotion Studio e selecione a composition `TechWordTunnel`.

## Render final MP4 H264

```bash
npm run render
```

Saída padrão:

```txt
out/iamazing-school-tunnel.mp4
```

Configuração do render:

- Resolução: `1080x1920`
- FPS: `30`
- Duração: `240 frames / 8 segundos`
- Codec: `H264`
- Pixel format: `yuv420p`
- Áudio: `AAC`

## Gerar preview estático

```bash
npm run still
```

Saída:

```txt
out/preview.png
```

## Áudio

O projeto gera a ambiência WAV localmente em `public/audio/corporate-ambient.wav`. Esse arquivo é binário e fica fora do Git para evitar erro/ruído em diffs do GitHub e do Codex.

Os scripts `npm run dev`, `npm run preview`, `npm run still` e `npm run render` executam automaticamente `npm run ensure:audio` antes de iniciar.

Para regenerar manualmente:

```bash
npm run generate:audio
```

Para usar MP3:

1. Salve sua trilha licenciada em `public/audio/corporate-ambient.mp3`. Arquivos `.mp3` também ficam fora do Git por serem binários.
2. Ajuste a prop `audioSrc` da composição ou altere o fallback em `src/TunnelScene.tsx` para `staticFile('audio/corporate-ambient.mp3')`.
3. Execute `npm run render`.

## Por que o arquivo binário não entra no Git?

O arquivo `public/audio/corporate-ambient.wav` é gerado pelo script `scripts/generate-audio.mjs`. Ele não deve ser versionado porque GitHub/Codex exibem binários como conteúdo não textual e podem sinalizar erro ou bloquear a revisão do diff.

A solução aplicada é manter somente o gerador e um `.gitkeep` textual em `public/audio/`. Assim, qualquer pessoa pode clonar o projeto, rodar `npm install` e os scripts npm geram o áudio localmente antes do preview/render.

## GitHub / Codex

Este repositório está pronto para GitHub e Codex:

```bash
git clone <url-do-repositorio>
cd EfeitoTunelLetras
npm install
npm run dev
npm run render
```

> Regra operacional deste projeto: desenvolver e commitar diretamente na branch `main`, sem branches secundárias `dev`, `test` ou `staging`.

## Personalização rápida

- Palavras secundárias: `src/utils/words.ts`
- Densidade do túnel: `WORD_COUNT` em `src/TunnelScene.tsx`
- Geometria helicoidal: `src/utils/tunnel.ts`
- Câmera: `src/CameraRig.tsx`
- Pós-processamento: `src/Effects.tsx`
- Luz e fog: `src/Lighting.tsx`

## Boas práticas aplicadas

- Componentização por responsabilidade
- Cálculo procedural memoizado quando possível
- Geometria textual via Drei `Text`
- Cena otimizada para render estável
- Sem dependência de APIs externas ou secrets
- Áudio local e reproduzível
