const STORAGE_KEY = "som-na-mesa-admin-draft-v1";
const BUILTIN_SPECIAL = new Set(["anos-70", "geral"]);
const PROTECTED_GENRES = new Set(["pagode", "samba"]);
const PALETTE = ["#6d28d9", "#9f1239", "#166534", "#92400e", "#1d4ed8", "#0f766e", "#9d174d"];

const catalogoOriginal = clone(typeof musicas !== "undefined" ? musicas : []);
const categoriasOriginais = clone(typeof categoriasMusicais !== "undefined" ? categoriasMusicais : {});
const codigosOriginais = new Set(catalogoOriginal.map((musica) => String(musica.codigo)));
const sourceFingerprints = {
  musicas: fingerprint(catalogoOriginal),
  categorias: fingerprint(categoriasOriginais)
};
let exportFingerprints = { musicas: null, categorias: null };
let rascunhoPendenteObjeto = null;
let rascunhoPendenteRaw = null;
let musicasDraft = clone(catalogoOriginal);
let categoriasDraft = clone(categoriasOriginais);
let codigosNovosRascunho = new Set();
let codigoEmEdicao = null;
let audioSelecionado = null;
let audioPreviewUrl = null;
let nomeAudioNovo = null;
let musicaPendenteAudioCodigo = null;
let codigosSelecionados = new Set();

const el = (id) => document.getElementById(id);

function confirmarNoPainel(titulo, mensagem, configuracao = {}) {
  return window.SomNaMesaDialogs.confirm({
    title: titulo,
    message: mensagem,
    eyebrow: configuracao.eyebrow || "CONFIRMAÇÃO DO CATÁLOGO",
    detailTitle: configuracao.detailTitle || "O que vai acontecer?",
    detail: configuracao.detail || "",
    confirmText: configuracao.confirmText || "Confirmar",
    cancelText: configuracao.cancelText || "Cancelar",
    danger: configuracao.danger === true,
    kind: configuracao.danger ? "danger" : "warning"
  });
}

function avisarNoPainel(titulo, mensagem, kind = "warning") {
  return window.SomNaMesaDialogs.alert({
    title: titulo,
    message: mensagem,
    eyebrow: kind === "error" ? "NÃO FOI POSSÍVEL" : "ATENÇÃO",
    kind,
    confirmText: "Entendi"
  });
}
const categoriaSelect = el("categoriaSelecionada");
const buscaMusica = el("buscaMusica");
const filtroClassificacao = el("filtroClassificacao");
const listaMusicas = el("listaMusicas");
const listaGeneros = el("listaGeneros");
const resumoCategoria = el("resumoCategoria");
const mensagemAdmin = el("mensagemAdmin");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

