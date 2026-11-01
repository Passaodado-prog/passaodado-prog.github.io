# Relatório — diálogos personalizados compartilhados

## Escopo

Padronização das confirmações, avisos e erros do jogo público e do painel administrativo, com um componente compartilhado (`ui-dialogs.js` + `ui-dialogs.css`).

## Alterações

- Criado o componente compartilhado com API `SomNaMesaDialogs.confirm`, `.alert`, `.info`, `.warning` e `.error`.
- O componente usa uma fila para impedir que dois diálogos concorrentes se sobreponham.
- Confirmação retorna `true` ou `false`; avisos resolvem ao serem fechados.
- O componente usa `textContent`, tem rótulos acessíveis, restaura o foco e responde a Escape como cancelamento (ou fechamento do aviso).
- O jogo público encaminha suas confirmações e avisos existentes para o componente compartilhado.
- O painel administrativo principal e o cadastro de vídeos do Karaokê deixaram de chamar diálogos nativos e agora aguardam as respostas assíncronas do componente.
- Adicionado `PADRAO_DIALOGOS_UI.md` como regra permanente para futuras alterações.

## Verificações executadas

- `node --check` em `script.js`, `karaoke-mode.js`, `admin.js`, `admin-karaoke.js` e `ui-dialogs.js`: aprovado.
- Teste unitário do componente: confirmação positiva, cancelamento, fila de três diálogos, aviso sem botão Cancelar, tipos warning e error: aprovado.
- HTML `index.html`: 212 IDs, sem duplicações; scripts e CSS compartilhados carregados na ordem correta.
- HTML `admin.html`: 70 IDs, sem duplicações; scripts e CSS compartilhados carregados na ordem correta.
- Busca estática por chamadas nativas `alert()`, `confirm()` e `prompt()` nos scripts de lógica do jogo e do painel: nenhuma chamada encontrada.

## Limites

- Permissões do navegador/sistema operacional (microfone, seletor de arquivos e permissões de mídia) continuam nativas, pois não podem ser substituídas pelo site.
- Não foi feita validação visual em dispositivo físico. O teste final de layout e interação deve ser feito no Live Server em computador e celular.
