# Trilha sonora opcional

Coloque aqui a trilha local `futuristic-ambience.mp3` para renderização com áudio:

```bash
public/audio/futuristic-ambience.mp3
```

Arquivos de áudio binários são ignorados por `.gitignore` para manter o repositório leve e próprio para GitHub. Para ativar a trilha no render, use props Remotion:

```bash
npx remotion render src/index.ts IamazingTunnel out/iamazing-tunnel.mp4 \
  --props='{"audioTrack":"audio/futuristic-ambience.mp3"}'
```