// Hash simples para detectar mudanças acidentais nos arquivos de origem.
// Não é um mecanismo criptográfico; serve apenas para impedir que rascunhos antigos
// sejam carregados silenciosamente sobre arquivos locais atualizados.
function fingerprint(value) {
  const input = JSON.stringify(value);
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `${input.length}-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function mostrarConflitoRascunho(mensagem, raw, draft = null) {
  rascunhoPendenteRaw = raw;
  rascunhoPendenteObjeto = draft;
  el("draftConflictMessage").textContent = mensagem;
  el("draftConflictOverlay").hidden = false;
  document.body.classList.add("draft-blocked");
}

function ocultarConflitoRascunho() {
  el("draftConflictOverlay").hidden = true;
  document.body.classList.remove("draft-blocked");
  rascunhoPendenteRaw = null;
  rascunhoPendenteObjeto = null;
}

function carregarRascunho() {
  let raw;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const draft = JSON.parse(raw);
    if (!Array.isArray(draft.musicas) || !draft.categorias || typeof draft.categorias !== "object") {
      mostrarConflitoRascunho(
        "O rascunho salvo neste navegador está em um formato antigo ou inválido. Ele não foi carregado para proteger os arquivos atuais.",
        raw,
        draft
      );
      return;
    }

    const base = draft.baseFingerprints;
    const exported = draft.exportFingerprints || {};
    if (!base || !base.musicas || !base.categorias) {
      mostrarConflitoRascunho(
        "Encontramos um rascunho antigo sem registro da versão de musicas.js e categorias.js usada para criá-lo. Por segurança, ele não foi carregado automaticamente. Baixe uma cópia do rascunho se quiser preservá-lo; depois escolha descartar o rascunho e usar os arquivos atuais.",
        raw,
        draft
      );
      return;
    }

    const musicasCompativeis = base.musicas === sourceFingerprints.musicas || exported.musicas === sourceFingerprints.musicas;
    const categoriasCompativeis = base.categorias === sourceFingerprints.categorias || exported.categorias === sourceFingerprints.categorias;
    if (!musicasCompativeis || !categoriasCompativeis) {
      const divergencias = [];
      if (!musicasCompativeis) divergencias.push("musicas.js");
      if (!categoriasCompativeis) divergencias.push("categorias.js");
      mostrarConflitoRascunho(
        `Os arquivos atuais (${divergencias.join(" e ")}) mudaram desde a criação ou exportação deste rascunho. Para evitar sobrescrever dados recentes, o rascunho foi preservado, mas não carregado. Baixe uma cópia para conferência ou descarte-o explicitamente para usar os arquivos atuais.`,
        raw,
        draft
      );
      return;
    }

    musicasDraft = draft.musicas;
    categoriasDraft = draft.categorias;
    exportFingerprints = {
      musicas: exported.musicas || null,
      categorias: exported.categorias || null
    };
    codigosNovosRascunho = new Set(Array.isArray(draft.novosCodigos)
      ? draft.novosCodigos.map(String)
      : draft.musicas.filter((musica) => !codigosOriginais.has(String(musica.codigo))).map((musica) => String(musica.codigo)));
    el("statusExportacao").textContent = "Rascunho compatível carregado. Os arquivos de origem correspondem à base salva ou à última exportação registrada.";
  } catch (erro) {
    console.warn("Não foi possível carregar o rascunho local:", erro);
    mostrarConflitoRascunho(
      "O rascunho salvo neste navegador não pôde ser lido. Ele foi preservado e não será aplicado aos arquivos atuais automaticamente.",
      typeof raw === "string" ? raw : String(localStorage.getItem(STORAGE_KEY) || ""),
      null
    );
  }
}

function salvarRascunho() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      musicas: musicasDraft,
      categorias: categoriasDraft,
      novosCodigos: [...codigosNovosRascunho],
      baseFingerprints: sourceFingerprints,
      exportFingerprints
    }));
    atualizarResumoGeral();
  } catch (erro) {
    mensagemAdmin.textContent = "O navegador não conseguiu salvar o rascunho local. Exporte os arquivos para não perder as alterações.";
  }
}

function categoriasDeGenero() {
  return Object.entries(categoriasDraft)
    .filter(([id, cat]) => cat.tipo === "genero" && !BUILTIN_SPECIAL.has(id))
    .sort((a, b) => (Number(a[1].ordem) || 999) - (Number(b[1].ordem) || 999));
}

// Inclui gêneros editáveis e temas automáticos (como Geral e Anos 70) na interface do admin.
function categoriasDoPainel() {
  return Object.entries(categoriasDraft)
    .filter(([id, cat]) =>
      (cat.tipo === "genero" && !BUILTIN_SPECIAL.has(id)) ||
      cat.tipo === "todos" || cat.tipo === "decada"
    )
    .sort((a, b) => (Number(a[1].ordem) || 999) - (Number(b[1].ordem) || 999));
}

// Restaura temas automáticos oficiais caso um rascunho antigo não os contenha.
function garantirCategoriasEspeciais() {
  let alterou = false;
  Object.entries(categoriasOriginais).forEach(([id, categoriaOriginal]) => {
    if (!BUILTIN_SPECIAL.has(id)) return;
    const atual = categoriasDraft[id];
    if (!atual || atual.tipo !== categoriaOriginal.tipo) {
      categoriasDraft[id] = clone(categoriaOriginal);
      alterou = true;
    }
  });
  return alterou;
}

function musicasDaCategoria(categoria) {
  if (!categoria) return [];
  if (categoria.tipo === "todos") {
    return musicasDraft.filter((musica) => musica && musica.arquivo);
  }
  if (categoria.tipo === "decada") {
    return musicasDraft.filter((musica) => {
      const anoMusica = Number(musica && musica.ano);
      return musica && musica.arquivo && Number.isFinite(anoMusica) &&
        anoMusica >= Number(categoria.inicio) && anoMusica <= Number(categoria.fim);
    });
  }
  return musicasDraft;
}

function codigosComGenero() {
  const codigos = new Set();
  categoriasDeGenero().forEach(([, categoria]) => (categoria.codigos || []).forEach((codigo) => codigos.add(String(codigo))));
  return codigos;
}

function atualizarResumoGeral() {
  el("totalMusicas").textContent = musicasDraft.length;
  el("totalGeneros").textContent = categoriasDeGenero().length;
  const codigosAtribuidos = codigosComGenero();
  el("totalSemGenero").textContent = musicasDraft.filter((musica) => !codigosAtribuidos.has(String(musica.codigo))).length;
}

function limparSelecao() {
  codigosSelecionados.clear();
  atualizarResumoSelecao();
}

function popularSeletorCategorias(preferida) {
  const atual = preferida || categoriaSelect.value;
  categoriaSelect.innerHTML = "";
  categoriasDoPainel().forEach(([id, categoria]) => {
    const option = document.createElement("option");
    option.value = id;
    const sufixo = categoria.tipo === "todos"
      ? " — todas as músicas (automático)"
      : categoria.tipo === "decada" ? " — tema automático" : "";
    option.textContent = `${categoria.nome}${sufixo}`;
    categoriaSelect.appendChild(option);
  });
  if (!categoriaSelect.options.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Crie um gênero primeiro";
    categoriaSelect.appendChild(option);
  }
  if (atual && [...categoriaSelect.options].some((option) => option.value === atual)) {
    categoriaSelect.value = atual;
  }
  renderizarListaMusicas();
  renderizarSeletorGenerosNovaMusica();
}

function normalizarSlug(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function renderizarListaGeneros() {
  listaGeneros.innerHTML = "";
  const categorias = categoriasDoPainel();
  if (!categorias.length) {
    listaGeneros.innerHTML = '<div class="empty-state">Nenhum gênero ou tema cadastrado.</div>';
    return;
  }

  categorias.forEach(([id, categoria]) => {
    const row = document.createElement("div");
    row.className = "genre-row";
    const info = document.createElement("div");
    info.className = "genre-info";
    const swatch = document.createElement("span");
    swatch.className = "genre-swatch";
    swatch.style.backgroundColor = categoria.cor || "#7c3aed";
    swatch.setAttribute("aria-hidden", "true");

    const text = document.createElement("span");
    const name = document.createElement("span");
    name.className = "genre-name";
    name.textContent = categoria.nome;
    const detail = document.createElement("span");
    detail.className = "genre-detail";

    const automatico = categoria.tipo === "todos" || categoria.tipo === "decada";
    if (categoria.tipo === "todos") {
      const total = musicasDaCategoria(categoria).length;
      detail.textContent = `${total} música(s) incluída(s) automaticamente`;
    } else if (categoria.tipo === "decada") {
      const total = musicasDaCategoria(categoria).length;
      detail.textContent = `${total} música(s) pela faixa de anos`;
    } else {
      const total = new Set((categoria.codigos || []).map(String)).size;
      detail.textContent = `${total} música(s) classificada(s)`;
    }

    text.append(name, detail);
    info.append(swatch, text);
    row.appendChild(info);

    if (automatico) {
      const badge = document.createElement("span");
      badge.className = "genre-protected";
      badge.textContent = "Tema automático";
      row.appendChild(badge);
    } else if (PROTECTED_GENRES.has(id)) {
      const badge = document.createElement("span");
      badge.className = "genre-protected";
      badge.textContent = "Gênero-base";
      row.appendChild(badge);
    } else {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "genre-delete";
      button.textContent = "Excluir gênero";
      button.setAttribute("aria-label", `Excluir gênero ${categoria.nome}`);
      button.addEventListener("click", () => excluirCategoria(id));
      row.appendChild(button);
    }
    listaGeneros.appendChild(row);
  });
}

async function excluirCategoria(id) {
  const categoria = categoriasDraft[id];
  if (!categoria || categoria.tipo !== "genero" || BUILTIN_SPECIAL.has(id) || PROTECTED_GENRES.has(id)) return;
  const total = new Set((categoria.codigos || []).map(String)).size;
  const confirmado = await confirmarNoPainel(
    `Excluir o gênero "${categoria.nome}"?`,
    `Serão removidas somente a categoria e suas ${total} associação(ões).`,
    {
      detail: "As músicas, os registros e os arquivos MP3 não serão apagados. A alteração ficará como rascunho neste navegador até você exportar categorias.js.",
      confirmText: "Excluir gênero",
      danger: true
    }
  );
  if (!confirmado) return;

  delete categoriasDraft[id];
  limparSelecao();
  salvarRascunho();
  popularSeletorCategorias();
  renderizarListaGeneros();
  mensagemAdmin.textContent = `Gênero "${categoria.nome}" removido do rascunho. As músicas e os MP3 foram preservados. Exporte categorias.js para aplicar a alteração ao projeto.`;
}

async function criarCategoria(nome) {
  const nomeLimpo = nome.trim();
  const slugBase = normalizarSlug(nomeLimpo);
  if (!slugBase) {
    await avisarNoPainel("Nome de gênero inválido", "Digite um nome válido para o gênero.");
    return false;
  }
  if (categoriasDraft[slugBase]) {
    await avisarNoPainel("Gênero já cadastrado", "Já existe um tema com esse identificador. Use outro nome.");
    return false;
  }
  const ordem = Math.max(0, ...Object.values(categoriasDraft).map((categoria) => Number(categoria.ordem) || 0)) + 1;
  categoriasDraft[slugBase] = {
    nome: nomeLimpo,
    tipo: "genero",
    cor: PALETTE[ordem % PALETTE.length],
    icone: "🎵",
    ordem,
    codigos: []
  };
  salvarRascunho();
  popularSeletorCategorias(slugBase);
  renderizarListaGeneros();
  mensagemAdmin.textContent = `Gênero "${nomeLimpo}" criado. Classifique as músicas e exporte categorias.js.`;
  return true;
}

function musicaTemAlgumGenero(musica) {
  const codigo = String(musica.codigo);
  return categoriasDeGenero().some(([, categoria]) => (categoria.codigos || []).map(String).includes(codigo));
}

function musicasVisiveis() {
  const categoria = categoriasDraft[categoriaSelect.value];
  const codigosDaCategoria = new Set((categoria?.codigos || []).map(String));
  const termo = buscaMusica.value.trim().toLocaleLowerCase("pt-BR");
  const filtro = filtroClassificacao.value;
  const base = musicasDaCategoria(categoria);
  const eGeneroEditavel = categoria?.tipo === "genero";

  return base.filter((musica) => {
    const alvo = `${musica.codigo} ${musica.nome} ${musica.artista} ${musica.ano ?? ""}`.toLocaleLowerCase("pt-BR");
    if (termo && !alvo.includes(termo)) return false;

    if (filtro === "sem-genero" && musicaTemAlgumGenero(musica)) return false;
    if (eGeneroEditavel) {
      const nesteGenero = codigosDaCategoria.has(String(musica.codigo));
      if (filtro === "fora-do-genero" && nesteGenero) return false;
      if (filtro === "neste-genero" && !nesteGenero) return false;
    }
    return true;
  });
}

function atualizarResumoSelecao(visiveis = musicasVisiveis()) {
  const categoria = categoriasDraft[categoriaSelect.value];
  const podeClassificar = categoria?.tipo === "genero";
  const totalVisiveisSelecionadas = visiveis.filter((musica) => codigosSelecionados.has(String(musica.codigo))).length;
  el("resumoSelecao").textContent = `${codigosSelecionados.size} selecionada(s)` +
    (codigosSelecionados.size !== totalVisiveisSelecionadas ? ` · ${totalVisiveisSelecionadas} nesta lista` : "");
  const selecionarVisiveis = el("selecionarVisiveis");
  selecionarVisiveis.checked = podeClassificar && visiveis.length > 0 && totalVisiveisSelecionadas === visiveis.length;
  selecionarVisiveis.indeterminate = podeClassificar && totalVisiveisSelecionadas > 0 && totalVisiveisSelecionadas < visiveis.length;
  selecionarVisiveis.disabled = !podeClassificar;
  el("adicionarSelecionadas").disabled = !podeClassificar || !codigosSelecionados.size;
  el("removerSelecionadas").disabled = !podeClassificar || !codigosSelecionados.size;
}

function renderizarListaMusicas() {
  const categoriaId = categoriaSelect.value;
  const categoria = categoriasDraft[categoriaId];
  const podeClassificar = categoria?.tipo === "genero";
  const bulkToolbar = document.querySelector(".bulk-toolbar");
  const bulkActions = document.querySelector(".bulk-actions");
  if (bulkToolbar) bulkToolbar.hidden = !podeClassificar;
  if (bulkActions) bulkActions.hidden = !podeClassificar;

  [...filtroClassificacao.options].forEach((option) => {
    if (option.value === "fora-do-genero" || option.value === "neste-genero") {
      option.disabled = !podeClassificar;
    }
  });
  if (!podeClassificar && (filtroClassificacao.value === "fora-do-genero" || filtroClassificacao.value === "neste-genero")) {
    filtroClassificacao.value = "todas";
  }
  if (!podeClassificar) codigosSelecionados.clear();

  listaMusicas.innerHTML = "";
  if (!categoria) {
    listaMusicas.innerHTML = '<div class="empty-state">Crie um gênero ou selecione um tema automático para consultar o catálogo.</div>';
    resumoCategoria.textContent = "";
    atualizarResumoSelecao([]);
    return;
  }

  const visiveis = musicasVisiveis();
  const codigosNoGenero = new Set((categoria.codigos || []).map(String));
  const totalCategoria = musicasDaCategoria(categoria).length;
  if (categoria.tipo === "todos") {
    resumoCategoria.textContent = `${categoria.nome}: todas as ${totalCategoria} música(s) são incluídas automaticamente. Exibindo ${visiveis.length} de ${totalCategoria}.`;
  } else if (categoria.tipo === "decada") {
    resumoCategoria.textContent = `${categoria.nome}: ${totalCategoria} música(s) nesta faixa de anos. Exibindo ${visiveis.length} de ${totalCategoria}.`;
  } else {
    resumoCategoria.textContent = `${categoria.nome}: ${codigosNoGenero.size} música(s) classificada(s). Exibindo ${visiveis.length} de ${musicasDraft.length}.`;
  }

  if (!visiveis.length) {
    listaMusicas.innerHTML = '<div class="empty-state">Nenhuma música corresponde à busca e ao filtro escolhidos.</div>';
    atualizarResumoSelecao(visiveis);
    return;
  }

  visiveis.forEach((musicaItem) => {
    const codigo = String(musicaItem.codigo);
    const row = document.createElement("div");
    row.className = "song-row";
    const elementos = [];

    if (podeClassificar) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = codigosSelecionados.has(codigo);
      checkbox.setAttribute("aria-label", `Selecionar ${musicaItem.nome} para ação em lote`);
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) codigosSelecionados.add(codigo);
        else codigosSelecionados.delete(codigo);
        atualizarResumoSelecao();
      });
      elementos.push(checkbox);
    }

    const meta = document.createElement("span");
    meta.className = "song-meta";
    const title = document.createElement("span");
    title.className = "song-title";
    title.textContent = musicaItem.nome || "Título não informado";
    const sub = document.createElement("span");
    sub.className = "song-sub";
    sub.textContent = `${musicaItem.artista || "Artista não informado"} · ${musicaItem.ano ?? "Ano não informado"}`;
    meta.append(title, document.createElement("br"), sub);
    elementos.push(meta);

    const code = document.createElement("span");
    code.className = "song-code";
    code.textContent = `#${String(musicaItem.codigo).padStart(3, "0")}`;

    const status = document.createElement("span");
    if (podeClassificar) {
      status.className = codigosNoGenero.has(codigo) ? "song-status assigned" : "song-status unassigned";
      status.textContent = codigosNoGenero.has(codigo) ? "Neste gênero" : "Fora do gênero";
    } else {
      status.className = "song-status assigned";
      status.textContent = categoria.tipo === "todos" ? "Incluída automaticamente" : "Tema por ano";
    }
    elementos.push(status, code);

    if (podeClassificar) {
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = codigosNoGenero.has(codigo) ? "button small secondary" : "button small primary";
      toggle.textContent = codigosNoGenero.has(codigo) ? "Remover" : "Adicionar";
      toggle.addEventListener("click", () => {
        alterarAssociacao(categoriaId, [codigo], codigosNoGenero.has(codigo) ? "remover" : "adicionar", false);
      });
      elementos.push(toggle);
    }

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "button small secondary";
    editButton.textContent = "Editar dados";
    editButton.addEventListener("click", () => iniciarEdicaoMusica(codigo));
    elementos.push(editButton);
    row.append(...elementos);

    if (codigosNovosRascunho.has(codigo)) {
      const removeDraftButton = document.createElement("button");
      removeDraftButton.type = "button";
      removeDraftButton.className = "button small danger";
      removeDraftButton.textContent = "Remover nova música";
      removeDraftButton.title = "Remove apenas este novo registro do rascunho; não apaga o MP3 do computador.";
      removeDraftButton.addEventListener("click", () => removerMusicaNovaDoRascunho(codigo));
      row.appendChild(removeDraftButton);
    }

    listaMusicas.appendChild(row);
  });
  atualizarResumoSelecao(visiveis);
}

