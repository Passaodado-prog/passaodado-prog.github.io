# SOM NA MESA

Aplicativo musical estático para publicação no GitHub Pages. O jogo usa HTML, CSS e JavaScript, sem banco de dados nem serviço de backend.

## Arquivos principais

- `index.html`: telas, seleção de modos e fluxo do jogo.
- `script.js`: regras dos modos Cante e Dance e Desafio Musical, equipes, votação, pontuação, desafios de dança, fila de músicas, vitória, desempate e revanche.
- `style.css`: layout e estilos responsivos.
- `musicas.js`: catálogo musical original, preservado sem alterações nesta atualização.
- `categorias.js`: temas musicais originais, preservados sem alterações nesta atualização.
- `admin.html`, `admin.js`, `admin.css`: painel administrativo estático para editar o catálogo localmente e exportar os arquivos.
- `RELATORIO_AUDITORIA.md`: testes de lógica e verificações técnicas desta versão.

## Modos de jogo

### Cante e Dance

Mantém a pontuação original: Disco de Ouro vale 2 pontos e Vinil Comum vale 1 ponto. As regras de canto, votação e dança continuam separadas do novo modo.

### Desafio Musical

Cada música tem quatro desafios independentes: cantar um trecho (3 pontos-base), identificar o título (2), identificar o artista (2) ou acertar o ano exato (3). Esses valores são os padrões iniciais implementados e podem ser ajustados nas constantes `PONTOS_DESAFIO_MUSICAL` em `script.js`.

- Cada equipe pode tentar responder uma única vez por música.
- Uma resposta correta resolve apenas aquele tipo de desafio; a música continua para os desafios restantes.
- Uma equipe que acerta pode continuar votando. Uma equipe que erra sua resposta perde o direito de votar naquela música. Quem passa a música por completo também não vota nela.
- Votos corretos em Fã-clube ou Duvidamos valem 1 ponto. Um voto errado gera um desafio de dança, mas não retira o direito de votar nas tentativas seguintes.
- Cada erro ou passe aumenta o bônus acumulado da música em 1 ponto, até 3 extras. O bônus permanece para os desafios restantes daquela música.
- Os resultados e desafios de dança são acumulados até o fim da disputa da música. Se todas as equipes errarem ou passarem sem ninguém acertar um desafio, todas dançam e a música é descartada.
- O anfitrião confirma manualmente se a resposta está correta. O aplicativo não avalia canto ou fala automaticamente.

## Áudios e imagens

O jogo espera arquivos em caminhos relativos, por exemplo `audio/001.mp3`, e a capa `img/capa-oficial.jpg`. A pasta `audio` e os arquivos reais de `img` não fazem parte deste pacote de código: preserve as pastas originais do seu repositório. Esta atualização não altera nem inclui MP3.

## Instalação segura

1. Faça uma cópia de segurança dos arquivos atuais.
2. Na branch de desenvolvimento, substitua os arquivos de código pelos arquivos correspondentes deste pacote.
3. Preserve `audio/` e `img/` exatamente como estão.
4. Abra `index.html` com Live Server e teste os dois modos em computador e celular.
5. Só depois de validar faça commit e push.

## Painel administrativo

O painel é estático e não possui autenticação real. Se `admin.html`, `admin.js` e `admin.css` forem publicados na raiz do GitHub Pages, qualquer pessoa que conheça o endereço direto poderá abrir a página, mesmo sem existir um link no jogo. Para impedir acesso público, mantenha os arquivos administrativos apenas localmente ou exclua-os da publicação.
