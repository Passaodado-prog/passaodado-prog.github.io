# Relatorio de preparacao da publicacao

## Alteracoes preparadas

- `media-config.js` resolve os caminhos de MP3 e videos.
- Em `localhost`, `127.0.0.1` e IPs privados da rede local, mantem os caminhos relativos locais. Isso preserva o teste pelo Live Server no PC e no celular.
- No dominio publico do GitHub Pages, resolve `audio/...` e `karaoke/videos/...` para `raw.githubusercontent.com/Passaodado-prog/-som-na-mesa-midias/main/`.
- `script.js` passa a usar o resolvedor ao carregar MP3.
- `karaoke-mode.js` passa a usar o resolvedor ao carregar os videos e atualiza mensagens antigas que ainda citavam instrumentais.
- `index.html` carrega `media-config.js` antes dos catalogos e scripts do jogo.
- O workflow de Pages usa uma lista permitida de arquivos. Nao copia painel administrativo, pastas de audio/video, Supabase, testes ou ferramentas para o site publico.
- O checkout do workflow usa sparse checkout e `blob:none` para evitar baixar os blobs grandes de audio/video na etapa de publicacao.

## Verificacoes executadas neste ambiente

- Patch simulado sobre snapshots recentes de `index.html`, `script.js` e `karaoke-mode.js`: aprovado.
- `node --check` em `script.js`, `karaoke-mode.js` e `media-config.js`: aprovado.
- Teste do resolvedor em IP privado: manteve URL local do Live Server.
- Teste do resolvedor em dominio publico: gerou URL raw do repositorio de midias.
- Parse YAML do workflow: aprovado.
- Teste de sparse checkout com a lista de arquivos: manteve apenas os arquivos permitidos e `img/`, sem `audio/`, `karaoke/videos/` ou `admin.html`.

## O que ainda depende do ambiente do usuario

- Executar o script PowerShell na pasta local `Hitster Personal`.
- Conferir o diff e fazer commit/push na branch `feature/painel-admin`.
- Fazer merge para `main`.
- Alterar Settings > Pages > Source para `GitHub Actions`.
- Validar o workflow na aba Actions e testar a reproducao real dos MP3 e MP4 no site publicado.

Este pacote prepara as alteracoes; nao altera diretamente o repositorio remoto nem executa o merge.