function alterarAssociacao(categoriaId, codigos, acao, confirmar = false) {
  const categoria = categoriasDraft[categoriaId];
  if (!categoria || categoria.tipo !== "genero") return;
  const existentes = new Set((categoria.codigos || []).map(String));
  let alteradas = 0;
  codigos.forEach((codigo) => {
    const valor = String(codigo);
    if (acao === "adicionar" && !existentes.has(valor)) {
      existentes.add(valor);
      alteradas++;
    } else if (acao === "remover" && existentes.has(valor)) {
      existentes.delete(valor);
      alteradas++;
    }
  });
  categoria.codigos = [...existentes].sort((a, b) => Number(a) - Number(b));
  if (confirmar) codigosSelecionados.clear();
  salvarRascunho();
  renderizarListaMusicas();
  renderizarListaGeneros();
  mensagemAdmin.textContent = alteradas
    ? `${alteradas} associação(ões) ${acao === "adicionar" ? "adicionada(s) ao" : "removida(s) do"} gênero ${categoria.nome}. Alteração salva como rascunho; exporte categorias.js para aplicá-la ao projeto.`
    : `Nenhuma alteração necessária: as músicas selecionadas já estavam ${acao === "adicionar" ? "neste gênero" : "fora deste gênero"}.`;
}

