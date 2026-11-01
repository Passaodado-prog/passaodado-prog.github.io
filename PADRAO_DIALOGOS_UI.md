# Padrão permanente de mensagens — SOM NA MESA

A partir desta versão, todas as confirmações, avisos e erros criados pelo aplicativo ou pelo painel administrativo devem usar o componente visual compartilhado `SomNaMesaDialogs`.

## Regra obrigatória

- Não usar `alert()`, `confirm()` ou `prompt()` nativos no código do SOM NA MESA.
- Não usar `window.alert`, `window.confirm` ou `window.prompt`.
- Confirmações que mudam ou descartam dados devem aguardar a resposta com `await`.
- Avisos e erros bloqueantes devem usar o mesmo componente visual. Mensagens curtas de estado podem continuar em áreas `role="status"`/`aria-live`, desde que usem o estilo do projeto.
- Permissões do navegador e do sistema operacional (microfone, seletor de arquivos, permissões de mídia, segurança) continuam sob controle do navegador e não podem ser redesenhadas pelo site.

## Arquivos compartilhados

- `ui-dialogs.js`: componente e API global.
- `ui-dialogs.css`: aparência compartilhada, responsiva e acessível.

As duas páginas devem carregar `ui-dialogs.css` no `<head>` e `ui-dialogs.js` antes dos scripts de lógica da página.

## API disponível

### Confirmação

```js
const confirmado = await window.SomNaMesaDialogs.confirm({
  title: "Remover esta música?",
  message: "O registro será removido do catálogo.",
  detail: "O arquivo MP3 não será apagado.",
  confirmText: "Remover",
  cancelText: "Manter",
  danger: true
});

if (!confirmado) return;
```

`confirm()` retorna `true` quando a pessoa confirma e `false` quando cancela, fecha a janela ou pressiona Escape.

### Aviso, informação ou erro

```js
await window.SomNaMesaDialogs.warning({
  title: "Confira os dados",
  message: "Preencha o nome da música e o artista."
});

await window.SomNaMesaDialogs.error({
  title: "Não foi possível salvar",
  message: "Verifique os dados e tente novamente."
});

await window.SomNaMesaDialogs.info({
  title: "Informação",
  message: "O catálogo foi atualizado."
});
```

`alert()`, `warning()`, `error()` e `info()` abrem a mesma janela visual e resolvem quando a pessoa fecha ou confirma a mensagem.

## Integração com os modos de jogo

No jogo público, as funções `confirmarAcaoPersonalizada()` e `mostrarAvisoPersonalizado()` encaminham as chamadas para `SomNaMesaDialogs`. Os módulos dos modos devem continuar usando essas funções ou chamar a API compartilhada diretamente.

No painel administrativo, usar `SomNaMesaDialogs` diretamente. Como as respostas são assíncronas, as funções que dependem de confirmação devem ser `async` e aguardar o resultado.

## Princípios de conteúdo

- Título curto e específico: dizer qual ação está sendo confirmada.
- Mensagem principal: explicar o que vai acontecer em linguagem simples.
- Detalhe: explicar o que será preservado e o que será removido.
- Botão principal: descrever a ação (por exemplo, “Remover gênero”), evitando rótulos vagos como “OK”.
- Botão secundário: “Cancelar” ou uma alternativa clara.
- Ações destrutivas usam `danger: true`.
- Nunca colocar conteúdo fornecido pelo usuário via `innerHTML`; o componente usa `textContent`.
