/* Cadastro de vídeos do modo Karaokê no painel estático SOM NA MESA.
 * O navegador não publica arquivos no GitHub: o vídeo é baixado com o nome correto
 * e a metadata é exportada para karaoke.js. O usuário copia o vídeo para karaoke/videos/.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "som-na-mesa-admin-karaoke-draft-v1";
  const $ = (id) => document.getElementById(id);
  const form = $("formKaraokeVideo");
  if (!form) return;

  const originalCatalog = clone(typeof catalogoKaraoke !== "undefined" && Array.isArray(catalogoKaraoke) ? catalogoKaraoke : []);
  const originalFingerprint = fingerprint(originalCatalog);
  let catalogDraft = clone(originalCatalog);
  let exportFingerprint = null;
  let conflictRaw = null;
  let conflict = false;
  let selectedFile = null;
  let previewUrl = null;
  let selectedDuration = null;
  let pendingEntry = null;
  let editingId = null;
  let nextSequence = nextVideoSequence(catalogDraft);

  const fields = {
    titulo: $("karaokeVideoTitulo"),
    artista: $("karaokeVideoArtista"),
    ano: $("karaokeVideoAno"),
    arquivo: $("karaokeVideoArquivo"),
    previewWrap: $("karaokeVideoPreviewWrap"),
    preview: $("karaokeVideoPreview"),
    duracao: $("karaokeVideoDuracao"),
    arquivoInfo: $("karaokeVideoArquivoInfo"),
    preparar: $("karaokeVideoPreparar"),
    baixar: $("karaokeVideoBaixar"),
    cancelarPreparacao: $("karaokeVideoCancelarPreparacao"),
    cancelarEdicao: $("karaokeVideoCancelarEdicao"),
    status: $("karaokeVideoStatus"),
    busca: $("karaokeVideoBusca"),
    lista: $("karaokeVideoLista"),
    total: $("karaokeAdminTotal"),
    exportar: $("karaokeVideoExportar"),
    exportStatus: $("karaokeVideoExportStatus"),
    conflictPanel: $("karaokeAdminConflict"),
    conflictText: $("karaokeAdminConflictText"),
    conflictBackup: $("karaokeAdminBackupConflict"),
    conflictDiscard: $("karaokeAdminDiscardConflict")
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function fingerprint(value) {
    const input = JSON.stringify(value);
    let hash = 2166136261;
    for (let i = 0; i < input.length; i += 1) {
      hash ^= input.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return `${input.length}-${(hash >>> 0).toString(16).padStart(8, "0")}`;
  }

  function nextVideoSequence(catalog) {
    const maxId = (Array.isArray(catalog) ? catalog : []).reduce((max, item) => {
      const match = String(item && item.id || "").match(/^karaoke-video-(\d+)$/i);
      return match ? Math.max(max, Number(match[1]) || 0) : max;
    }, 0);
    return maxId + 1;
  }

  function formatDuration(seconds) {
    if (!Number.isFinite(Number(seconds)) || Number(seconds) <= 0) return "Duração não identificada";
    const total = Math.round(Number(seconds));
    const minutes = Math.floor(total / 60);
    const rest = total % 60;
    return `${minutes}:${String(rest).padStart(2, "0")}`;
  }

  function formatBytes(bytes) {
    if (!Number.isFinite(bytes)) return "tamanho desconhecido";
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function safeText(element, value) {
    element.textContent = String(value == null ? "" : value);
  }

  function saveDraft() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        catalogo: catalogDraft,
        nextSequence,
        baseFingerprint: originalFingerprint,
        exportFingerprint
      }));
      return true;
    } catch (error) {
      fields.status.textContent = "O navegador não conseguiu salvar o rascunho. Exporte karaoke.js antes de fechar a página.";
      return false;
    }
  }

  function showConflict(message, raw) {
    conflict = true;
    conflictRaw = raw;
    fields.conflictPanel.hidden = false;
    safeText(fields.conflictText, message);
    setControlsDisabled(true);
  }

  function hideConflict() {
    conflict = false;
    conflictRaw = null;
    fields.conflictPanel.hidden = true;
    setControlsDisabled(false);
  }

  function setControlsDisabled(disabled) {
    [fields.titulo, fields.artista, fields.ano, fields.arquivo, fields.preparar,
      fields.baixar, fields.cancelarPreparacao, fields.cancelarEdicao, fields.busca,
      fields.exportar].forEach((control) => {
      if (control) control.disabled = disabled;
    });
    fields.lista.querySelectorAll("button").forEach((button) => { button.disabled = disabled; });
  }

  function loadDraft() {
    let raw;
    try {
      raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (!draft || !Array.isArray(draft.catalogo) || !draft.baseFingerprint) {
        showConflict("O rascunho antigo está inválido. Baixe uma cópia antes de descartá-lo.", raw);
        return;
      }
      const compatible = draft.baseFingerprint === originalFingerprint || draft.exportFingerprint === originalFingerprint;
      if (!compatible) {
        showConflict("O arquivo karaoke.js mudou desde a criação ou exportação do rascunho. O rascunho foi preservado, mas não foi aplicado para evitar sobrescrever o catálogo atual.", raw);
        return;
      }
      catalogDraft = draft.catalogo;
      exportFingerprint = draft.exportFingerprint || null;
      nextSequence = Math.max(Number(draft.nextSequence) || 1, nextVideoSequence(catalogDraft));
    } catch (error) {
      showConflict("Não foi possível ler o rascunho salvo. Ele foi preservado e não será aplicado automaticamente.", typeof raw === "string" ? raw : "");
    }
  }

  function setEditingMode(item) {
    editingId = item ? String(item.id) : null;
    if (item) {
      fields.titulo.value = item.titulo || "";
      fields.artista.value = item.artista || "";
      fields.ano.value = item.ano == null ? "" : String(item.ano);
      fields.arquivo.disabled = true;
      fields.preparar.textContent = "Salvar título, cantor e ano";
      fields.cancelarEdicao.hidden = false;
      fields.baixar.hidden = true;
      fields.cancelarPreparacao.hidden = true;
      fields.status.textContent = "Modo de edição: o arquivo de vídeo e seu caminho serão preservados.";
      fields.titulo.focus();
    } else {
      fields.arquivo.disabled = false;
      fields.preparar.textContent = "Preparar cadastro";
      fields.cancelarEdicao.hidden = true;
      fields.baixar.hidden = false;
      resetFormAfterSuccess(false);
    }
  }

  function resetFormAfterSuccess(clearStatus = true) {
    editingId = null;
    pendingEntry = null;
    selectedFile = null;
    selectedDuration = null;
    fields.titulo.value = "";
    fields.artista.value = "";
    fields.ano.value = "";
    fields.arquivo.value = "";
    fields.titulo.disabled = false;
    fields.artista.disabled = false;
    fields.ano.disabled = false;
    fields.arquivo.disabled = false;
    fields.preparar.disabled = false;
    fields.preparar.textContent = "Preparar cadastro";
    fields.baixar.disabled = true;
    fields.baixar.hidden = false;
    fields.cancelarPreparacao.hidden = true;
    fields.cancelarEdicao.hidden = true;
    fields.previewWrap.hidden = true;
    fields.duracao.textContent = "Duração: —";
    fields.arquivoInfo.textContent = "";
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = null;
    fields.preview.pause();
    fields.preview.removeAttribute("src");
    fields.preview.load();
    if (clearStatus) fields.status.textContent = "Cadastro concluído. Agora copie o vídeo baixado para karaoke/videos/ e exporte karaoke.js.";
  }

  function clearPreview() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = null;
    selectedFile = null;
    selectedDuration = null;
    fields.preview.pause();
    fields.preview.removeAttribute("src");
    fields.preview.load();
    fields.previewWrap.hidden = true;
    fields.duracao.textContent = "Duração: —";
    fields.arquivoInfo.textContent = "";
  }

  function selectedExtension(file) {
    const match = String(file && file.name || "").toLowerCase().match(/\.([a-z0-9]+)$/);
    return match ? match[1] : "";
  }

  function onFileSelected() {
    if (editingId || pendingEntry) return;
    clearPreview();
    const file = fields.arquivo.files && fields.arquivo.files[0];
    if (!file) {
      fields.status.textContent = "Selecione um vídeo MP4, WebM, M4V ou MOV.";
      return;
    }
    const extension = selectedExtension(file);
    if (!["mp4", "webm", "m4v", "mov"].includes(extension)) {
      fields.arquivo.value = "";
      fields.status.textContent = "Formato não suportado. Use MP4 (recomendado), WebM, M4V ou MOV.";
      return;
    }
    selectedFile = file;
    previewUrl = URL.createObjectURL(file);
    fields.preview.src = previewUrl;
    fields.previewWrap.hidden = false;
    fields.duracao.textContent = "Duração: lendo metadados...";
    fields.arquivoInfo.textContent = `${file.name} · ${formatBytes(file.size)}. O nome final será definido pelo painel.`;
    fields.status.textContent = file.size > 90 * 1024 * 1024
      ? "Vídeo selecionado. Atenção: arquivos próximos ou acima de 100 MB podem não ser aceitos em um push normal do GitHub. Considere comprimir o vídeo antes de publicar."
      : "Vídeo selecionado. Confira a prévia e preencha os dados da música.";
    fields.preview.onloadedmetadata = () => {
      if (!selectedFile || fields.preview.src !== previewUrl) return;
      const duration = Number(fields.preview.duration);
      selectedDuration = Number.isFinite(duration) && duration > 0 ? Math.round(duration) : null;
      fields.duracao.textContent = `Duração: ${formatDuration(selectedDuration)}`;
    };
    fields.preview.onerror = () => {
      fields.duracao.textContent = "Duração não identificada";
      fields.status.textContent = "O navegador não conseguiu pré-visualizar este formato. Se o vídeo estiver correto, você ainda pode preparar o cadastro; a duração ficará sem valor.";
    };
  }

  function validateMetadata() {
    const titulo = fields.titulo.value.trim();
    const artista = fields.artista.value.trim();
    const anoText = fields.ano.value.trim();
    if (!titulo || !artista) {
      fields.status.textContent = "Preencha o nome da música e o cantor/artista.";
      return null;
    }
    let ano = null;
    if (anoText) {
      ano = Number(anoText);
      if (!Number.isInteger(ano) || ano < 1900 || ano > 2100) {
        fields.status.textContent = "Informe um ano válido entre 1900 e 2100 ou deixe o campo vazio.";
        return null;
      }
    }
    return { titulo, artista, ano };
  }

  async function prepareNewEntry() {
    const metadata = validateMetadata();
    if (!metadata) return;
    if (!selectedFile) {
      fields.status.textContent = "Selecione o arquivo de vídeo antes de preparar o cadastro.";
      return;
    }
    const duplicate = catalogDraft.find((item) =>
      String(item.titulo || "").trim().toLocaleLowerCase("pt-BR") === metadata.titulo.toLocaleLowerCase("pt-BR") &&
      String(item.artista || "").trim().toLocaleLowerCase("pt-BR") === metadata.artista.toLocaleLowerCase("pt-BR")
    );
    if (duplicate) {
      const confirmed = await window.SomNaMesaDialogs.confirm({
        title: "Possível vídeo duplicado",
        message: `Já existe uma faixa com este título e artista (ID ${duplicate.id}).`,
        detail: "Deseja cadastrar outra versão mesmo assim?",
        confirmText: "Cadastrar outra versão"
      });
      if (!confirmed) return;
    }

    const extension = selectedExtension(selectedFile);
    const sequence = nextSequence;
    const id = `karaoke-video-${String(sequence).padStart(3, "0")}`;
    const filename = `${id}.${extension}`;
    pendingEntry = {
      id,
      titulo: metadata.titulo,
      artista: metadata.artista,
      ano: metadata.ano,
      tipo: "video",
      arquivo: `karaoke/videos/${filename}`,
      duracaoSegundos: selectedDuration,
      letra: []
    };
    fields.titulo.disabled = true;
    fields.artista.disabled = true;
    fields.ano.disabled = true;
    fields.arquivo.disabled = true;
    fields.preparar.disabled = true;
    fields.baixar.disabled = false;
    fields.cancelarPreparacao.hidden = false;
    fields.status.textContent = `Cadastro preparado. Clique em “Baixar vídeo e concluir cadastro”. O arquivo será baixado como ${filename}. Depois copie-o para a pasta karaoke/videos/ do projeto.`;
  }

  function triggerDownload(file, filename) {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  function completeNewEntry() {
    if (!pendingEntry || !selectedFile) return;
    const filename = pendingEntry.arquivo.split("/").pop();
    triggerDownload(selectedFile, filename);
    catalogDraft.push(pendingEntry);
    nextSequence = Math.max(nextSequence + 1, nextVideoSequence(catalogDraft));
    saveDraft();
    renderCatalog();
    resetFormAfterSuccess(false);
    fields.status.textContent = `Cadastro adicionado ao rascunho e download de ${filename} iniciado. Copie o vídeo para karaoke/videos/ e exporte karaoke.js para registrar os metadados no projeto.`;
  }

  async function saveMetadataEdit() {
    const metadata = validateMetadata();
    if (!metadata) return;
    const index = catalogDraft.findIndex((item) => String(item.id) === String(editingId));
    if (index < 0) {
      fields.status.textContent = "Não foi possível localizar a faixa para editar. Atualize a lista e tente novamente.";
      return;
    }
    const duplicate = catalogDraft.find((item) => String(item.id) !== String(editingId) &&
      String(item.titulo || "").trim().toLocaleLowerCase("pt-BR") === metadata.titulo.toLocaleLowerCase("pt-BR") &&
      String(item.artista || "").trim().toLocaleLowerCase("pt-BR") === metadata.artista.toLocaleLowerCase("pt-BR"));
    if (duplicate) {
      const confirmed = await window.SomNaMesaDialogs.confirm({
        title: "Possível vídeo duplicado",
        message: `Já existe outra faixa com este título e artista (ID ${duplicate.id}).`,
        detail: "Deseja salvar esta versão mesmo assim?",
        confirmText: "Salvar outra versão"
      });
      if (!confirmed) return;
    }
    catalogDraft[index] = { ...catalogDraft[index], ...metadata };
    saveDraft();
    renderCatalog();
    resetFormAfterSuccess(false);
    fields.status.textContent = "Dados atualizados no rascunho. Exporte karaoke.js para aplicar ao projeto; o vídeo não foi alterado.";
  }

  async function cancelPreparation() {
    if (pendingEntry) {
      const confirmed = await window.SomNaMesaDialogs.confirm({
        title: "Cancelar preparação do vídeo?",
        message: "O vídeo ainda não foi cadastrado no catálogo.",
        detail: "Os dados preenchidos e a preparação atual serão descartados.",
        confirmText: "Cancelar preparação",
        danger: true
      });
      if (!confirmed) return;
    }
    resetFormAfterSuccess(false);
    fields.status.textContent = "Preparação cancelada. Nenhuma nova faixa foi adicionada ao catálogo.";
  }

  function cancelEdit() {
    resetFormAfterSuccess(false);
    fields.status.textContent = "Edição cancelada.";
  }

  function makeButton(label, className, action) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `button ${className}`;
    button.textContent = label;
    button.addEventListener("click", action);
    return button;
  }

  function renderCatalog() {
    fields.lista.innerHTML = "";
    const term = fields.busca.value.trim().toLocaleLowerCase("pt-BR");
    const filtered = catalogDraft.filter((item) => {
      const searchText = `${item.titulo || ""} ${item.artista || ""} ${item.ano || ""} ${item.id || ""}`.toLocaleLowerCase("pt-BR");
      return !term || searchText.includes(term);
    });
    const videoCount = catalogDraft.filter((item) => item && item.tipo === "video").length;
    safeText(fields.total, `${videoCount} vídeo(s) · ${catalogDraft.length} faixa(s) total`);

    if (!filtered.length) {
      const empty = document.createElement("div");
      empty.className = "karaoke-video-empty";
      empty.textContent = catalogDraft.length ? "Nenhuma faixa corresponde à pesquisa." : "Nenhum vídeo cadastrado. Adicione o primeiro vídeo acima. O modo Karaokê só poderá iniciar quando houver faixas suficientes para a partida.";
      fields.lista.appendChild(empty);
      return;
    }

    filtered.forEach((item) => {
      const row = document.createElement("article");
      row.className = `karaoke-video-row${item.tipo === "audio" ? " is-audio" : ""}`;
      const main = document.createElement("div");
      main.className = "karaoke-video-row-main";
      const title = document.createElement("div");
      title.className = "karaoke-video-title";
      title.textContent = item.titulo || "Título não informado";
      const meta = document.createElement("div");
      meta.className = "karaoke-video-meta";
      const year = item.ano == null || item.ano === "" ? "Ano não informado" : String(item.ano);
      meta.textContent = `${item.artista || "Artista não informado"} · ${year} · ${formatDuration(item.duracaoSegundos)}`;
      const path = document.createElement("div");
      path.className = "karaoke-video-path";
      path.textContent = `${item.arquivo || "Arquivo não informado"} · ID: ${item.id || "—"}`;
      main.append(title, meta, path);
      const type = document.createElement("span");
      type.className = "karaoke-video-type";
      type.textContent = item.tipo === "video" ? "Vídeo" : item.tipo === "audio" ? "Instrumental" : String(item.tipo || "Mídia");
      row.append(main, type);
      const actions = document.createElement("div");
      actions.className = "karaoke-video-row-actions";
      if (item.tipo === "video") {
        actions.appendChild(makeButton("Editar dados", "secondary", () => {
          if (pendingEntry) {
            fields.status.textContent = "Conclua ou cancele a preparação do vídeo antes de editar outra faixa.";
            return;
          }
          clearPreview();
          setEditingMode(item);
        }));
        actions.appendChild(makeButton("Remover do catálogo", "danger", () => removeVideo(item)));
      } else {
        const readOnly = document.createElement("span");
        readOnly.className = "hint";
        readOnly.textContent = "Áudio: preservado pelo painel de vídeos";
        actions.appendChild(readOnly);
      }
      row.appendChild(actions);
      fields.lista.appendChild(row);
    });
    if (conflict) setControlsDisabled(true);
  }

  async function removeVideo(item) {
    if (pendingEntry || editingId) {
      fields.status.textContent = "Conclua/cancele a preparação ou a edição antes de remover uma faixa.";
      return;
    }
    const confirmed = await window.SomNaMesaDialogs.confirm({
      title: `Remover “${item.titulo}” do catálogo?`,
      message: "Somente o registro desta faixa será removido de karaoke.js.",
      detail: "O arquivo de vídeo no computador e no repositório não será apagado. Se quiser removê-lo também, faça isso manualmente no VS Code.",
      confirmText: "Remover do catálogo",
      danger: true
    });
    if (!confirmed) return;
    catalogDraft = catalogDraft.filter((entry) => String(entry.id) !== String(item.id));
    saveDraft();
    renderCatalog();
    fields.exportStatus.textContent = `A faixa ${item.titulo} foi removida do rascunho. Exporte karaoke.js para aplicar. Se quiser apagar o MP4, faça isso manualmente no VS Code.`;
  }

  function exportCatalog() {
    if (conflict) return;
    if (pendingEntry) {
      fields.exportStatus.textContent = "Conclua ou cancele a preparação do vídeo antes de exportar karaoke.js.";
      return;
    }
    if (editingId) {
      fields.exportStatus.textContent = "Salve ou cancele a edição antes de exportar karaoke.js.";
      return;
    }
    const content = "/* Catálogo de mídia do modo Karaokê do SOM NA MESA. Exportado pelo painel administrativo. */\nconst catalogoKaraoke = " + JSON.stringify(catalogDraft, null, 2) + ";\n";
    const blob = new Blob([content], { type: "text/javascript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "karaoke.js";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    exportFingerprint = fingerprint(catalogDraft);
    saveDraft();
    fields.exportStatus.textContent = "karaoke.js baixado. Confira o arquivo e substitua o karaoke.js do projeto. Os vídeos devem estar copiados para a pasta karaoke/videos/ com os caminhos listados.";
  }

  function downloadConflictBackup() {
    if (conflictRaw == null) return;
    const blob = new Blob([String(conflictRaw)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "backup-rascunho-karaoke-antigo.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function discardConflictDraft() {
    const confirmed = await window.SomNaMesaDialogs.confirm({
      title: "Descartar o rascunho antigo do Karaokê?",
      message: "O painel carregará o catálogo do arquivo karaoke.js atual.",
      detail: "O rascunho salvo neste navegador será apagado. Recomendamos baixar uma cópia antes. Nenhum vídeo será apagado do projeto.",
      confirmText: "Descartar rascunho",
      danger: true
    });
    if (!confirmed) return;
    localStorage.removeItem(STORAGE_KEY);
    catalogDraft = clone(originalCatalog);
    exportFingerprint = null;
    nextSequence = nextVideoSequence(catalogDraft);
    hideConflict();
    renderCatalog();
    fields.exportStatus.textContent = "Rascunho antigo descartado. O catálogo atual foi carregado; nenhum arquivo foi modificado.";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (conflict || pendingEntry) return;
    if (editingId) await saveMetadataEdit();
    else await prepareNewEntry();
  });

  fields.arquivo.addEventListener("change", onFileSelected);
  fields.baixar.addEventListener("click", completeNewEntry);
  fields.cancelarPreparacao.addEventListener("click", cancelPreparation);
  fields.cancelarEdicao.addEventListener("click", cancelEdit);
  fields.busca.addEventListener("input", renderCatalog);
  fields.exportar.addEventListener("click", exportCatalog);
  fields.conflictBackup.addEventListener("click", downloadConflictBackup);
  fields.conflictDiscard.addEventListener("click", discardConflictDraft);

  loadDraft();
  renderCatalog();
})();