async function aplicarAcaoEmLote(acao) {
  const categoria = categoriasDraft[categoriaSelect.value];
  if (!categoria || categoria.tipo !== "genero") {
    await avisarNoPainel("Selecione um gênero", "Geral e os temas automáticos servem para consulta. Selecione um gênero para classificar músicas.");
    return;
  }
  const codigos = [...codigosSelecionados];
  if (!codigos.length) {
    await avisarNoPainel("Nenhuma música selecionada", "Marque pelo menos uma música na lista.");
    return;
  }
  if (acao === "remover") {
    const confirmado = await confirmarNoPainel(
      `Remover ${codigos.length} música(s) do gênero ${categoria.nome}?`,
      "As associações selecionadas serão removidas deste gênero.",
      { detail: "As músicas e os arquivos MP3 não serão apagados.", confirmText: "Remover associações", danger: true }
    );
    if (!confirmado) return;
  }
  alterarAssociacao(categoriaSelect.value, codigos, acao, true);
}

function renderizarSeletorGenerosEdicao(codigo) {
  const container = el("editarMusicaGeneros");
  container.innerHTML = "";
  const selecionados = new Set();
  Object.entries(categoriasDraft).forEach(([id, categoria]) => {
    if (categoria.tipo === "genero" && (categoria.codigos || []).map(String).includes(String(codigo))) selecionados.add(id);
  });
  const generos = categoriasDeGenero();
  if (!generos.length) {
    container.innerHTML = '<span class="hint">Nenhum gênero cadastrado. Crie um gênero acima, se necessário.</span>';
    return;
  }
  generos.forEach(([id, categoria]) => {
    const label = document.createElement("label");
    label.className = "genre-check";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = id;
    checkbox.checked = selecionados.has(id);
    const name = document.createElement("span");
    name.textContent = categoria.nome;
    label.append(checkbox, name);
    container.appendChild(label);
  });
}

