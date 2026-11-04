SOM NA MESA - PREPARAR PUBLICACAO DO GITHUB PAGES

O que esta atualizacao faz
- Mantem os MP3 e videos no repositorio publico de midias ja criado: Passaodado-prog/-som-na-mesa-midias.
- No Live Server (localhost ou IP privado do computador), continua usando os arquivos locais audio/ e karaoke/videos/.
- No site publico, carrega MP3 e videos diretamente do repositorio publico de midias.
- Prepara um GitHub Actions que publica somente uma lista permitida de arquivos do jogo.
- Nao publica admin.html, admin.js, admin.css, admin-karaoke.js, supabase/, audio/ ou karaoke/videos/ no artefato do Pages.

IMPORTANTE
- Execute tudo na branch feature/painel-admin.
- Nao faca merge na main antes de validar o diff e fazer o push da branch.
- O repositorio de midias e publico. Publique somente midias cuja distribuicao publica esteja autorizada.

INSTALACAO
1. Extraia este pacote.
2. Copie APLICAR-PUBLICACAO-GITHUB.ps1 e a pasta .github para a pasta local Hitster Personal.
3. Abra o terminal do VS Code dentro de Hitster Personal.
4. Confirme a branch:
   git branch --show-current
   Deve mostrar feature/painel-admin.
5. Execute:
   powershell -ExecutionPolicy Bypass -File .\APLICAR-PUBLICACAO-GITHUB.ps1
6. Confira:
   git status --short
   git diff --check
   git diff -- index.html script.js karaoke-mode.js
   O script cria um backup fora da pasta Hitster Personal.

VALIDACAO LOCAL
- Abra pelo Live Server no computador.
- Abra pelo IP privado do computador no celular.
- Em ambos, o resolvedor usa os arquivos locais e nao exige internet para as midias locais.
- Confira uma musica MP3 e um video de Karaoke.

ENVIAR A ALTERACAO
Depois de conferir o diff:
   git add index.html script.js karaoke-mode.js media-config.js .github/workflows/som-na-mesa-pages.yml
   git commit -m "Prepara publicacao do SOM NA MESA no GitHub Pages"
   git push origin feature/painel-admin

PUBLICAR NA MAIN
1. No GitHub, abra um Pull Request de feature/painel-admin para main.
2. Confira o diff e faca Merge.
3. No repositorio principal, entre em Settings > Pages.
4. Em Build and deployment > Source, escolha GitHub Actions.
5. Abra a aba Actions e confira o workflow "Publicar SOM NA MESA no GitHub Pages".
6. Quando o workflow ficar verde, acesse https://passaodado-prog.github.io/.

O WORKFLOW PUBLICA SOMENTE:
index.html, style.css, ui-dialogs.css, ui-dialogs.js, media-config.js, musicas.js, categorias.js, karaoke.js, script.js, karaoke-core.js, karaoke-mode.js e img/.

Nao publica o painel administrativo nem as pastas de audio/video. O codigo completo continua no repositorio privado.

Se o workflow falhar, nao altere a main manualmente. Copie a mensagem de erro da aba Actions para diagnostico.
