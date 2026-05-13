# Efeito Túnel de Letras — Iamazing School

Projeto completo em **Remotion + React + React Three Fiber + Three.js + TypeScript** para gerar um vídeo vertical cinematográfico 9:16 com um túnel holográfico de palavras tecnológicas.

A direção visual é inspirada em comerciais premium de tecnologia corporativa, com linguagem elegante tipo AWS, NVIDIA, IBM Quantum, Azure e OpenAI: azul profundo, glow ciano, partículas holográficas, profundidade 3D, câmera macro comprimida e pós-processamento cinematográfico.

## Especificações do render

- **Composição:** `IamazingTunnel`
- **Resolução:** `1080x1920`
- **Aspect ratio:** `9:16`
- **FPS:** `30`
- **Duração:** `8s` (`240` frames)
- **Codec padrão:** MP4 H.264 com `yuv420p`
- **Entrada Remotion:** `src/index.ts`

## Stack técnica

- Remotion
- React
- React Three Fiber
- Three.js
- `@react-three/drei`
- `@react-three/postprocessing`
- `postprocessing`
- TypeScript

## Estrutura principal

```txt
src/
 ├── Composition.tsx       # Registro da composição 1080x1920/30fps/8s
 ├── TunnelScene.tsx       # Cena 3D, túnel procedural, partículas e áudio opcional
 ├── WordParticle.tsx      # Palavra 3D individual com órbita helicoidal e ghost trails
 ├── CameraRig.tsx         # Dolly-in, camera roll e micro drifting cinematográfico
 ├── Lighting.tsx          # Luzes, fog e atmosfera azul/ciano
 ├── Effects.tsx           # Bloom, DOF, noise, aberração cromática e vinheta
 ├── hooks/
 ├── utils/
 └── shaders/
```

## Instalação

```bash
git clone <URL_DO_REPOSITORIO>
cd EfeitoTunelLetras
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Abra o Remotion Studio e selecione a composição `IamazingTunnel`.

## Render MP4 H.264

```bash
npm run render
```

Saída esperada:

```txt
out/iamazing-tunnel.mp4
```

> A pasta `out/` e arquivos renderizados são ignorados pelo Git para manter o repositório limpo.

## Render com áudio

Por regra do projeto, **binários não são versionados**. Para incluir trilha sonora:

1. Gere um áudio base procedural opcional:

```bash
npm run audio:synth
```

2. Se quiser MP3, converta localmente o WAV gerado para MP3 com sua ferramenta preferida e salve em:

```txt
public/audio/futuristic-ambience.mp3
```

3. Renderize com props:

```bash
npx remotion render src/index.ts IamazingTunnel out/iamazing-tunnel.mp4 \
  --codec h264 \
  --pixel-format yuv420p \
  --props='{"audioTrack":"audio/futuristic-ambience.mp3"}'
```

A cena já possui suporte à timeline de áudio via componente `<Audio />`; a trilha é opcional para que o repositório permaneça sem binários.

## Workflow obrigatório na `main`

Este repositório deve ser trabalhado diretamente na branch `main`:

```bash
git branch --show-current
# main
```

Não crie branches `dev`, `test`, `staging`, `feature/*`, `hotfix/*` ou experimentais.

## Como a animação é construída

- As palavras secundárias são distribuídas por anéis em uma hélice 3D.
- Cada palavra usa seno/cosseno para calcular `x`, `y` e profundidade `z`.
- A câmera realiza um dolly-in contínuo, com roll mínimo e drift suave.
- O túnel simula profundidade infinita reposicionando os anéis proceduralmente.
- `Bloom`, `DepthOfField`, `Noise`, `ChromaticAberration` e `Vignette` criam o acabamento cinematográfico.
- Ghost trails nas palavras simulam motion blur natural sem depender de arquivos externos.
- Partículas instanciadas e geometria memoizada mantêm a renderização estável.

## Validação

```bash
npm run validate
npm run lint
```

## Regras de repositório

O `.gitignore` bloqueia:

- `node_modules/`
- caches
- builds
- vídeos renderizados
- áudio binário
- arquivos temporários
- `.env` e segredos

Versione apenas código-fonte, documentação e assets leves essenciais.