function iniciarEdicaoMusica(codigo) {
  const musica = musicasDraft.find((item) => String(item.codigo) === String(codigo));
  if (!musica) return;
  codigoEmEdicao = String(codigo);
  el("editarMusicaCodigo").textContent = `Carta #${String(codigo).padStart(3, "0")}`;
  el("editarMusicaNome").value = musica.nome || "";
  el("editarMusicaArtista").value = musica.artista || "";
  el("editarMusicaAno").value = musica.ano ?? "";
  el("editarMusicaArquivo").value = musica.arquivo || "";
  el("editarMusicaStatus").textContent = "Edite os dados e salve no rascunho. O MP3 não será movido nem substituído.";
  renderizarSeletorGenerosEdicao(codigoEmEdicao);
  el("editarMusicaWrap").hidden = false;
  el("editarMusicaWrap").scrollIntoView({ behavior: "smooth", block: "start" });
}

function cancelarEdicaoMusica() {
  codigoEmEdicao = null;
  el("editarMusicaWrap").hidden = true;
  el("formEditarMusica").reset();
  el("editarMusicaGeneros").innerHTML = "";
  el("editarMusicaStatus").textContent = "";
}

async function salvarEdicaoMusica(evento) {
  evento.preventDefault();
  if (codigoEmEdicao === null) return;
  const musica = musicasDraft.find((item) => String(item.codigo) === codigoEmEdicao);
  if (!musica) {
    await avisarNoPainel("Música não encontrada", "A música selecionada não foi encontrada no rascunho.", "error");
    cancelarEdicaoMusica();
    return;
  }
  const nome = el("editarMusicaNome").value.trim();
  const artista = el("editarMusicaArtista").value.trim();
  const anoTexto = el("editarMusicaAno").value.trim();
  const ano = anoTexto ? Number(anoTexto) : null;
  if (!nome || !artista) {
    await avisarNoPainel("Dados incompletos", "Preencha o título e o artista.");
    return;
  }
  if (anoTexto && (!Number.isInteger(ano) || ano < 1900 || ano > 2100)) {
    await avisarNoPainel("Ano inválido", "Confira o ano informado.");
    return;
  }
  const duplicada = musicasDraft.find((item) => String(item.codigo) !== codigoEmEdicao &&
    String(item.nome || "").trim().toLocaleLowerCase("pt-BR") === nome.toLocaleLowerCase("pt-BR") &&
    String(item.artista || "").trim().toLocaleLowerCase("pt-BR") === artista.toLocaleLowerCase("pt-BR"));
  if (duplicada) {
    const confirmado = await confirmarNoPainel(
      "Possível música duplicada",
      `Já existe outra música com este título e artista (carta ${duplicada.codigo}).`,
      { detail: "Deseja manter as duas versões no catálogo?", confirmText: "Manter as duas versões" }
    );
    if (!confirmado) return;
  }

  musica.nome = nome;
  musica.artista = artista;
  musica.ano = ano;
  const selecionados = new Set([...el("editarMusicaGeneros").querySelectorAll("input:checked")].map((input) => input.value));
  categoriasDeGenero().forEach(([id, categoria]) => {
    const codigos = new Set((categoria.codigos || []).map(String));
    if (selecionados.has(id)) codigos.add(codigoEmEdicao);
    else codigos.delete(codigoEmEdicao);
    categoria.codigos = [...codigos].sort((a, b) => Number(a) - Number(b));
  });
  salvarRascunho();
  limparSelecao();
  renderizarListaMusicas();
  renderizarListaGeneros();
  atualizarResumoGeral();
  mensagemAdmin.textContent = `Dados da carta ${codigoEmEdicao} atualizados no rascunho. Exporte musicas.js e categorias.js para aplicar as alterações ao projeto.`;
  cancelarEdicaoMusica();
}

