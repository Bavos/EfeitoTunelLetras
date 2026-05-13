# Iamazing School — Holographic Tunnel Remotion

Projeto completo em **Remotion + React Three Fiber + Three.js + TypeScript** para gerar um vídeo vertical 9:16 com um túnel holográfico futurista de palavras tecnológicas girando em espiral e avançando em direção à câmera.

## Conceito visual

- **Texto central:** `Iamazing School`.
- **Palavras secundárias:** Cloud Computing, Big Data, API, Artificial Intelligence, Data Center, Machine Learning, Open Source, Cybersecurity e Cryptography.
- **Estética:** comercial tecnológico premium inspirado em AWS, NVIDIA, IBM Quantum, Azure e OpenAI.
- **Direção visual:** azul profundo, glow ciano, highlights brancos suaves, neblina volumétrica fake, partículas holográficas, contraste cinematográfico e motion blur visual simulado.
- **Negative prompt aplicado:** evitar neon oversaturado, visual gamer, cyberpunk exagerado, tremores bruscos, baixa resolução, texto plano sem profundidade e composição caótica.

## Configuração do vídeo

| Item | Valor |
| --- | --- |
| Composition ID | `IamazingTunnel` |
| Resolução | `1080x1920` |
| Aspect ratio | `9:16` vertical |
| FPS | `30` |
| Duração | `240 frames` / `8 segundos` |
| Output local | `out/iamazing-tunnel.mp4` |
| Codec | `h264` |

## Estrutura

```txt
.github/
  workflows/
    render.yml
src/
  index.ts
  Composition.tsx
  TunnelScene.tsx
  WordParticle.tsx
  CameraRig.tsx
  Lighting.tsx
  Effects.tsx
  constants.ts
  utils/
    tunnel.ts
public/
  audio/
    README.md
package.json
package-lock.json
tsconfig.json
remotion.config.ts
.gitignore
README.md
```

## Instalação local

> Use **npm**. Não use yarn ou pnpm neste projeto.

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

O comando abre o Remotion Studio para pré-visualizar a composição `IamazingTunnel`.

## Render local

```bash
npm run render
```

O MP4 será gerado em:

```txt
out/iamazing-tunnel.mp4
```

O script usa `--gl=angle` e `--concurrency=1` para manter o comportamento próximo ao pipeline headless do GitHub Actions.

## Render no GitHub Actions

O workflow está em `.github/workflows/render.yml` e roda automaticamente em todo `push` na branch `main`. Ele também pode ser executado manualmente em **Actions → Render Remotion Video → Run workflow**.

Pipeline executado:

1. Checkout fixo da `main`.
2. Validação para impedir execução fora da `main`.
3. Setup do Node.js 20 sem cache npm no `setup-node`.
4. Instalação de dependências Linux para WebGL headless.
5. Instalação com `npm ci` usando `package-lock.json`.
6. Verificação do Remotion com `npx remotion versions`.
7. Render com `xvfb-run -a`, `--gl=angle`, `--concurrency=1` e timeout ampliado.
8. Upload do MP4 como artifact chamado `iamazing-school-remotion-render`.

Após a execução, baixe o vídeo na página do workflow em **Artifacts → iamazing-school-remotion-render**.

## Áudio opcional

O projeto suporta áudio via Remotion sem versionar binários pesados.

1. Crie ou obtenha uma trilha MP3 leve com hum eletrônico suave, glitches digitais discretos, whooshes leves e atmosfera corporativa futurista.
2. Salve localmente em:

```txt
public/audio/ambient-tech.mp3
```

Se o arquivo existir, a composição usa `<Audio />` automaticamente. Se não existir, o vídeo renderiza normalmente em silêncio.

## Regras de repositório

- Todo desenvolvimento ocorre exclusivamente na branch `main`.
- Não criar branches `dev`, `test`, `staging`, `feature/*`, `hotfix/*` ou experimentais.
- Não commitar `node_modules`, `out`, `dist`, `build`, caches, MP4 renderizado ou assets pesados.
- O `.gitignore` bloqueia outputs, vídeos, imagens renderizadas, áudio binário e arquivos temporários.
- O MP4 final deve ser baixado pelo artifact do GitHub Actions ou gerado localmente, nunca commitado.

## Implementação procedural

A distribuição das palavras usa matemática procedural com seno/cosseno e profundidade helicoidal:

```ts
x = Math.cos(angle) * radius;
y = Math.sin(angle) * radius;
z = depth - cameraProgress;
```

Cada palavra recebe posição 3D, escala por profundidade, opacidade por distância, rotação suave, glow ciano e trilhas translúcidas que simulam motion blur. A câmera aplica dolly-in contínuo, leve camera roll e micro drift cinematográfico para reforçar sensação de lente macro 85mm e shallow depth of field simulado.
