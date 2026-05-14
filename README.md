# Iamazing School — Holographic Tunnel

Projeto cinematográfico real em **Remotion + React Three Fiber + Three.js** para gerar um vídeo vertical 9:16 com um túnel holográfico futurista. Palavras tecnológicas orbitam em profundidade e letras individuais convergem para formar a marca:

```text
Iamazing
School
```

## Configuração do vídeo

- Composition ID: `IamazingTunnel`
- Resolução: `1080x1920`
- Aspect ratio: `9:16`
- FPS: `30`
- Duração: `300 frames` / `10 segundos`
- Codec: `h264`
- Output local/CI: `out/iamazing-tunnel.mp4`

## Conceito visual

A cena começa dentro de um túnel digital azul profundo com partículas, anéis holográficos e palavras secundárias como `Cloud Computing`, `Artificial Intelligence`, `Machine Learning`, `Cybersecurity`, `Data Center`, `Cloud` e `AI`. Entre os frames `90` e `220`, cada letra de **Iamazing School** sai de uma posição procedural própria no túnel, gira suavemente e desacelera até encaixar no centro em duas linhas.

A estética foi pensada para parecer corporativa premium, limpa e cinematográfica, evitando neon saturado, visual gamer, glitch caótico ou cyberpunk exagerado.

## Instalação

```bash
npm install
```

O projeto usa `npm` e mantém `package-lock.json` versionado para builds reproduzíveis.

## Desenvolvimento

```bash
npm run dev
```

Esse comando abre o Remotion Studio apontando para `src/index.ts`.

## Render local

```bash
npm run render
```

O arquivo final será gerado em:

```text
out/iamazing-tunnel.mp4
```

O render local já usa flags conservadoras para WebGL headless:

- `--gl=swangle`
- `--enable-unsafe-swiftshader`
- `--concurrency=1`

## Render no GitHub Actions

O workflow `.github/workflows/render.yml` roda automaticamente em `push` para a branch `main` e também pode ser executado manualmente em **Actions → Render Remotion Video → Run workflow**.

O pipeline:

1. Faz checkout da `main`.
2. Valida que a execução está na `main`.
3. Instala Node.js 20.
4. Instala dependências Linux necessárias para Chromium/WebGL headless.
5. Instala dependências npm.
6. Renderiza `IamazingTunnel` para `out/iamazing-tunnel.mp4` com `xvfb-run`, `--gl=swangle`, `--enable-unsafe-swiftshader` e `--concurrency=1`.
7. Publica o MP4 como artifact.

Após a execução, baixe o vídeo em **Artifacts** com o nome:

```text
iamazing-school-remotion-render
```

## Por que usar swangle?

`swangle` usa renderização WebGL por software via SwiftShader/ANGLE, o que é mais previsível em runners Linux headless do GitHub Actions. Isso evita depender de GPU real, drivers específicos ou configurações experimentais. O workflow também usa `xvfb-run` para fornecer um display virtual ao Chromium.

## Áudio opcional

Para incluir uma trilha, adicione localmente:

```text
public/audio/ambient-tech.mp3
```

Se esse arquivo existir, o Remotion usa `Audio` com volume suave. Se não existir, o render continua sem áudio e sem falha.

Sugestão de ambiência:

- hum eletrônico suave;
- whooshes leves;
- glitches digitais discretos;
- atmosfera corporativa premium.

## Estrutura principal

```text
src/
├── index.ts
├── Composition.tsx
├── TunnelScene.tsx
├── WordParticle.tsx
├── FormingTitle.tsx
├── CameraRig.tsx
├── Lighting.tsx
├── Effects.tsx
├── constants.ts
└── utils/
    └── tunnel.ts

.github/
└── workflows/
    └── render.yml

public/
└── audio/
```

## Verificações do projeto

- `durationInFrames = 300`.
- A composição se chama `IamazingTunnel`.
- O título final aparece completo em duas linhas: `Iamazing` e `School`.
- O título é construído letra por letra em `src/FormingTitle.tsx`.
- As animações visuais dependem diretamente de `useCurrentFrame()` do Remotion.
- As palavras secundárias reduzem opacidade após a formação do título.
- O output esperado é `out/iamazing-tunnel.mp4`.