async function removerMusicaNovaDoRascunho(codigo) {
  if (!codigosNovosRascunho.has(String(codigo))) return;
  const musica = musicasDraft.find((item) => String(item.codigo) === String(codigo));
  if (!musica) return;
  const confirmado = await confirmarNoPainel(
    `Remover "${musica.nome}" (carta ${codigo}) do rascunho?`,
    "O registro e suas classificações serão removidos dos arquivos que você exportar.",
    { detail: "Nenhum MP3 será apagado do computador ou do projeto.", confirmText: "Remover música", danger: true }
  );
  if (!confirmado) return;
  musicasDraft = musicasDraft.filter((item) => String(item.codigo) !== String(codigo));
  codigosNovosRascunho.delete(String(codigo));
  Object.values(categoriasDraft).forEach((categoria) => {
    if (Array.isArray(categoria.codigos)) categoria.codigos = categoria.codigos.map(String).filter((item) => item !== String(codigo));
  });
  codigosSelecionados.delete(String(codigo));
  if (codigoEmEdicao === String(codigo)) cancelarEdicaoMusica();
  if (musicaPendenteAudioCodigo === String(codigo)) {
    musicaPendenteAudioCodigo = null;
    nomeAudioNovo = null;
    audioSelecionado = null;
    if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);
    audioPreviewUrl = null;
    el("novoArquivoAudio").value = "";
    el("audioPreview").removeAttribute("src");
    el("audioPreview").load();
    el("audioPreviewWrap").hidden = true;
    atualizarBotaoBaixarAudio();
  }
  salvarRascunho();
  renderizarListaMusicas();
  renderizarListaGeneros();
  atualizarResumoGeral();
  el("novaMusicaStatus").textContent = "A música foi removida do rascunho. Nenhum MP3 foi apagado.";
  mensagemAdmin.textContent = `Carta ${codigo} removida do rascunho. Exporte os arquivos se quiser aplicar essa remoção.`;
}

function renderizarSeletorGenerosNovaMusica() {
  const container = el("novaMusicaGeneros");
  if (!container) return;
  const selecionadosAntes = new Set([...container.querySelectorAll("input:checked")].map((input) => input.value));
  container.innerHTML = "";
  const generos = categoriasDeGenero();
  if (!generos.length) {
    container.innerHTML = '<span class="hint">Crie um gênero acima para classificá-lo no cadastro.</span>';
    return;
  }
  generos.forEach(([id, categoria]) => {
    const label = document.createElement("label");
    label.className = "genre-check";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = id;
    checkbox.checked = selecionadosAntes.has(id);
    const name = document.createElement("span");
    name.textContent = categoria.nome;
    label.append(checkbox, name);
    container.appendChild(label);
  });
}

function baixarArquivo(nome, conteudo, tipo = "text/javascript;charset=utf-8") {
  const blob = new Blob([conteudo], { type: tipo });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = nome;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportarCategorias() {
  const conteudo = "/* Exportado pela ferramenta estática SOM NA MESA. */\nconst categoriasMusicais = " + JSON.stringify(categoriasDraft, null, 2) + ";\n";
  baixarArquivo("categorias.js", conteudo);
  exportFingerprints.categorias = fingerprint(categoriasDraft);
  salvarRascunho();
  el("statusExportacao").textContent = "categorias.js foi baixado. O painel registrou a impressão digital desta exportação; depois de substituir o arquivo local, a próxima abertura poderá reconhecer essa versão.";
}

function exportarMusicas() {
  const conteudo = "/* Catálogo exportado pela ferramenta estática SOM NA MESA. */\nconst musicas = " + JSON.stringify(musicasDraft, null, 2) + ";\n";
  baixarArquivo("musicas.js", conteudo);
  exportFingerprints.musicas = fingerprint(musicasDraft);
  salvarRascunho();
  el("statusExportacao").textContent = "musicas.js foi baixado. O painel registrou a impressão digital desta exportação; confira o arquivo e mantenha uma cópia do original antes de substituí-lo.";
}

function proximoCodigo() {
  const maiorId = Math.max(0, ...musicasDraft.map((musica) => Number(musica.id) || 0));
  const maiorCodigo = Math.max(0, ...musicasDraft.map((musica) => Number(musica.codigo) || 0));
  return { id: maiorId + 1, codigo: String(maiorCodigo + 1).padStart(3, "0") };
}

function prepararArquivoAudio() {
  const arquivo = el("novoArquivoAudio").files[0];
  audioSelecionado = arquivo || null;
  if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);
  audioPreviewUrl = null;
  const previewWrap = el("audioPreviewWrap");
  const preview = el("audioPreview");

  if (audioSelecionado) {
    audioPreviewUrl = URL.createObjectURL(audioSelecionado);
    preview.src = audioPreviewUrl;
    previewWrap.hidden = false;
    const codigoTexto = musicaPendenteAudioCodigo ? `O MP3 será preparado como ${musicaPendenteAudioCodigo}.mp3.` : "Adicione primeiro os dados da música para gerar o código da carta.";
    el("novaMusicaStatus").textContent = `Arquivo selecionado: ${audioSelecionado.name} (${formatarBytes(audioSelecionado.size)}). ${codigoTexto}`;
  } else {
    preview.removeAttribute("src");
    preview.load();
    previewWrap.hidden = true;
    el("novaMusicaStatus").textContent = "Nenhum MP3 selecionado. Você poderá cadastrar os dados e colocar o arquivo na pasta audio manualmente.";
  }
  atualizarBotaoBaixarAudio();
}

