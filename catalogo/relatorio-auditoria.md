# Relatorio de auditoria inicial do catalogo

## Resumo

- Registros lidos: **274**.
- IDs duplicados: **0**.
- Codigos duplicados: **0**.
- Registros com codigo diferente do ID formatado com tres digitos: **0**.
- Registros sem ano: **7**.
- Caminhos de audio repetidos: **1**.
- Grupos de titulo/artista repetidos apos normalizar maiusculas, espacos e acentos: **3**.

## Registros sem ano

- Carta 056: **ENDOIDECEU MEU CORAÇÃO** — João Gomes
- Carta 058: **Eu Só Quero um Xodó** — Dominguinhos
- Carta 061: **Fico Assim Sem Você** — Claudinho & Buchecha
- Carta 064: **Give It Up** — KC and the Sunshine Band
- Carta 068: **Please Don't Go** — KC & The Sunshine Band
- Carta 072: **Lonely** — Akon
- Carta 243: **Solidão (Áudio Oficial)** — Sandra De Sá

## Caminho de audio repetido

- **audio/143.mp3**: carta 143 (Ainda Gosto Dela); carta 144 (Vamos Fugir).

## Possiveis repeticoes de titulo e artista

- Carta 015: **APENAS MAIS UMA DE AMOR** — LULU SANTOS; ano 2000; arquivo `audio/015.mp3`.
  - Carta 112: **Apenas Mais Uma De Amor** — Lulu Santos; ano 1992; arquivo `audio/112.mp3`.
- Carta 053: **Don't Matter** — Akon; ano 2007; arquivo `audio/044-53.mp3`.
  - Carta 148: **Don't Matter** — Akon; ano 2007; arquivo `audio/148.mp3`.
- Carta 054: **Coração** — Dorgival Dantas; ano 2005; arquivo `audio/045-54.mp3`.
  - Carta 206: **Coração** — Dorgival Dantas; ano 2005; arquivo `audio/206.mp3`.

## Verificacoes pendentes

- Os arquivos MP3 nao foram enviados para esta analise; portanto, a existencia fisica de cada caminho ainda nao foi confirmada.
- Execute `tools/validar-audios.mjs` no computador que contem a pasta `audio` para verificar os arquivos reais.
- Caminhos com nomes que nao correspondem ao codigo da carta foram preservados, pois podem ser nomes antigos intencionais.
- Os grupos repetidos nao devem ser apagados automaticamente: podem representar versoes ou gravacoes distintas.
- Nenhum genero foi atribuido automaticamente. Pagode e Samba precisam de classificacao validada no painel; Anos 70 sera calculado a partir do ano; Geral inclui todas as musicas ativas.
