# Iamazing School — Holographic Tunnel

Projeto Remotion + React Three Fiber + Three.js para gerar um vídeo vertical 9:16 com um túnel holográfico de palavras tecnológicas. As letras individuais convergem em espiral e formam a frase **“Iamazing School”** no centro da cena.

## Configuração do vídeo

- Composition ID: `IamazingTunnel`
- Resolução: `1080x1920`
- FPS: `30`
- Duração: `240 frames` / `8 segundos`
- Output local: `out/iamazing-tunnel.mp4`
- Codec: `h264`

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

O render local usa `--gl=swangle`, `--enable-unsafe-swiftshader` e `--concurrency=1` para aumentar a compatibilidade de WebGL em ambientes sem GPU dedicada.

O arquivo final será gerado em:

```text
out/iamazing-tunnel.mp4
```

## Render no GitHub Actions

O workflow `.github/workflows/render.yml` roda automaticamente em `push` para a branch `main` e também pode ser executado manualmente em **Actions → Render Remotion Video → Run workflow**.

Após a execução, baixe o vídeo em **Artifacts** com o nome:

```text
iamazing-school-remotion-render
```

O workflow valida que está rodando na `main`, instala dependências de sistema para Ubuntu, usa `xvfb`, renderiza com `--gl=swangle` e envia o MP4 como artifact.

## Por que o MP4 não é commitado?

Arquivos renderizados são binários, pesados e derivados do código-fonte. Por isso, `*.mp4`, `out/`, `dist/`, `build/` e caches ficam no `.gitignore`. O vídeo deve ser gerado localmente ou baixado como artifact do GitHub Actions.

## Regra de branch

Todo o desenvolvimento deste projeto deve acontecer exclusivamente na branch `main`. Não use branches secundárias como `dev`, `test`, `staging`, `feature`, `hotfix` ou `experimental`, porque o pipeline foi desenhado para renderizar e validar somente a MAIN.

## Áudio opcional

Para incluir uma trilha, adicione localmente:

```text
public/audio/ambient-tech.mp3
```

Se esse arquivo existir, o Remotion usa `Audio`. Se não existir, o render funciona sem áudio e sem falha.