function formatarBytes(bytes) {
  if (!Number.isFinite(bytes)) return "tamanho desconhecido";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function atualizarBotaoBaixarAudio() {
  el("baixarNovoAudio").disabled = !audioSelecionado || !musicaPendenteAudioCodigo;
  el("baixarNovoAudio").textContent = musicaPendenteAudioCodigo
    ? `Baixar MP3 como ${musicaPendenteAudioCodigo}.mp3`
    : "Baixar MP3 com nome correto";
}

async function adicionarMusica(evento) {
  evento.preventDefault();
  const nome = el("novaMusicaNome").value.trim();
  const artista = el("novaMusicaArtista").value.trim();
  const anoTexto = el("novaMusicaAno").value.trim();
  if (!nome || !artista) return;

  if (audioSelecionado && musicaPendenteAudioCodigo) {
    await avisarNoPainel("MP3 pendente", `Antes de cadastrar outra música, baixe o MP3 pendente como ${musicaPendenteAudioCodigo}.mp3.`);
    return;
  }

  const duplicada = musicasDraft.find((musica) =>
    String(musica.nome || "").trim().toLocaleLowerCase("pt-BR") === nome.toLocaleLowerCase("pt-BR") &&
    String(musica.artista || "").trim().toLocaleLowerCase("pt-BR") === artista.toLocaleLowerCase("pt-BR")
  );
  if (duplicada) {
    const confirmado = await confirmarNoPainel(
      "Possível música duplicada",
      `Já existe uma música com este título e artista (carta ${duplicada.codigo}).`,
      { detail: "Deseja cadastrar outra versão mesmo assim?", confirmText: "Cadastrar outra versão" }
    );
    if (!confirmado) return;
  }

  const { id, codigo } = proximoCodigo();
  const ano = anoTexto ? Number(anoTexto) : null;
  if (anoTexto && (!Number.isInteger(ano) || ano < 1900 || ano > 2100)) {
    await avisarNoPainel("Ano inválido", "Confira o ano informado.");
    return;
  }

  const nova = { id, codigo, nome, artista, ano, arquivo: `audio/${codigo}.mp3` };
  musicasDraft.push(nova);
  codigosNovosRascunho.add(String(codigo));
  const generosSelecionados = [...el("novaMusicaGeneros").querySelectorAll("input:checked")].map((input) => input.value);
  generosSelecionados.forEach((generoId) => {
    if (!categoriasDraft[generoId]) return;
    const codigos = new Set((categoriasDraft[generoId].codigos || []).map(String));
    codigos.add(codigo);
    categoriasDraft[generoId].codigos = [...codigos].sort((a, b) => Number(a) - Number(b));
  });

  salvarRascunho();
  limparSelecao();
  renderizarListaMusicas();
  renderizarListaGeneros();
  renderizarSeletorGenerosNovaMusica();
  el("novaMusicaStatus").textContent = audioSelecionado
    ? `Música adicionada como carta ${codigo} e caminho ${nova.arquivo}. Agora baixe o MP3 renomeado e copie-o para a pasta audio do projeto.`
    : `Música adicionada como carta ${codigo}. O caminho esperado é ${nova.arquivo}; coloque o MP3 com esse nome na pasta audio antes de publicar.`;
  el("novaMusicaNome").value = "";
  el("novaMusicaArtista").value = "";
  el("novaMusicaAno").value = "";
  musicaPendenteAudioCodigo = audioSelecionado ? codigo : null;
  nomeAudioNovo = audioSelecionado ? `${codigo}.mp3` : null;
  atualizarBotaoBaixarAudio();
  mensagemAdmin.textContent = `Carta ${codigo} adicionada ao rascunho. Exporte musicas.js e categorias.js para preservar os dados e as classificações.`;
}

function baixarAudioRenomeado() {
  if (!audioSelecionado || !musicaPendenteAudioCodigo) return;
  const url = URL.createObjectURL(audioSelecionado);
  const link = document.createElement("a");
  link.href = url;
  link.download = nomeAudioNovo || `${musicaPendenteAudioCodigo}.mp3`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);

  audioSelecionado = null;
  nomeAudioNovo = null;
  musicaPendenteAudioCodigo = null;
  el("novoArquivoAudio").value = "";
  if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);
  audioPreviewUrl = null;
  el("audioPreview").removeAttribute("src");
  el("audioPreview").load();
  el("audioPreviewWrap").hidden = true;
  atualizarBotaoBaixarAudio();
  el("novaMusicaStatus").textContent = "MP3 baixado com o nome correto. Copie-o para a pasta audio do projeto e confirme que o caminho corresponde ao catálogo.";
}

