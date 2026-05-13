# Audio source folder

Coloque aqui trilhas originais, stems, referências e versões MP3 aprovadas para o projeto.

O render padrão usa `public/audio/corporate-ambient.wav`, uma ambiência corporativa sintética gerada por `npm run generate:audio`.

Para usar uma trilha MP3 final:

1. Salve o arquivo em `public/audio/corporate-ambient.mp3`.
2. Passe a prop `audioSrc` com `staticFile('audio/corporate-ambient.mp3')` ou ajuste `src/TunnelScene.tsx`.
3. Renderize com `npm run render`.

Não versionar músicas comerciais sem licença.