async function descartarRascunho() {
  const confirmado = await confirmarNoPainel(
    "Descartar as alterações locais?",
    "O painel será recarregado usando os arquivos musicas.js e categorias.js atuais.",
    { detail: "As alterações que ainda estão somente neste navegador serão perdidas. Exporte ou baixe uma cópia antes, se quiser preservá-las.", confirmText: "Descartar alterações", danger: true }
  );
  if (!confirmado) return;
  localStorage.removeItem(STORAGE_KEY);
  musicasDraft = clone(catalogoOriginal);
  categoriasDraft = clone(categoriasOriginais);
  codigosNovosRascunho.clear();
  exportFingerprints = { musicas: null, categorias: null };
  cancelarEdicaoMusica();
  limparSelecao();
  audioSelecionado = null;
  nomeAudioNovo = null;
  musicaPendenteAudioCodigo = null;
  if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);
  audioPreviewUrl = null;
  el("novoArquivoAudio").value = "";
  el("audioPreview").removeAttribute("src");
  el("audioPreview").load();
  el("audioPreviewWrap").hidden = true;
  el("baixarNovoAudio").disabled = true;
  popularSeletorCategorias("pagode");
  renderizarListaGeneros();
  renderizarSeletorGenerosNovaMusica();
  atualizarResumoGeral();
  el("statusExportacao").textContent = "Rascunho descartado. Os arquivos do projeto não foram alterados.";
  mensagemAdmin.textContent = "";
}

function baixarBackupRascunhoPendente() {
  if (rascunhoPendenteRaw == null) return;
  const conteudo = rascunhoPendenteObjeto
    ? JSON.stringify(rascunhoPendenteObjeto, null, 2)
    : String(rascunhoPendenteRaw);
  baixarArquivo("backup-rascunho-antigo-som-na-mesa.json", conteudo, "application/json;charset=utf-8");
  el("draftConflictBackupStatus").textContent = "Cópia do rascunho antigo solicitada. Ela não foi aplicada aos arquivos atuais.";
}

async function descartarRascunhoPendente() {
  const confirmado = await confirmarNoPainel(
    "Descartar o rascunho antigo?",
    "O painel carregará somente os arquivos musicas.js e categorias.js atuais.",
    { detail: "Esta ação apaga o rascunho salvo neste navegador, mas não apaga nem modifica os arquivos do projeto. Recomendamos baixar uma cópia antes.", confirmText: "Descartar rascunho", danger: true }
  );
  if (!confirmado) return;
  localStorage.removeItem(STORAGE_KEY);
  musicasDraft = clone(catalogoOriginal);
  categoriasDraft = clone(categoriasOriginais);
  codigosNovosRascunho.clear();
  exportFingerprints = { musicas: null, categorias: null };
  ocultarConflitoRascunho();
  cancelarEdicaoMusica();
  limparSelecao();
  popularSeletorCategorias("pagode");
  renderizarListaGeneros();
  renderizarSeletorGenerosNovaMusica();
  atualizarResumoGeral();
  el("statusExportacao").textContent = "Rascunho antigo descartado. O painel está usando os arquivos atuais do projeto.";
  mensagemAdmin.textContent = "Nenhum arquivo foi alterado ou apagado.";
}

el("formNovaCategoria").addEventListener("submit", async (evento) => {
  evento.preventDefault();
  const campo = el("novaCategoriaNome");
  if (await criarCategoria(campo.value)) campo.value = "";
});

categoriaSelect.addEventListener("change", () => {
  limparSelecao();
  renderizarListaMusicas();
});
buscaMusica.addEventListener("input", () => {
  limparSelecao();
  renderizarListaMusicas();
});
filtroClassificacao.addEventListener("change", () => {
  limparSelecao();
  renderizarListaMusicas();
});
el("selecionarVisiveis").addEventListener("change", () => {
  musicasVisiveis().forEach((musica) => {
    if (el("selecionarVisiveis").checked) codigosSelecionados.add(String(musica.codigo));
    else codigosSelecionados.delete(String(musica.codigo));
  });
  renderizarListaMusicas();
});
el("limparSelecao").addEventListener("click", () => {
  limparSelecao();
  renderizarListaMusicas();
});
el("adicionarSelecionadas").addEventListener("click", () => aplicarAcaoEmLote("adicionar"));
el("removerSelecionadas").addEventListener("click", () => aplicarAcaoEmLote("remover"));
el("formNovaMusica").addEventListener("submit", adicionarMusica);
el("formEditarMusica").addEventListener("submit", salvarEdicaoMusica);
el("cancelarEdicaoMusica").addEventListener("click", cancelarEdicaoMusica);
el("novoArquivoAudio").addEventListener("change", prepararArquivoAudio);
el("baixarNovoAudio").addEventListener("click", baixarAudioRenomeado);
el("exportarCategorias").addEventListener("click", exportarCategorias);
el("exportarMusicas").addEventListener("click", exportarMusicas);
el("limparRascunho").addEventListener("click", descartarRascunho);
el("baixarRascunhoPendente").addEventListener("click", baixarBackupRascunhoPendente);
el("descartarRascunhoPendente").addEventListener("click", descartarRascunhoPendente);

carregarRascunho();
if (el("draftConflictOverlay").hidden && garantirCategoriasEspeciais()) salvarRascunho();
popularSeletorCategorias("pagode");
renderizarListaGeneros();
renderizarSeletorGenerosNovaMusica();
atualizarResumoGeral();
