// SOM NA MESA - modo de equipes Cante e Dance para GitHub Pages.
// Catalogo e temas permanecem em musicas.js e categorias.js.

const musica = document.getElementById("musica");
const telaInicial = document.getElementById("telaInicial");
const telaModos = document.getElementById("telaModos");
const telaEquipes = document.getElementById("telaEquipes");
const telaTemas = document.getElementById("telaTemas");
const telaDificuldade = document.getElementById("telaDificuldade");
const telaEquipeDaVez = document.getElementById("telaEquipeDaVez");
const telaJogo = document.getElementById("jogo");
const telaVitoria = document.getElementById("telaVitoria");

const iniciarJogo = document.getElementById("iniciarJogo");
const modoCanteDance = document.getElementById("modoCanteDance");
const modoDesafioMusical = document.getElementById("modoDesafioMusical");
const voltarTelaInicial = document.getElementById("voltarTelaInicial");
const voltarModos = document.getElementById("voltarModos");
const listaEquipesSetup = document.getElementById("listaEquipesSetup");
const quantidadeEquipesSetup = document.getElementById("quantidadeEquipesSetup");
const adicionarEquipe = document.getElementById("adicionarEquipe");
const confirmarEquipes = document.getElementById("confirmarEquipes");
const metaPontosInput = document.getElementById("metaPontos");
const metaPontosHint = document.getElementById("metaPontosHint");
const metaPersonalizadaAcoes = document.getElementById("metaPersonalizadaAcoes");
const alternarMetaManual = document.getElementById("alternarMetaManual");
const estimativaTempoPartida = document.getElementById("estimativaTempoPartida");
const resumoRegrasCanteDance = document.getElementById("resumoRegrasCanteDance");
const resumoRegrasDesafioMusical = document.getElementById("resumoRegrasDesafioMusical");
const statusEquipesSetup = document.getElementById("statusEquipesSetup");
const etapaSetupEquipes = document.getElementById("etapaSetupEquipes");
const tituloSetupEquipes = document.getElementById("tituloSetupEquipes");
const subtituloSetupEquipes = document.getElementById("subtituloSetupEquipes");
const avisoRevancheSetup = document.getElementById("avisoRevancheSetup");
const listaTemas = document.getElementById("listaTemas");
const mensagemTemas = document.getElementById("mensagemTemas");
const voltarEquipes = document.getElementById("voltarEquipes");
const voltarTemas = document.getElementById("voltarTemas");
const temaEscolhidoTexto = document.getElementById("temaEscolhidoTexto");
const nomeEquipeDaVez = document.getElementById("nomeEquipeDaVez");
const participantesEquipeDaVez = document.getElementById("participantesEquipeDaVez");
const etapaEquipeDaVez = document.getElementById("etapaEquipeDaVez");
const rodadaPrevista = document.getElementById("rodadaPrevista");
const instrucaoEquipeDaVez = document.getElementById("instrucaoEquipeDaVez");
const continuarEquipeDaVez = document.getElementById("continuarEquipeDaVez");

const modoAtual = document.getElementById("modoAtual");
const temaAtual = document.getElementById("temaAtual");
const dificuldadeAtual = document.getElementById("dificuldadeAtual");
const metaAtual = document.getElementById("metaAtual");
const rodadaAtual = document.getElementById("rodadaAtual");
const placarResumo = document.getElementById("placarResumo");
const placarDetalhado = document.getElementById("placarDetalhado");
const togglePlacar = document.getElementById("togglePlacar");
const placarEquipes = document.getElementById("placarEquipes");
const ultimaRodadaResumo = document.getElementById("ultimaRodadaResumo");
const textoUltimaRodada = document.getElementById("textoUltimaRodada");
const tituloFaseEquipe = document.getElementById("tituloFaseEquipe");
const instrucaoFaseEquipe = document.getElementById("instrucaoFaseEquipe");
const acoesEquipe = document.getElementById("acoesEquipe");
const cantarMusica = document.getElementById("cantarMusica");
const pularMusica = document.getElementById("pularMusica");
const votacaoEquipes = document.getElementById("votacaoEquipes");
const listaVotos = document.getElementById("listaVotos");
const confirmarVotos = document.getElementById("confirmarVotos");
const avaliacaoCanto = document.getElementById("avaliacaoCanto");
const cantoCorreto = document.getElementById("cantoCorreto");
const cantoIncorreto = document.getElementById("cantoIncorreto");
const desafiosDanca = document.getElementById("desafiosDanca");
const tituloDesafioDanca = document.getElementById("tituloDesafioDanca");
const textoDesafioDanca = document.getElementById("textoDesafioDanca");
const responsavelDanca = document.getElementById("responsavelDanca");
const ordemResponsavelDanca = document.getElementById("ordemResponsavelDanca");
const desafioCumprido = document.getElementById("desafioCumprido");
const resultadoRodada = document.getElementById("resultadoRodada");
const tituloResultadoRodada = document.getElementById("tituloResultadoRodada");
const textoResultadoRodada = document.getElementById("textoResultadoRodada");
const avisoVitoria = document.getElementById("avisoVitoria");
const textoAvisoVitoria = document.getElementById("textoAvisoVitoria");
const iniciarDesempateButton = document.getElementById("iniciarDesempate");
const tituloTelaVitoria = document.getElementById("tituloTelaVitoria");
const mensagemTelaVitoria = document.getElementById("mensagemTelaVitoria");
const nomeEquipeVencedora = document.getElementById("nomeEquipeVencedora");
const rotuloEquipeVencedora = document.getElementById("rotuloEquipeVencedora");
const pontosEquipeVencedora = document.getElementById("pontosEquipeVencedora");
const classificacaoFinal = document.getElementById("classificacaoFinal");
const reiniciarMesmasEquipes = document.getElementById("reiniciarMesmasEquipes");
const voltarInicioVitoria = document.getElementById("voltarInicioVitoria");

const carta = document.getElementById("carta");
const capaAlbum = document.getElementById("capaAlbum");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const resume = document.getElementById("resume");
const temporizador = document.getElementById("temporizador");
const pararTempo = document.getElementById("pararTempo");
const progresso = document.getElementById("progresso");
const inicio = document.getElementById("inicio");
const fim = document.getElementById("fim");
const revelar = document.getElementById("revelar");
const resposta = document.getElementById("resposta");
const nome = document.getElementById("nome");
const artista = document.getElementById("artista");
const ano = document.getElementById("ano");
const statusAudio = document.getElementById("statusAudio");
const proximaMusica = document.getElementById("proximaMusica");
const voltarAoInicio = document.getElementById("voltarAoInicio");
const modalRegrasModo = document.getElementById("modalRegrasModo");
const fecharModalRegras = document.getElementById("fecharModalRegras");
const continuarRegrasModo = document.getElementById("continuarRegrasModo");
const modalConfirmarRevanche = document.getElementById("modalConfirmarRevanche");
const textoMetaRevanche = document.getElementById("textoMetaRevanche");
const confirmarAberturaRevanche = document.getElementById("confirmarAberturaRevanche");
const cancelarConfirmacaoRevanche = document.getElementById("cancelarConfirmacaoRevanche");
const fecharConfirmacaoRevanche = document.getElementById("fecharConfirmacaoRevanche");
const modalAcaoPersonalizada = document.getElementById("modalAcaoPersonalizada");
const etiquetaModalAcao = document.getElementById("etiquetaModalAcao");
const iconeModalAcao = document.getElementById("iconeModalAcao");
const tituloModalAcao = document.getElementById("tituloModalAcao");
const mensagemModalAcao = document.getElementById("mensagemModalAcao");
const detalheModalAcao = document.getElementById("detalheModalAcao");
const tituloDetalheModalAcao = document.getElementById("tituloDetalheModalAcao");
const textoDetalheModalAcao = document.getElementById("textoDetalheModalAcao");
const confirmarModalAcao = document.getElementById("confirmarModalAcao");
const cancelarModalAcao = document.getElementById("cancelarModalAcao");
const fecharModalAcao = document.getElementById("fecharModalAcao");
let resolverModalAcao = null;
let focoAnteriorModalAcao = null;
const instrucaoResponsavelDanca = document.getElementById("instrucaoResponsavelDanca");
const descricaoRegrasModo = document.getElementById("descricaoRegrasModo");
const regrasCanteDanceDetalhes = document.getElementById("regrasCanteDanceDetalhes");
const regrasDesafioMusicalDetalhes = document.getElementById("regrasDesafioMusicalDetalhes");
const painelDesafioMusical = document.getElementById("painelDesafioMusical");
const desafioMusicalDecisao = document.getElementById("desafioMusicalDecisao");
const desafioMusicalInstrucao = document.getElementById("desafioMusicalInstrucao");
const desafiosMusicaisDisponiveis = document.getElementById("desafiosMusicaisDisponiveis");
const passarDesafioMusical = document.getElementById("passarDesafioMusical");
const desafioMusicalStatus = document.getElementById("desafioMusicalStatus");
const desafioMusicalVotacao = document.getElementById("desafioMusicalVotacao");
const listaVotosDesafioMusical = document.getElementById("listaVotosDesafioMusical");
const confirmarVotosDesafioMusical = document.getElementById("confirmarVotosDesafioMusical");
const desafioMusicalAvaliacao = document.getElementById("desafioMusicalAvaliacao");
const tituloAvaliacaoDesafioMusical = document.getElementById("tituloAvaliacaoDesafioMusical");
const textoAvaliacaoDesafioMusical = document.getElementById("textoAvaliacaoDesafioMusical");
const respostaDesafioCorreta = document.getElementById("respostaDesafioCorreta");
const respostaDesafioIncorreta = document.getElementById("respostaDesafioIncorreta");
const desafioMusicalEncerrado = document.getElementById("desafioMusicalEncerrado");

const DURACOES = { facil: 15, medio: 30, dificil: 45 };
// Valores iniciais do modo Desafio Musical. Podem ser ajustados aqui sem afetar Cante e Dance.
const PONTOS_DESAFIO_MUSICAL = Object.freeze({ cantar: 3, titulo: 2, artista: 1, ano: 3 });
const NOMES_DESAFIOS_MUSICAIS = Object.freeze({
  cantar: "cantar um trecho",
  titulo: "identificar o nome da música",
  artista: "identificar quem canta",
  ano: "acertar o ano exato"
});
let proximoIdEquipe = 3;
let equipesConfiguradas = [
  { id: "equipe-1", nome: "Equipe 1", participantes: ["", "", ""], discosOuro: 0, vinisComuns: 0 },
  { id: "equipe-2", nome: "Equipe 2", participantes: ["", "", ""], discosOuro: 0, vinisComuns: 0 }
];

let modoSelecionado = null;
let temaSelecionado = null;
let dificuldadeSelecionada = null;
let metaPontos = null;
let metaPersonalizadaAtiva = false;
let musicaAtual = null;
let tokenReproducaoAudio = 0;
let filaMusicas = [];
let ultimaMusicaId = null;
let numeroRodada = 0;
let indiceEquipeInicial = 0;
let rodada = null;
let intervaloTemporizador = null;
let tempoRestante = 0;
let responsaveisDancaPorEquipe = {};
let vencedoresEquipeIds = [];
let indiceEquipeDefinidoraDuvida = 0;
let placarExpandido = false;
let ultimoResumoRodada = "";
let modoDesempate = false;
let equipesDesempateIds = [];
let pontuacaoBaseDesempate = {};
let revancheEmConfiguracao = false;
let snapshotAntesDaRevanche = null;

function fecharModalAcaoPersonalizada(resultado = false) {
  if (!modalAcaoPersonalizada || modalAcaoPersonalizada.hidden) return;
  modalAcaoPersonalizada.hidden = true;
  document.body.classList.remove("modal-open");
  const resolver = resolverModalAcao;
  resolverModalAcao = null;
  if (focoAnteriorModalAcao && focoAnteriorModalAcao.isConnected && typeof focoAnteriorModalAcao.focus === "function") {
    focoAnteriorModalAcao.focus();
  }
  focoAnteriorModalAcao = null;
  if (resolver) resolver(Boolean(resultado));
}

function abrirModalAcaoPersonalizada(configuracao = {}) {
  if (window.SomNaMesaDialogs) {
    const opcoes = {
      title: configuracao.titulo || "Confirmar ação?",
      message: configuracao.mensagem || "Confira as informações antes de continuar.",
      eyebrow: configuracao.etiqueta || (configuracao.tipo === "aviso" ? "AVISO" : "CONFIRMAÇÃO"),
      icon: configuracao.icone || (configuracao.tipo === "aviso" ? "ℹ️" : "⚠️"),
      detailTitle: configuracao.tituloDetalhe || "O que vai acontecer?",
      detail: configuracao.detalhe || "",
      confirmText: configuracao.textoConfirmar || (configuracao.tipo === "aviso" ? "Entendi" : "Confirmar"),
      cancelText: configuracao.textoCancelar || "Cancelar",
      danger: configuracao.perigo === true,
      kind: configuracao.perigo ? "danger" : (configuracao.tipo === "aviso" ? "info" : "warning")
    };
    return configuracao.tipo === "aviso"
      ? window.SomNaMesaDialogs.alert(opcoes)
      : window.SomNaMesaDialogs.confirm(opcoes);
  }
  if (resolverModalAcao) fecharModalAcaoPersonalizada(false);
  return new Promise((resolve) => {
    resolverModalAcao = resolve;
    focoAnteriorModalAcao = document.activeElement;
    etiquetaModalAcao.textContent = configuracao.etiqueta || (configuracao.tipo === "aviso" ? "AVISO" : "CONFIRMAÇÃO");
    iconeModalAcao.textContent = configuracao.icone || (configuracao.tipo === "aviso" ? "ℹ️" : "⚠️");
    tituloModalAcao.textContent = configuracao.titulo || "Confirmar ação?";
    mensagemModalAcao.textContent = configuracao.mensagem || "Confira as informações antes de continuar.";
    detalheModalAcao.hidden = !configuracao.detalhe;
    tituloDetalheModalAcao.textContent = configuracao.tituloDetalhe || "O que vai acontecer?";
    textoDetalheModalAcao.textContent = configuracao.detalhe || "";
    confirmarModalAcao.textContent = configuracao.textoConfirmar || (configuracao.tipo === "aviso" ? "Entendi" : "Confirmar");
    confirmarModalAcao.className = configuracao.perigo ? "btn btn-danger btn-large" : "btn btn-primary btn-large";
    cancelarModalAcao.textContent = configuracao.textoCancelar || "Cancelar";
    cancelarModalAcao.hidden = configuracao.semCancelar === true;
    modalAcaoPersonalizada.hidden = false;
    document.body.classList.add("modal-open");
    confirmarModalAcao.focus();
  });
}

function confirmarAcaoPersonalizada(titulo, mensagem, configuracao = {}) {
  return abrirModalAcaoPersonalizada({ ...configuracao, titulo, mensagem, tipo: "confirmacao", semCancelar: false });
}

function mostrarAvisoPersonalizado(titulo, mensagem, configuracao = {}) {
  return abrirModalAcaoPersonalizada({ ...configuracao, titulo, mensagem, tipo: "aviso", semCancelar: true });
}

function mostrarTela(tela) {
  // A partida termina sem audio: pare o player e descarregue a faixa ao abrir a tela de vitoria.
  if (tela === telaVitoria) {
    // Invalida qualquer chamada play() ainda pendente antes de parar e descarregar o áudio.
    tokenReproducaoAudio += 1;
    pararTemporizador(false);
    musica.pause();
    if (musica.getAttribute("src")) {
      try { musica.currentTime = 0; } catch (_) {}
      musica.removeAttribute("src");
      musica.load();
    }
    musicaAtual = null;
    definirEstadoPlayer("carregado");
    statusAudio.textContent = "";
  }

  // Todas as telas principais, inclusive modos adicionados depois, são mutuamente exclusivas.
  document.querySelectorAll(".screen").forEach((item) => {
    item.hidden = item !== tela;
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function obterCategoriasOrdenadas() {
  return Object.entries(categoriasMusicais || {}).sort((a, b) => (a[1].ordem || 999) - (b[1].ordem || 999));
}

function obterMusicasDoTema(idTema) {
  const categoria = categoriasMusicais[idTema];
  if (!categoria || !Array.isArray(musicas)) return [];
  if (categoria.tipo === "todos") return musicas.filter((item) => item && item.arquivo);
  if (categoria.tipo === "decada") {
    return musicas.filter((item) => {
      const anoMusica = Number(item && item.ano);
      return item && item.arquivo && Number.isFinite(anoMusica) && anoMusica >= categoria.inicio && anoMusica <= categoria.fim;
    });
  }
  const codigos = new Set((categoria.codigos || []).map(String));
  return musicas.filter((item) => item && item.arquivo && codigos.has(String(item.codigo)));
}

function renderizarTemas() {
  listaTemas.innerHTML = "";
  mensagemTemas.textContent = "";
  obterCategoriasOrdenadas().forEach(([id, categoria]) => {
    const quantidade = obterMusicasDoTema(id).length;
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "theme-card";
    botao.style.background = `linear-gradient(145deg, ${categoria.cor || "#4c1d95"}, #111827)`;
    botao.disabled = quantidade === 0;
    botao.innerHTML = `<span class="theme-icon" aria-hidden="true">${escaparHtml(categoria.icone || "🎵")}</span><strong>${escaparHtml(categoria.nome)}</strong><span class="theme-count">${quantidade === 0 ? "Classifique músicas no catálogo" : `${quantidade} música(s) disponíveis`}</span>`;
    botao.addEventListener("click", () => selecionarTema(id));
    listaTemas.appendChild(botao);
  });
  if (!listaTemas.children.length) mensagemTemas.textContent = "Nenhum tema foi configurado em categorias.js.";
}

function selecionarTema(idTema) {
  temaSelecionado = idTema;
  const categoria = categoriasMusicais[idTema];
  temaEscolhidoTexto.textContent = `Tema selecionado: ${categoria.nome}. Agora escolha o tempo do trecho.`;
  mostrarTela(telaDificuldade);
}

function calcularMetaAutomaticaDesafioMusical(quantidadeEquipes = equipesConfiguradas.length) {
  // Meta testada em simulacoes: 3 pontos por equipe + 6 pontos de base.
  const total = Math.max(2, Number(quantidadeEquipes) || 2);
  return (3 * total) + 6;
}

function calcularMetaAutomaticaCanteDance(quantidadeEquipes = equipesConfiguradas.length) {
  // Meta aprovada para Cante e Dance: arredondar (1,5 x equipes + 8).
  const total = Math.min(12, Math.max(2, Math.floor(Number(quantidadeEquipes) || 2)));
  return Math.round((1.5 * total) + 8);
}

function calcularMetaAutomaticaModo(quantidadeEquipes = equipesConfiguradas.length) {
  if (modoSelecionado === "desafio-musical") return calcularMetaAutomaticaDesafioMusical(quantidadeEquipes);
  if (modoSelecionado === "cante-dance") return calcularMetaAutomaticaCanteDance(quantidadeEquipes);
  return 0;
}

// Médias de músicas por partida do cenário misto simulado para a meta automática.
// O tempo em minutos usa uma hipótese prática de aproximadamente 3 min por música;
// não é uma medição real e deve ser recalibrado depois de partidas com pessoas.
const MEDIA_MUSICAS_SIMULADA = Object.freeze({
  // Médias do reteste com as regras atuais: 1 ponto de votação por equipe/música,
  // sem pontuação extra progressiva e meta automática 3 x equipes + 6 (cenário misto, 1.000 partidas/equipe).
  2: 8.02, 3: 7.78, 4: 8.36, 5: 9.23, 6: 10.30,
  7: 11.66, 8: 12.93, 9: 14.42, 10: 15.92, 11: 17.71, 12: 19.60
});
const MINUTOS_ESTIMADOS_POR_MUSICA = 3;

function estimarMediaMusicasDesafioMusical(quantidadeEquipes) {
  const total = Math.max(2, Math.floor(Number(quantidadeEquipes) || 2));
  if (MEDIA_MUSICAS_SIMULADA[total]) return MEDIA_MUSICAS_SIMULADA[total];
  if (total < 2) return MEDIA_MUSICAS_SIMULADA[2];
  // Para mais de 12 equipes, extrapolação conservadora; ainda não há simulação direta.
  return MEDIA_MUSICAS_SIMULADA[12] + ((total - 12) * 0.45);
}

function formatarDuracaoEstimada(minutos) {
  if (!Number.isFinite(minutos) || minutos <= 0) return "—";
  const arredondado = Math.max(1, Math.round(minutos));
  if (arredondado < 60) return `${arredondado} minutos`;
  const horas = Math.floor(arredondado / 60);
  const resto = arredondado % 60;
  if (resto === 0) return horas === 1 ? "1 hora" : `${horas} horas`;
  return `${horas} h ${resto} min`;
}

function calcularDuracaoEstimadaPartida(metaAlvo, quantidadeEquipes = equipesConfiguradas.length) {
  const metaAutomatica = calcularMetaAutomaticaDesafioMusical(quantidadeEquipes);
  const metaValida = Number(metaAlvo);
  if (!Number.isFinite(metaValida) || metaValida <= 0) return null;
  const mediaMusicasBase = estimarMediaMusicasDesafioMusical(quantidadeEquipes);
  // Para uma meta personalizada, ajustamos proporcionalmente à meta simulada.
  const mediaMusicasAjustada = mediaMusicasBase * (metaValida / metaAutomatica);
  return mediaMusicasAjustada * MINUTOS_ESTIMADOS_POR_MUSICA;
}

function atualizarEstimativaTempoPartida() {
  if (!estimativaTempoPartida) return;
  const desafioMusical = modoSelecionado === "desafio-musical";
  estimativaTempoPartida.hidden = !desafioMusical;
  if (!desafioMusical) {
    estimativaTempoPartida.textContent = "";
    return;
  }
  const metaAtualCampo = Number(metaPontosInput.value);
  if (!Number.isInteger(metaAtualCampo) || metaAtualCampo < 1 || metaAtualCampo > 999) {
    estimativaTempoPartida.textContent = "Informe uma meta válida para estimar a duração da partida.";
    return;
  }
  const totalEquipes = equipesConfiguradas.length;
  const mediaMusicas = estimarMediaMusicasDesafioMusical(totalEquipes) * (metaAtualCampo / calcularMetaAutomaticaDesafioMusical(totalEquipes));
  const minutos = calcularDuracaoEstimadaPartida(metaAtualCampo, totalEquipes);
  const duracao = formatarDuracaoEstimada(minutos);
  const extrapolada = totalEquipes > 12 ? " Para mais de 12 equipes, a estimativa é extrapolada e menos precisa." : "";
  const base = metaPersonalizadaAtiva
    ? `Com a meta personalizada de ${metaAtualCampo} pontos, a duração média estimada é de cerca de ${duracao}.`
    : `Duração média estimada: cerca de ${duracao}.`;
  estimativaTempoPartida.innerHTML = `<strong>⏱ ${base}</strong><span class="match-time-assumption"> Estimativa baseada em cerca de ${mediaMusicas.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} músicas por partida e 3 minutos por música. O tempo real varia conforme respostas, votações e danças.${extrapolada}</span>`;
}

function atualizarAjudaMeta() {
  const desafioMusical = modoSelecionado === "desafio-musical";
  const canteDance = modoSelecionado === "cante-dance";
  const modoComMetaAutomatica = desafioMusical || canteDance;
  const labelMeta = metaPontosInput.closest("label")?.querySelector("span");
  const quantidadeEquipes = equipesConfiguradas.length;
  const metaSugerida = calcularMetaAutomaticaModo(quantidadeEquipes);
  const formula = desafioMusical
    ? `3 x ${quantidadeEquipes} + 6`
    : `1,5 x ${quantidadeEquipes} + 8`;

  if (quantidadeEquipesSetup) quantidadeEquipesSetup.value = String(quantidadeEquipes);
  if (adicionarEquipe) {
    adicionarEquipe.disabled = quantidadeEquipes >= 12;
    adicionarEquipe.title = quantidadeEquipes >= 12 ? "O limite testado e de 12 equipes." : "Adicionar mais uma equipe";
  }

  if (metaPersonalizadaAcoes) metaPersonalizadaAcoes.hidden = !modoComMetaAutomatica;
  if (alternarMetaManual) {
    alternarMetaManual.textContent = metaPersonalizadaAtiva
      ? `↺ Usar meta automática (${metaSugerida} pontos)`
      : "✎ Personalizar meta";
  }
  metaPontosInput.readOnly = modoComMetaAutomatica && !metaPersonalizadaAtiva;

  if (canteDance) {
    if (labelMeta) labelMeta.textContent = metaPersonalizadaAtiva
      ? "Meta de vitória personalizada"
      : "Meta de vitória sugerida pela quantidade de equipes";
    metaPontosInput.placeholder = metaPersonalizadaAtiva ? "Digite a meta desejada" : "Meta calculada pelas equipes";
    const metaAtualCampo = Number(metaPontosInput.value);
    if (metaPontosHint) {
      metaPontosHint.textContent = metaPersonalizadaAtiva
        ? `Meta personalizada: ${metaAtualCampo || "—"} pontos. Para ${quantidadeEquipes} equipes, a sugestão automática é ${metaSugerida} pontos (${formula}, arredondado). Sua meta personalizada será mantida se adicionar ou remover equipes; use o botão abaixo para voltar à sugestão automática. A quantidade de participantes não altera a meta.`
        : `Para ${quantidadeEquipes} equipes, a meta sugerida é ${metaSugerida} pontos (${formula}, arredondado). A meta considera a quantidade de equipes, não o número de participantes. Você pode personalizar a meta para uma partida mais curta ou mais longa.`;
    }
    if (revancheEmConfiguracao && avisoRevancheSetup) {
      avisoRevancheSetup.textContent = `Revanche com ${quantidadeEquipes} equipes. Meta atual: ${metaAtualCampo || metaSugerida} pontos; sugestão automática: ${metaSugerida} pontos. A pontuação anterior será zerada somente quando confirmar.`;
    }
    atualizarEstimativaTempoPartida();
    return;
  }

  if (!desafioMusical) {
    if (labelMeta) labelMeta.textContent = "Quantos pontos totais são necessários para vencer?";
    metaPontosInput.placeholder = "Digite a meta, por exemplo 15";
    metaPontosInput.readOnly = false;
    if (metaPontosHint) {
      metaPontosHint.textContent = "Defina a meta manualmente. Cada Disco de Ouro vale 2 pontos e cada Vinil Comum vale 1 ponto.";
    }
    atualizarEstimativaTempoPartida();
    return;
  }

  if (labelMeta) labelMeta.textContent = metaPersonalizadaAtiva
    ? "Meta de vitória personalizada"
    : "Meta de vitória sugerida pela quantidade de equipes";
  metaPontosInput.placeholder = metaPersonalizadaAtiva ? "Digite a meta desejada" : "Meta calculada pelas equipes";
  const metaAtualCampo = Number(metaPontosInput.value);
  if (metaPontosHint) {
    if (metaPersonalizadaAtiva) {
      metaPontosHint.textContent = `Meta personalizada: ${metaAtualCampo || "—"} pontos. A sugestão automática para ${quantidadeEquipes} equipes é ${metaSugerida} pontos (${formula}). Sua meta personalizada será mantida se adicionar ou remover equipes; use o botão abaixo para voltar à sugestão automática.`;
    } else {
      metaPontosHint.textContent = `Para ${quantidadeEquipes} equipes, a meta sugerida é ${metaSugerida} pontos (${formula}). A estimativa de duração aparece abaixo. Você pode personalizar a meta para uma partida mais curta ou mais longa.`;
    }
  }
  if (revancheEmConfiguracao && avisoRevancheSetup) {
    avisoRevancheSetup.textContent = `Revanche com ${quantidadeEquipes} equipes. Meta atual: ${metaAtualCampo || metaSugerida} pontos; sugestão automática: ${metaSugerida} pontos. A duração estimada é atualizada conforme a meta escolhida. O placar anterior só será zerado quando confirmar.`;
  }
  atualizarEstimativaTempoPartida();
}

function aplicarMetaAutomaticaModo() {
  if (modoSelecionado !== "desafio-musical" && modoSelecionado !== "cante-dance") return;
  if (!metaPersonalizadaAtiva) {
    metaPontosInput.value = String(calcularMetaAutomaticaModo());
  }
  atualizarAjudaMeta();
}

function alternarPersonalizacaoMeta() {
  if (modoSelecionado !== "desafio-musical" && modoSelecionado !== "cante-dance") return;
  if (metaPersonalizadaAtiva) {
    metaPersonalizadaAtiva = false;
    metaPontosInput.value = String(calcularMetaAutomaticaModo());
    metaPontosInput.readOnly = true;
    atualizarAjudaMeta();
    return;
  }
  metaPersonalizadaAtiva = true;
  metaPontosInput.readOnly = false;
  atualizarAjudaMeta();
  metaPontosInput.focus();
}

async function ajustarQuantidadeEquipesSetup(quantidadeDesejada, confirmarReducao = true) {
  const quantidadeAtual = equipesConfiguradas.length;
  const quantidade = Math.min(12, Math.max(2, Math.floor(Number(quantidadeDesejada) || 2)));

  if (quantidade < quantidadeAtual && confirmarReducao) {
    const removidas = quantidadeAtual - quantidade;
    const confirmado = await confirmarAcaoPersonalizada(
      "Reduzir quantidade de equipes?",
      `Você está alterando a partida de ${quantidadeAtual} para ${quantidade} equipes.`,
      {
        etiqueta: "ALTERAÇÃO DA PARTIDA",
        icone: "👥",
        tituloDetalhe: "O que será alterado?",
        detalhe: `${removidas} ${removidas === 1 ? "equipe será removida" : "equipes serão removidas"}, junto com os participantes cadastrados nelas. As equipes restantes serão mantidas. Se a meta estiver automática, ela será recalculada; se estiver personalizada, continuará igual. Nenhuma música ou arquivo de áudio será apagado.`,
        textoConfirmar: "Sim, reduzir equipes",
        textoCancelar: "Manter equipes",
        perigo: true
      }
    );
    if (!confirmado) {
      if (quantidadeEquipesSetup) quantidadeEquipesSetup.value = String(quantidadeAtual);
      return false;
    }
  }

  if (quantidade < quantidadeAtual) {
    equipesConfiguradas = equipesConfiguradas.slice(0, quantidade);
  } else {
    while (equipesConfiguradas.length < quantidade) {
      const numero = proximoIdEquipe++;
      equipesConfiguradas.push({
        id: `equipe-${numero}`,
        nome: `Equipe ${numero}`,
        participantes: ["", "", ""],
        discosOuro: 0,
        vinisComuns: 0
      });
    }
  }

  if (quantidadeEquipesSetup) quantidadeEquipesSetup.value = String(equipesConfiguradas.length);
  statusEquipesSetup.textContent = "";
  aplicarMetaAutomaticaModo();
  renderizarSetupEquipes();
  return true;
}
function atualizarModoTelaEquipes(revanche) {
  revancheEmConfiguracao = Boolean(revanche);
  const desafioMusical = modoSelecionado === "desafio-musical";
  if (resumoRegrasCanteDance) resumoRegrasCanteDance.hidden = desafioMusical;
  if (resumoRegrasDesafioMusical) resumoRegrasDesafioMusical.hidden = !desafioMusical;
  if (revancheEmConfiguracao) {
    etapaSetupEquipes.textContent = "REVANCHE";
    tituloSetupEquipes.textContent = "Revise as equipes";
    subtituloSetupEquipes.textContent = "A quantidade de equipes foi recuperada da partida anterior. Confira os nomes e participantes, ajuste o que quiser e confirme para jogar novamente.";
    avisoRevancheSetup.hidden = false;
    avisoRevancheSetup.textContent = `A meta atual de ${metaPontos} pontos foi mantida como ponto de partida. Você pode personalizá-la ou voltar à sugestão automática antes de confirmar.`;
    confirmarEquipes.textContent = "Confirmar revanche e jogar →";
    voltarModos.textContent = "Cancelar revanche — voltar ao resultado";
  } else {
    etapaSetupEquipes.textContent = "SEGUNDA ETAPA";
    tituloSetupEquipes.textContent = "Monte as equipes";
    subtituloSetupEquipes.textContent = "Primeiro escolha quantas equipes vão jogar. Depois, dê um nome a cada equipe e cadastre os participantes. Cada equipe começa com três campos, mas você pode adicionar mais pessoas.";
    avisoRevancheSetup.hidden = true;
    avisoRevancheSetup.textContent = "";
    confirmarEquipes.textContent = "Continuar para os temas →";
    voltarModos.textContent = "← Voltar aos modos";
  }
  if (quantidadeEquipesSetup) quantidadeEquipesSetup.value = String(equipesConfiguradas.length);
  atualizarAjudaMeta();
}
function clonarEquipes(equipes) {
  return JSON.parse(JSON.stringify(equipes));
}

function fecharModalConfirmacaoRevanche() {
  modalConfirmarRevanche.hidden = true;
  document.body.classList.remove("modal-open");
}

function abrirConfiguracaoRevanche() {
  snapshotAntesDaRevanche = {
    equipes: clonarEquipes(equipesConfiguradas),
    metaPontos,
    valorCampoMeta: metaPontosInput.value,
    metaPersonalizadaAtiva,
    vencedoresEquipeIds: [...vencedoresEquipeIds]
  };
  metaPontosInput.value = String(metaPontos || 10);
  statusEquipesSetup.textContent = "";
  atualizarModoTelaEquipes(true);
  renderizarSetupEquipes();
  mostrarTela(telaEquipes);
}

function cancelarConfiguracaoRevanche() {
  if (snapshotAntesDaRevanche) {
    equipesConfiguradas = clonarEquipes(snapshotAntesDaRevanche.equipes);
    metaPontos = snapshotAntesDaRevanche.metaPontos;
    metaPontosInput.value = snapshotAntesDaRevanche.valorCampoMeta;
    metaPersonalizadaAtiva = Boolean(snapshotAntesDaRevanche.metaPersonalizadaAtiva);
    vencedoresEquipeIds = [...snapshotAntesDaRevanche.vencedoresEquipeIds];
  }
  snapshotAntesDaRevanche = null;
  revancheEmConfiguracao = false;
  atualizarModoTelaEquipes(false);
  renderizarSetupEquipes();
  renderizarTelaVitoria();
  mostrarTela(telaVitoria);
}

function renderizarSetupEquipes() {
  listaEquipesSetup.innerHTML = "";
  if (quantidadeEquipesSetup) quantidadeEquipesSetup.value = String(equipesConfiguradas.length);
  if (adicionarEquipe) adicionarEquipe.disabled = equipesConfiguradas.length >= 12;
  equipesConfiguradas.forEach((equipe, indiceEquipe) => {
    const card = document.createElement("article");
    card.className = "team-setup-card";

    const head = document.createElement("div");
    head.className = "team-setup-heading";
    const title = document.createElement("h2");
    title.textContent = equipe.nome || `Equipe ${indiceEquipe + 1}`;
    const count = document.createElement("span");
    count.className = "team-member-count";
    const totalPreenchidos = equipe.participantes.filter((nome) => String(nome).trim()).length;
    count.textContent = `${totalPreenchidos} participante(s)`;
    head.append(title, count);

    const nameLabel = document.createElement("label");
    nameLabel.className = "field team-name-field";
    const nameCaption = document.createElement("span");
    nameCaption.textContent = "Nome da equipe";
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.maxLength = 50;
    nameInput.required = true;
    nameInput.value = equipe.nome;
    nameInput.placeholder = `Ex.: Equipe ${indiceEquipe + 1}`;
    nameInput.setAttribute("aria-label", `Nome da equipe ${indiceEquipe + 1}`);
    nameInput.addEventListener("input", () => {
      equipe.nome = nameInput.value;
      title.textContent = nameInput.value || `Equipe ${indiceEquipe + 1}`;
    });
    nameLabel.append(nameCaption, nameInput);

    const members = document.createElement("div");
    members.className = "member-input-grid";
    equipe.participantes.forEach((nomeParticipante, slot) => {
      const row = document.createElement("div");
      row.className = "member-input-row";
      const label = document.createElement("label");
      label.className = "field member-field";
      const caption = document.createElement("span");
      caption.textContent = `Participante ${slot + 1}`;
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 60;
      input.value = nomeParticipante || "";
      input.placeholder = `Digite o nome do participante ${slot + 1}`;
      input.setAttribute("aria-label", `${caption.textContent} da ${equipe.nome || `equipe ${indiceEquipe + 1}`}`);
      input.addEventListener("input", () => {
        equipe.participantes[slot] = input.value;
        const total = equipe.participantes.filter((nome) => String(nome).trim()).length;
        count.textContent = `${total} participante(s)`;
        updateSummary();
      });
      label.append(caption, input);
      row.appendChild(label);
      if (equipe.participantes.length > 1) {
        const removeMember = document.createElement("button");
        removeMember.type = "button";
        removeMember.className = "member-remove-button";
        removeMember.textContent = "×";
        removeMember.title = `Remover campo do participante ${slot + 1}`;
        removeMember.setAttribute("aria-label", `Remover campo do participante ${slot + 1} da ${equipe.nome}`);
        removeMember.addEventListener("click", () => {
          equipe.participantes.splice(slot, 1);
          if (!equipe.participantes.length) equipe.participantes.push("");
          renderizarSetupEquipes();
        });
        row.appendChild(removeMember);
      }
      members.appendChild(row);
    });

    const foot = document.createElement("div");
    foot.className = "team-setup-foot";
    const memberSummary = document.createElement("span");
    memberSummary.className = "hint team-member-summary";
    const updateSummary = () => {
      const total = equipe.participantes.filter((nome) => String(nome).trim()).length;
      memberSummary.textContent = `${total} nome(s) preenchido(s) · ${equipe.participantes.length} campo(s)`;
    };
    updateSummary();

    const memberActions = document.createElement("div");
    memberActions.className = "team-member-actions";
    const addMember = document.createElement("button");
    addMember.type = "button";
    addMember.className = "button small secondary add-member-button";
    addMember.textContent = "＋ Adicionar participante";
    addMember.addEventListener("click", () => {
      equipe.participantes.push("");
      renderizarSetupEquipes();
      const cards = [...listaEquipesSetup.querySelectorAll(".team-setup-card")];
      const currentCard = cards[indiceEquipe];
      const inputs = currentCard?.querySelectorAll(".member-field input");
      inputs?.[inputs.length - 1]?.focus();
    });
    memberActions.appendChild(addMember);

    if (equipesConfiguradas.length > 2) {
      const removeTeam = document.createElement("button");
      removeTeam.type = "button";
      removeTeam.className = "button small danger";
      removeTeam.textContent = "Remover equipe";
      removeTeam.addEventListener("click", async () => {
        if (equipesConfiguradas.length <= 2) return;
        const confirmado = await confirmarAcaoPersonalizada(
          `Remover ${equipe.nome}?`,
          "Esta equipe será retirada da configuração da partida.",
          {
            etiqueta: "REMOVER EQUIPE",
            icone: "👥",
            tituloDetalhe: "O que acontece com os participantes?",
            detalhe: "Os participantes cadastrados nesta equipe também serão removidos desta configuração. As demais equipes e seus participantes serão mantidos. Você poderá adicionar outra equipe antes de iniciar a partida.",
            textoConfirmar: "Remover equipe",
            textoCancelar: "Manter equipe",
            perigo: true
          }
        );
        if (!confirmado) return;
        equipesConfiguradas = equipesConfiguradas.filter((item) => item.id !== equipe.id);
        if (quantidadeEquipesSetup) quantidadeEquipesSetup.value = String(equipesConfiguradas.length);
        aplicarMetaAutomaticaModo();
        renderizarSetupEquipes();
      });
      memberActions.appendChild(removeTeam);
    }

    foot.append(memberSummary, memberActions);
    card.append(head, nameLabel, members, foot);
    listaEquipesSetup.appendChild(card);
  });
}

function validarSetupEquipes() {
  const meta = Number(metaPontosInput.value);
  if (!Number.isInteger(meta) || meta < 1 || meta > 999) {
    statusEquipesSetup.textContent = "Defina uma meta de pontos entre 1 e 999 para vencer.";
    metaPontosInput.focus();
    return false;
  }
  if (equipesConfiguradas.length < 2) {
    statusEquipesSetup.textContent = "Cadastre pelo menos duas equipes.";
    return false;
  }
  const nomesEquipes = new Set();
  for (const equipe of equipesConfiguradas) {
    equipe.nome = equipe.nome.trim();
    equipe.participantes = equipe.participantes.map((nome) => String(nome || "").trim());
    if (!equipe.nome) {
      statusEquipesSetup.textContent = "Todas as equipes precisam ter um nome.";
      return false;
    }
    const nomeNormalizado = equipe.nome.toLocaleLowerCase("pt-BR");
    if (nomesEquipes.has(nomeNormalizado)) {
      statusEquipesSetup.textContent = `O nome de equipe "${equipe.nome}" está repetido. Use nomes diferentes.`;
      return false;
    }
    nomesEquipes.add(nomeNormalizado);
    if (!equipe.participantes.some(Boolean)) {
      statusEquipesSetup.textContent = `Informe pelo menos um participante para ${equipe.nome}.`;
      return false;
    }
  }
  metaPontos = meta;
  statusEquipesSetup.textContent = "";
  return true;
}

function prepararEquipesParaPartida() {
  equipesConfiguradas.forEach((equipe) => {
    equipe.discosOuro = 0;
    equipe.vinisComuns = 0;
    equipe.pontosDesafioMusical = 0;
    equipe.pontosVotoDesafio = 0;
  });
  responsaveisDancaPorEquipe = {};
  vencedoresEquipeIds = [];
  indiceEquipeDefinidoraDuvida = 0;
  numeroRodada = 0;
  ultimaMusicaId = null;
  indiceEquipeInicial = 0;
  modoDesempate = false;
  equipesDesempateIds = [];
  pontuacaoBaseDesempate = {};
  placarExpandido = false;
  ultimoResumoRodada = "";
  if (ultimaRodadaResumo) ultimaRodadaResumo.hidden = true;
  if (textoUltimaRodada) textoUltimaRodada.textContent = "";
  if (placarDetalhado) placarDetalhado.hidden = true;
  if (togglePlacar) {
    togglePlacar.setAttribute("aria-expanded", "false");
    togglePlacar.textContent = "Ver placar";
  }
}

function selecionarEquipeParaTema() {
  if (!validarSetupEquipes()) return;
  if (revancheEmConfiguracao) {
    confirmarRevancheComEquipesEditadas();
    return;
  }
  renderizarTemas();
  mostrarTela(telaTemas);
}

function embaralhar(lista) {
  const copia = lista.slice();
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function prepararFila() {
  filaMusicas = embaralhar(obterMusicasDoTema(temaSelecionado));
  if (filaMusicas.length > 1 && filaMusicas[filaMusicas.length - 1].id === ultimaMusicaId) {
    [filaMusicas[0], filaMusicas[filaMusicas.length - 1]] = [filaMusicas[filaMusicas.length - 1], filaMusicas[0]];
  }
}

function obterEquipe(id) {
  return equipesConfiguradas.find((equipe) => equipe.id === id) || null;
}

function equipesAtivasDaPartida() {
  if (modoDesempate && equipesDesempateIds.length) {
    return equipesConfiguradas.filter((equipe) => equipesDesempateIds.includes(equipe.id));
  }
  return equipesConfiguradas;
}

function equipeDaVez() {
  if (!rodada) return null;
  const ids = rodada.equipesParticipantesIds || equipesAtivasDaPartida().map((equipe) => equipe.id);
  return obterEquipe(ids[rodada.indiceEquipeAtual]) || null;
}

function mostrarTelaEquipeDaVez() {
  // Cancela tentativas de reprodução pendentes antes de trocar para a tela de preparação.
  tokenReproducaoAudio += 1;
  pararTemporizador(false);
  musica.pause();
  musica.removeAttribute("src");
  musica.load();
  musicaAtual = null;
  definirEstadoPlayer("carregado");
  const equipesAtivas = equipesAtivasDaPartida();
  if (!equipesAtivas.length) return;
  const equipe = equipesAtivas[indiceEquipeInicial % equipesAtivas.length];
  etapaEquipeDaVez.textContent = modoDesempate ? "RODADA DE DESEMPATE" : "ANTES DA RODADA";
  nomeEquipeDaVez.textContent = equipe.nome;
  participantesEquipeDaVez.textContent = equipe.participantes.filter(Boolean).join(" · ") || "Participantes não informados";
  rodadaPrevista.textContent = `RODADA ${numeroRodada + 1}`;
  instrucaoEquipeDaVez.textContent = modoDesempate
    ? "Só as equipes empatadas participam deste desempate. Ao continuar, a próxima música será sorteada."
    : modoSelecionado === "desafio-musical"
      ? "Ao continuar, a música começa. A equipe da vez escolherá uma tentativa entre cantar, título, artista ou ano."
      : "Quando todos estiverem prontos, toque em continuar para sortear e iniciar a música.";
  continuarEquipeDaVez.textContent = modoDesempate ? "Continuar para o desempate →" : "Continuar — sortear música →";
  mostrarTela(telaEquipeDaVez);
}

function iniciarNovaRodada() {
  if (!filaMusicas.length) prepararFila();
  if (!filaMusicas.length) {
    statusAudio.textContent = "Não há músicas disponíveis neste tema. Confira as categorias no catálogo.";
    mostrarTela(telaJogo);
    return;
  }
  const equipesAtivas = equipesAtivasDaPartida();
  if (!equipesAtivas.length) return;
  pararTemporizador(false);
  musica.pause();
  musicaAtual = filaMusicas.pop();
  ultimaMusicaId = musicaAtual.id;
  numeroRodada += 1;
  rodada = {
    etapa: modoSelecionado === "desafio-musical" ? "decisao-desafio-musical" : "decisao",
    indiceEquipeAtual: indiceEquipeInicial % equipesAtivas.length,
    equipesParticipantesIds: equipesAtivas.map((equipe) => equipe.id),
    equipesQuePassaram: new Set(),
    equipeCantoraId: null,
    votos: {},
    votosEmEdicao: new Set(),
    equipesElegiveisVoto: [],
    desafiosDanca: [],
    indiceDesafioDanca: 0,
    tipoTodasPassaram: false,
    resultado: null,
    // Estado adicional, usado somente pelo modo Desafio Musical.
    desafiosResolvidos: new Set(),
    equipesQueResponderam: new Set(),
    equipesSemDireitoVoto: new Set(),
    equipesQueParticiparam: new Set(),
    equipesQueAcertaram: new Set(),
    equipesQuePontuaram: new Set(),
    equipesQueAcertaramVoto: new Set(),
    equipesJaAgendadasParaDancar: new Set(),
    desafioSelecionado: null,
    equipeRespondenteId: null,
    disputaEncerrada: false,
    encerrarAposDancas: false
  };
  indiceEquipeInicial = (indiceEquipeInicial + 1) % equipesAtivas.length;

  musica.src = musicaAtual.arquivo;
  musica.load();
  musica.volume = 1;
  capaAlbum.src = "img/capa-oficial.jpg";
  modoAtual.textContent = modoDesempate
    ? `${modoSelecionado === "desafio-musical" ? "DESAFIO MUSICAL" : "CANTE E DANCE"} · DESEMPATE`
    : modoSelecionado === "desafio-musical" ? "DESAFIO MUSICAL" : "CANTE E DANCE";
  temaAtual.textContent = (categoriasMusicais[temaSelecionado]?.nome || "GERAL").toLocaleUpperCase("pt-BR");
  dificuldadeAtual.textContent = `${nomeDificuldade(dificuldadeSelecionada)} · ${DURACOES[dificuldadeSelecionada]} S`;
  metaAtual.textContent = modoDesempate ? "RODADA DE DESEMPATE" : `META: ${metaPontos} PONTOS`;
  rodadaAtual.textContent = `RODADA ${numeroRodada}`;
  carta.textContent = `Rodada ${numeroRodada} · Carta #${String(musicaAtual.codigo || musicaAtual.id).padStart(3, "0")}`;
  document.getElementById("titulo").textContent = "Música sorteada";
  nome.textContent = musicaAtual.nome || "Título não informado";
  artista.textContent = musicaAtual.artista || "Artista não informado";
  ano.textContent = musicaAtual.ano == null ? "Ano não informado" : `Ano: ${musicaAtual.ano}`;
  resposta.hidden = true;
  // O anfitrião pode consultar título, artista e ano a qualquer momento durante a música.
  revelar.disabled = false;
  revelar.textContent = "👁 Revelar resposta";
  progresso.value = 0;
  inicio.textContent = "00:00";
  fim.textContent = "00:00";
  statusAudio.textContent = "";
  definirEstadoPlayer("carregado");
  renderizarPlacar();
  renderizarEstadoRodada();
  mostrarTela(telaJogo);
  tocarMusica();
}

function nomeDificuldade(id) {
  return ({ facil: "FÁCIL", medio: "MÉDIO", dificil: "DIFÍCIL" })[id] || "FÁCIL";
}

function definirEstadoPlayer(estado) {
  play.hidden = estado === "tocando" || estado === "pausado";
  pause.hidden = estado !== "tocando";
  resume.hidden = estado !== "pausado";
  if (estado === "fim") {
    play.hidden = false;
    play.textContent = "↻ Ouvir novamente";
    pause.hidden = true;
    resume.hidden = true;
  } else if (estado !== "fim") {
    play.textContent = "▶ Tocar música";
  }
}

async function tocarMusica() {
  const musicaDaChamada = musicaAtual;
  if (!musicaDaChamada) return;
  const tokenDaChamada = ++tokenReproducaoAudio;
  try {
    await musica.play();
    // Uma promessa de play() pode resolver depois que a rodada terminou ou outra música começou.
    // Não deixe uma chamada antiga reativar os controles nem interferir na rodada atual.
    if (
      tokenDaChamada !== tokenReproducaoAudio ||
      musicaAtual !== musicaDaChamada ||
      !telaVitoria.hidden ||
      telaJogo.hidden
    ) return;
    definirEstadoPlayer("tocando");
    statusAudio.textContent = "";
  } catch (erro) {
    if (
      tokenDaChamada !== tokenReproducaoAudio ||
      musicaAtual !== musicaDaChamada ||
      !telaVitoria.hidden ||
      telaJogo.hidden
    ) return;
    definirEstadoPlayer("carregado");
    statusAudio.textContent = "Toque em “Tocar música” para iniciar o áudio.";
    console.warn("A reprodução automática não foi permitida pelo navegador:", erro);
  }
}

function pausarMusica() {
  // Invalida uma chamada play() pendente para que ela não reative o player depois da pausa.
  tokenReproducaoAudio += 1;
  musica.pause();
  definirEstadoPlayer("pausado");
}

function iniciarTemporizador() {
  if (!musicaAtual || intervaloTemporizador) return;
  tempoRestante = DURACOES[dificuldadeSelecionada] || 15;
  if (musica.paused) tocarMusica();
  temporizador.disabled = true;
  temporizador.textContent = `⏱ ${tempoRestante}s`;
  pararTempo.hidden = false;
  intervaloTemporizador = setInterval(() => {
    tempoRestante -= 1;
    temporizador.textContent = `⏱ ${Math.max(tempoRestante, 0)}s`;
    if (tempoRestante <= 0) pararTemporizador(true);
  }, 1000);
}

function pararTemporizador(pausarAudio = true) {
  if (intervaloTemporizador) {
    clearInterval(intervaloTemporizador);
    intervaloTemporizador = null;
  }
  if (pausarAudio) {
    tokenReproducaoAudio += 1;
    musica.pause();
    if (musicaAtual) definirEstadoPlayer("pausado");
  }
  temporizador.disabled = false;
  temporizador.textContent = "⏱ Iniciar tempo";
  pararTempo.hidden = true;
  tempoRestante = 0;
}

function converterTempo(segundos) {
  if (!Number.isFinite(segundos)) return "00:00";
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${min}:${String(seg).padStart(2, "0")}`;
}

function escaparHtml(valor) {
  return String(valor).replace(/[&<>"']/g, (caractere) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[caractere]);
}

function calcularPontos(equipe) {
  if (modoSelecionado === "desafio-musical") {
    return (Number(equipe.pontosDesafioMusical) || 0) + (Number(equipe.pontosVotoDesafio) || 0);
  }
  return (Number(equipe.discosOuro) || 0) * 2 + (Number(equipe.vinisComuns) || 0);
}

function verificarVitoria() {
  if (modoDesempate && equipesDesempateIds.length) {
    const empatadas = equipesConfiguradas.filter((equipe) => equipesDesempateIds.includes(equipe.id));
    if (!empatadas.length) {
      vencedoresEquipeIds = [];
      return;
    }
    const maiorPontuacao = Math.max(...empatadas.map(calcularPontos));
    const lideres = empatadas.filter((equipe) => calcularPontos(equipe) === maiorPontuacao);
    const houveAvanco = empatadas.some((equipe) => calcularPontos(equipe) > (pontuacaoBaseDesempate[equipe.id] ?? calcularPontos(equipe)));
    vencedoresEquipeIds = houveAvanco && lideres.length === 1 ? [lideres[0].id] : [];
    return;
  }

  const elegiveis = equipesConfiguradas.filter((equipe) => calcularPontos(equipe) >= metaPontos);
  if (!elegiveis.length) {
    vencedoresEquipeIds = [];
    return;
  }
  const maiorPontuacao = Math.max(...elegiveis.map(calcularPontos));
  vencedoresEquipeIds = elegiveis
    .filter((equipe) => calcularPontos(equipe) === maiorPontuacao)
    .map((equipe) => equipe.id);
}

function textoVitoria() {
  const vencedores = vencedoresEquipeIds.map(obterEquipe).filter(Boolean);
  if (!vencedores.length) return "";
  const pontos = Math.max(...vencedores.map(calcularPontos));
  if (vencedores.length > 1) {
    return `⚡ Empate! ${vencedores.map((equipe) => equipe.nome).join(" e ")} estão empatadas com ${pontos} pontos. O desempate será liberado após os desafios desta rodada.`;
  }
  return modoDesempate
    ? `🏆 ${vencedores[0].nome} venceu o desempate com ${pontos} pontos!`
    : `🏆 ${vencedores[0].nome} venceu com ${pontos} pontos! Meta alcançada.`;
}

function renderizarPlacar() {
  placarResumo.innerHTML = "";
  placarEquipes.innerHTML = "";
  const equipeAtualId = rodada && ["decisao", "decisao-desafio-musical"].includes(rodada.etapa) ? equipeDaVez()?.id : null;

  equipesConfiguradas.forEach((equipe, indice) => {
    const totalPontos = calcularPontos(equipe);
    const chip = document.createElement("span");
    chip.className = `score-summary-chip${equipe.id === equipeAtualId ? " is-active" : ""}`;
    const chipName = document.createElement("strong");
    chipName.textContent = equipe.nome;
    const chipPoints = document.createElement("span");
    chipPoints.textContent = `${totalPontos} pts`;
    chip.append(chipName, chipPoints);
    placarResumo.appendChild(chip);

    const card = document.createElement("article");
    card.className = `score-team-card${equipe.id === equipeAtualId ? " is-active" : ""}`;
    const header = document.createElement("div");
    header.className = "score-team-heading";
    const name = document.createElement("strong");
    name.textContent = equipe.nome;
    const tag = document.createElement("span");
    tag.className = "score-team-number";
    tag.textContent = `EQUIPE ${indice + 1}`;
    header.append(name, tag);
    const scores = document.createElement("div");
    scores.className = "score-team-tokens";
    const total = document.createElement("span");
    total.className = "points-token";
    total.textContent = `🏆 ${totalPontos} ${totalPontos === 1 ? "ponto" : "pontos"}`;
    const gold = document.createElement("span");
    gold.className = "gold-token";
    const vinyl = document.createElement("span");
    vinyl.className = "vinyl-token";
    if (modoSelecionado === "desafio-musical") {
      gold.textContent = `🎯 Respostas: ${Number(equipe.pontosDesafioMusical) || 0} pts`;
      vinyl.textContent = `🗳️ Votações: ${Number(equipe.pontosVotoDesafio) || 0} pts`;
    } else {
      gold.textContent = `💿 ${equipe.discosOuro} ${equipe.discosOuro === 1 ? "Disco de Ouro" : "Discos de Ouro"} · 2 pts cada`;
      vinyl.textContent = `🎵 ${equipe.vinisComuns} ${equipe.vinisComuns === 1 ? "Vinil Comum" : "Vinis Comuns"} · 1 pt cada`;
    }
    scores.append(total, gold, vinyl);
    card.append(header, scores);
    placarEquipes.appendChild(card);
  });

  if (ultimaRodadaResumo && textoUltimaRodada) {
    ultimaRodadaResumo.hidden = !ultimoResumoRodada;
    textoUltimaRodada.textContent = ultimoResumoRodada;
  }
  placarDetalhado.hidden = !placarExpandido;
  togglePlacar.setAttribute("aria-expanded", String(placarExpandido));
  togglePlacar.textContent = placarExpandido ? "Ocultar placar" : "Ver placar";
}

function renderizarTelaVitoria() {
  const vencedores = vencedoresEquipeIds.map(obterEquipe).filter(Boolean);
  const empate = vencedores.length > 1;
  const maiorPontuacao = vencedores.length ? Math.max(...vencedores.map(calcularPontos)) : 0;

  tituloTelaVitoria.textContent = empate ? "Empate na liderança!" : "Temos uma equipe campeã!";
  mensagemTelaVitoria.textContent = empate
    ? "Duas ou mais equipes terminaram na frente. Confira a classificação e inicie o desempate."
    : modoDesempate
      ? "Desempate concluído! A equipe vencedora levou a melhor na rodada decisiva."
      : "A meta foi alcançada. Parabéns à equipe vencedora!";
  rotuloEquipeVencedora.textContent = empate ? "EQUIPES NA LIDERANÇA" : "EQUIPE VENCEDORA";
  nomeEquipeVencedora.textContent = vencedores.map((equipe) => equipe.nome).join(" · ") || "Sem vencedora definida";
  pontosEquipeVencedora.textContent = empate
    ? `${maiorPontuacao} pontos cada · desempate necessário`
    : modoDesempate
      ? `${maiorPontuacao} ${maiorPontuacao === 1 ? "ponto" : "pontos"} · venceu o desempate`
      : `${maiorPontuacao} ${maiorPontuacao === 1 ? "ponto" : "pontos"} · meta de ${metaPontos} alcançada`;

  classificacaoFinal.innerHTML = "";
  const classificadas = equipesConfiguradas
    .map((equipe, indiceOriginal) => ({ equipe, indiceOriginal, pontos: calcularPontos(equipe) }))
    .sort((a, b) => modoSelecionado === "desafio-musical"
      ? b.pontos - a.pontos || (Number(b.equipe.pontosDesafioMusical) || 0) - (Number(a.equipe.pontosDesafioMusical) || 0) || a.indiceOriginal - b.indiceOriginal
      : b.pontos - a.pontos || b.equipe.discosOuro - a.equipe.discosOuro || b.equipe.vinisComuns - a.equipe.vinisComuns || a.indiceOriginal - b.indiceOriginal);

  let posicaoAnterior = 0;
  let pontosAnteriores = null;
  classificadas.forEach((item, indice) => {
    const { equipe, pontos } = item;
    const empatadaEmPontos = pontosAnteriores === pontos;
    const posicao = empatadaEmPontos ? posicaoAnterior : indice + 1;
    posicaoAnterior = posicao;
    pontosAnteriores = pontos;

    const linha = document.createElement("li");
    const ehVencedora = vencedoresEquipeIds.includes(equipe.id);
    linha.className = `final-ranking-item${ehVencedora ? " is-champion" : ""}${empatadaEmPontos ? " is-tied" : ""}`;

    const lugar = document.createElement("span");
    lugar.className = "final-ranking-position";
    lugar.textContent = posicao === 1 ? "🥇" : posicao === 2 ? "🥈" : posicao === 3 ? "🥉" : `${posicao}º`;
    lugar.setAttribute("aria-label", `${posicao}º lugar`);

    const info = document.createElement("div");
    info.className = "final-ranking-info";
    const nomeEquipe = document.createElement("strong");
    nomeEquipe.textContent = equipe.nome;
    const detalhes = document.createElement("span");
    detalhes.textContent = modoSelecionado === "desafio-musical"
      ? `Respostas: ${Number(equipe.pontosDesafioMusical) || 0} pts · Votações: ${Number(equipe.pontosVotoDesafio) || 0} pts`
      : `${equipe.discosOuro} ${equipe.discosOuro === 1 ? "Disco de Ouro" : "Discos de Ouro"} · ${equipe.vinisComuns} ${equipe.vinisComuns === 1 ? "Vinil Comum" : "Vinis Comuns"}`;
    info.append(nomeEquipe, detalhes);

    const pontosEquipe = document.createElement("strong");
    pontosEquipe.className = "final-ranking-points";
    pontosEquipe.textContent = `${pontos} ${pontos === 1 ? "pt" : "pts"}`;

    const marcador = document.createElement("span");
    marcador.className = "final-ranking-badge";
    marcador.textContent = empate && ehVencedora ? "EMPATE" : ehVencedora ? "CAMPEÃ" : "";
    if (!marcador.textContent) marcador.hidden = true;

    linha.append(lugar, info, pontosEquipe, marcador);
    classificacaoFinal.appendChild(linha);
  });

  iniciarDesempateButton.hidden = !empate;
  iniciarDesempateButton.textContent = "⚡ Desempatar";
}

function reiniciarPartidaComMesmasEquipes() {
  textoMetaRevanche.textContent = `A meta atual é ${metaPontos} ${metaPontos === 1 ? "ponto" : "pontos"}. Ela será mantida como valor inicial, mas poderá ser alterada na tela de equipes. A pontuação desta partida será zerada somente quando você confirmar o início da revanche.`;
  modalConfirmarRevanche.hidden = false;
  document.body.classList.add("modal-open");
  confirmarAberturaRevanche.focus();
}

function confirmarRevancheComEquipesEditadas() {
  const ultimaMusicaIdJugada = musicaAtual?.id ?? ultimaMusicaId;
  pararTemporizador(false);
  musica.pause();
  musica.removeAttribute("src");
  musica.load();
  musicaAtual = null;
  rodada = null;

  // A meta e as equipes editadas ficam; apenas os placares da partida anterior são zerados.
  prepararEquipesParaPartida();
  ultimaMusicaId = ultimaMusicaIdJugada ?? null;
  if (!filaMusicas.length) prepararFila();
  resposta.hidden = true;
  revelar.disabled = true;
  revelar.textContent = "👁 Revelar resposta";
  statusAudio.textContent = "";
  placarExpandido = false;
  revancheEmConfiguracao = false;
  snapshotAntesDaRevanche = null;
  atualizarModoTelaEquipes(false);
  renderizarSetupEquipes();
  renderizarPlacar();
  mostrarTelaEquipeDaVez();
}
function voltarParaInicioDepoisDaVitoria() {
  limparSessaoDeJogo();
  modoSelecionado = null;
  mostrarTela(telaInicial);
}

function renderizarEstadoRodada() {
  if (modoSelecionado === "desafio-musical") {
    renderizarEstadoDesafioMusical();
    return;
  }
  painelDesafioMusical.hidden = true;
  const temRodada = Boolean(rodada && musicaAtual);
  acoesEquipe.hidden = true;
  votacaoEquipes.hidden = true;
  avaliacaoCanto.hidden = true;
  desafiosDanca.hidden = true;
  resultadoRodada.hidden = true;
  const mostrarVitoria = vencedoresEquipeIds.length > 0 && rodada?.etapa === "resolvida";
  avisoVitoria.hidden = !mostrarVitoria;
  textoAvisoVitoria.textContent = mostrarVitoria ? textoVitoria() : "";
  iniciarDesempateButton.hidden = !(vencedoresEquipeIds.length > 1 && rodada?.etapa === "resolvida");
  proximaMusica.hidden = true;
  if (!temRodada) return;
  revelar.disabled = false;
  revelar.textContent = resposta.hidden ? "👁 Revelar resposta" : "🙈 Ocultar resposta";

  rodadaAtual.textContent = `RODADA ${numeroRodada}`;
  const equipeAtual = equipeDaVez();

  if (rodada.etapa === "decisao") {
    tituloFaseEquipe.textContent = equipeAtual ? equipeAtual.nome : "Equipe da vez";
    const jaPassaram = rodada.equipesQuePassaram.size;
    instrucaoFaseEquipe.textContent = modoDesempate
      ? `Desempate: ${equipeAtual?.nome || "equipe"}, escolha cantar ou passar. Apenas as equipes empatadas participam.`
      : jaPassaram
        ? `${jaPassaram} equipe(s) já passou/passaram esta música. ${equipeAtual?.nome || "A próxima equipe"}, escolha cantar ou passar. Equipes que passaram não votam nesta rodada.`
        : "Esta equipe recebeu a música. Escolha cantar ou passar para a próxima equipe.";
    acoesEquipe.hidden = false;
    cantarMusica.disabled = false;
    pularMusica.disabled = false;
  } else if (rodada.etapa === "votacao") {
    tituloFaseEquipe.textContent = `${obterEquipe(rodada.equipeCantoraId)?.nome || "A equipe cantora"} vai cantar`;
    instrucaoFaseEquipe.textContent = "As outras equipes elegíveis devem escolher Fã-clube ou Duvidamos.";
    votacaoEquipes.hidden = false;
    renderizarVotos();
  } else if (rodada.etapa === "avaliacao") {
    tituloFaseEquipe.textContent = `Avaliar o canto de ${obterEquipe(rodada.equipeCantoraId)?.nome || "equipe"}`;
    instrucaoFaseEquipe.textContent = "O trecho terminou. Confirme se a equipe cantou corretamente.";
    avaliacaoCanto.hidden = false;
  } else if (rodada.etapa === "danca") {
    tituloFaseEquipe.textContent = rodada.tipoTodasPassaram ? "Todas as equipes vão dançar" : "Hora do desafio de dança";
    instrucaoFaseEquipe.textContent = "Resolva o desafio antes de iniciar a próxima música.";
    desafiosDanca.hidden = false;
    renderizarDesafioDanca();
  } else if (rodada.etapa === "resolvida" || rodada.etapa === "todas-passaram") {
    tituloFaseEquipe.textContent = vencedoresEquipeIds.length ? "Partida concluída" : "Rodada concluída";
    instrucaoFaseEquipe.textContent = vencedoresEquipeIds.length
      ? "A partida terminou. Abra Ver placar para consultar os pontos e o resumo da última rodada."
      : "A próxima equipe será chamada para a rodada seguinte.";
    // O resultado da rodada fica somente dentro do placar expandido.
    resultadoRodada.hidden = true;
    proximaMusica.hidden = true;
    if (vencedoresEquipeIds.length) {
      avisoVitoria.hidden = false;
      textoAvisoVitoria.textContent = textoVitoria();
      iniciarDesempateButton.hidden = vencedoresEquipeIds.length <= 1;
    } else {
      avisoVitoria.hidden = true;
      iniciarDesempateButton.hidden = true;
    }
  }
  renderizarPlacar();
}

function renderizarVotos() {
  listaVotos.innerHTML = "";
  const equipesElegiveis = rodada.equipesElegiveisVoto;
  equipesElegiveis.forEach((equipe) => {
    const card = document.createElement("article");
    card.className = "vote-card";
    const title = document.createElement("strong");
    title.textContent = equipe.nome;
    const votoAtual = rodada.votos[equipe.id];
    const editando = rodada.votosEmEdicao.has(equipe.id);
    const desc = document.createElement("span");
    desc.className = "vote-status";
    desc.textContent = votoAtual && !editando
      ? `Voto registrado: ${votoAtual === "fan" ? "Fã-clube" : "Duvidamos"}`
      : votoAtual ? "Escolha o novo voto" : "Ainda não votou";
    card.append(title, desc);

    if (votoAtual && !editando) {
      const alterar = document.createElement("button");
      alterar.type = "button";
      alterar.className = "vote-change-button";
      alterar.textContent = "✎ Alterar voto";
      alterar.addEventListener("click", () => {
        rodada.votosEmEdicao.add(equipe.id);
        renderizarVotos();
      });
      card.appendChild(alterar);
    } else {
      const buttons = document.createElement("div");
      buttons.className = "vote-buttons";
      const fan = document.createElement("button");
      fan.type = "button";
      fan.className = `vote-button fan${votoAtual === "fan" ? " selected" : ""}`;
      fan.textContent = "💖 Fã-clube";
      fan.addEventListener("click", () => registrarVoto(equipe.id, "fan"));
      const doubt = document.createElement("button");
      doubt.type = "button";
      doubt.className = `vote-button doubt${votoAtual === "doubt" ? " selected" : ""}`;
      doubt.textContent = "🤨 Duvidamos";
      doubt.addEventListener("click", () => registrarVoto(equipe.id, "doubt"));
      buttons.append(fan, doubt);
      card.appendChild(buttons);
    }
    listaVotos.appendChild(card);
  });
  const totalVotos = Object.keys(rodada.votos).filter((id) => equipesElegiveis.some((equipe) => equipe.id === id)).length;
  const temEdicaoPendente = rodada.votosEmEdicao.size > 0;
  confirmarVotos.disabled = totalVotos !== equipesElegiveis.length || temEdicaoPendente;
  confirmarVotos.textContent = temEdicaoPendente
    ? "Finalize a alteração do voto"
    : totalVotos === equipesElegiveis.length
      ? "Confirmar votos e avaliar canto"
      : `Aguardando votos (${totalVotos}/${equipesElegiveis.length})`;
}

function registrarVoto(equipeId, voto) {
  if (!rodada || rodada.etapa !== "votacao") return;
  if (!rodada.equipesElegiveisVoto.some((equipe) => equipe.id === equipeId)) return;
  if (rodada.equipesQueAcertaramVoto.has(equipeId)) return;
  rodada.votos[equipeId] = voto;
  rodada.votosEmEdicao.delete(equipeId);
  renderizarVotos();
}
function proximoResponsavelDaEquipe(equipe) {
  const participantes = (equipe?.participantes || []).filter(Boolean);
  if (!participantes.length) {
    return { responsavelNome: "Anfitrião/mesa", indiceParticipante: -1, totalParticipantes: 0 };
  }
  const proximoIndice = responsaveisDancaPorEquipe[equipe.id] || 0;
  const indiceParticipante = proximoIndice % participantes.length;
  responsaveisDancaPorEquipe[equipe.id] = (proximoIndice + 1) % participantes.length;
  return { responsavelNome: participantes[indiceParticipante], indiceParticipante, totalParticipantes: participantes.length };
}

function sortearParticipanteEntreEquipes(equipes) {
  const candidatos = [];
  equipes.forEach((equipe) => {
    const participantes = (equipe.participantes || []).map((nome) => String(nome || "").trim()).filter(Boolean);
    participantes.forEach((nome, indice) => {
      candidatos.push({ equipe, responsavelNome: nome, indiceParticipante: indice, totalParticipantes: participantes.length });
    });
  });
  if (!candidatos.length) return null;
  return candidatos[Math.floor(Math.random() * candidatos.length)];
}

function criarDesafioDanca(equipesDesafiadas, equipeDefinidora, tipo, responsavelForcado = null) {
  const responsavel = responsavelForcado || proximoResponsavelDaEquipe(equipeDefinidora);
  return {
    equipesDesafiadasIds: equipesDesafiadas.map((equipe) => equipe.id),
    equipeCantoraId: rodada.equipeCantoraId,
    equipeDefinidoraId: equipeDefinidora?.id || null,
    responsavelNome: responsavel.responsavelNome,
    indiceParticipante: responsavel.indiceParticipante,
    totalParticipantes: responsavel.totalParticipantes,
    tipo
  };
}

function renderizarDesafioDanca() {
  const desafio = rodada?.desafiosDanca[rodada.indiceDesafioDanca];
  if (!desafio) {
    concluirDesafiosDanca();
    return;
  }
  const equipesDesafiadas = (desafio.equipesDesafiadasIds || []).map(obterEquipe).filter(Boolean);
  const equipeDefinidora = obterEquipe(desafio.equipeDefinidoraId);
  const nomesDesafiados = equipesDesafiadas.map((equipe) => equipe.nome).join(" e ") || "As equipes indicadas";
  tituloDesafioDanca.textContent = `${nomesDesafiados}: hora de dançar!`;

  if (desafio.tipo === "todas-passaram") {
    textoDesafioDanca.textContent = "Todas as equipes passaram a música. Agora todas devem dançar; como ninguém cantou nem votou, o anfitrião escolhe o desafio.";
  } else if (desafio.tipo === "canto-incorreto") {
    textoDesafioDanca.textContent = `${nomesDesafiados} devem cumprir a dança. ${equipeDefinidora ? `${desafio.responsavelNome}, da equipe ${equipeDefinidora.nome}, acertou Duvidamos e define o desafio.` : "Ninguém votou Duvidamos; o anfitrião escolhe o desafio."}`;
  } else if (desafio.tipo === "desafio-musical-correto") {
    textoDesafioDanca.textContent = `${nomesDesafiados} votaram Duvidamos, mas a resposta estava correta. ${equipeDefinidora ? `${desafio.responsavelNome}, da equipe ${equipeDefinidora.nome}, acertou o desafio e define a dança.` : "O anfitrião escolhe o desafio."}`;
  } else if (desafio.tipo === "desafio-musical-incorreto") {
    textoDesafioDanca.textContent = `${nomesDesafiados} devem dançar porque a resposta foi incorreta ou o voto Fã-clube errou. ${equipeDefinidora ? `${desafio.responsavelNome}, da equipe ${equipeDefinidora.nome}, votou Duvidamos corretamente e define a dança.` : "Ninguém votou Duvidamos; o anfitrião escolhe o desafio."}`;
  } else if (desafio.tipo === "desafio-musical-final") {
    textoDesafioDanca.textContent = `${nomesDesafiados} participaram desta música, mas não conquistaram pontos. ${equipeDefinidora ? `${desafio.responsavelNome}, da equipe ${equipeDefinidora.nome}, define a dança.` : "Nenhuma equipe pontuou; o anfitrião escolhe o desafio."}`;
  } else if (desafio.tipo === "desafio-musical-todos-falharam") {
    textoDesafioDanca.textContent = `${nomesDesafiados} ainda precisam cumprir a dança. Todas as equipes participaram, mas ninguém acertou um desafio. ${equipeDefinidora ? `${desafio.responsavelNome}, da equipe ${equipeDefinidora.nome}, acertou a votação e define a dança.` : "Nenhuma equipe acertou uma votação; o anfitrião escolhe o desafio."}`;
  } else {
    textoDesafioDanca.textContent = `${nomesDesafiados} devem dançar. A equipe definidora escolhe o desafio.`;
  }

  responsavelDanca.textContent = desafio.responsavelNome;
  if (equipeDefinidora && desafio.totalParticipantes) {
    ordemResponsavelDanca.textContent = `Quem define: ${equipeDefinidora.nome} · participante ${desafio.indiceParticipante + 1} de ${desafio.totalParticipantes}.`;
    if (desafio.tipo === "canto-incorreto" || desafio.tipo === "desafio-musical-incorreto") {
      instrucaoResponsavelDanca.textContent = "O participante foi sorteado entre as equipes que acertaram Duvidamos e define a dança.";
    } else if (desafio.tipo === "desafio-musical-final") {
      instrucaoResponsavelDanca.textContent = "O participante foi sorteado entre as equipes que conquistaram pontos nesta música e define a dança.";
    } else if (desafio.tipo === "desafio-musical-todos-falharam") {
      instrucaoResponsavelDanca.textContent = "O participante foi sorteado entre as equipes que acertaram a votação. Se ninguém acertou, o anfitrião define a dança.";
    } else {
      instrucaoResponsavelDanca.textContent = "A equipe que acertou a resposta define a dança. O participante responsável avança em rodízio a cada desafio.";
    }
  } else {
    ordemResponsavelDanca.textContent = "Responsável pelo desafio: anfitrião/mesa.";
    instrucaoResponsavelDanca.textContent = "O anfitrião escolhe o desafio desta rodada.";
  }
  desafioCumprido.textContent = `💃 Desafio cumprido — próximo (${rodada.indiceDesafioDanca + 1}/${rodada.desafiosDanca.length})`;
}

function concluirDesafiosDanca() {
  rodada.etapa = "resolvida";
  if (rodada.resultado) ultimoResumoRodada = rodada.resultado;
  renderizarPlacar();
  if (vencedoresEquipeIds.length) {
    renderizarTelaVitoria();
    mostrarTela(telaVitoria);
    return;
  }
  // Sem vencedor, não mostramos uma tela de resultado: chamamos a próxima equipe.
  mostrarTelaEquipeDaVez();
}

function avaliarCanto(correto) {
  if (!rodada || rodada.etapa !== "avaliacao") return;
  const cantora = obterEquipe(rodada.equipeCantoraId);
  if (!cantora) return;
  const votos = rodada.equipesElegiveisVoto;
  const equipesFas = votos.filter((equipe) => rodada.votos[equipe.id] === "fan");
  const equipesDuvidaram = votos.filter((equipe) => rodada.votos[equipe.id] === "doubt");
  rodada.desafiosDanca = [];
  rodada.indiceDesafioDanca = 0;
  rodada.tipoTodasPassaram = false;

  if (correto) {
    cantora.discosOuro += 1;
    equipesFas.forEach((equipe) => { equipe.vinisComuns += 1; });
    rodada.desafiosDanca = equipesDuvidaram.map((equipe) => criarDesafioDanca([equipe], cantora, "canto-correto"));
    verificarVitoria();
    const resumo = [`${cantora.nome} cantou corretamente e ganhou 1 Disco de Ouro (2 pontos).`, ...equipesFas.map((equipe) => `${equipe.nome} acertou Fã-clube e ganhou 1 Vinil Comum (1 ponto).`)];
    if (equipesDuvidaram.length) resumo.push(`${equipesDuvidaram.map((equipe) => equipe.nome).join(", ")} erraram o voto Duvidamos e devem dançar; a equipe cantora define os desafios.`);
    rodada.resultado = resumo.join(" ");
  } else {
    equipesDuvidaram.forEach((equipe) => { equipe.vinisComuns += 1; });
    const equipesParaDancar = [cantora, ...equipesFas];
    let equipeDefinidora = null;
    let responsavelForcado = null;
    if (equipesDuvidaram.length) {
      // Sorteia uma pessoa entre todos os participantes das equipes que acertaram Duvidamos.
      const sorteado = sortearParticipanteEntreEquipes(equipesDuvidaram);
      if (sorteado) {
        equipeDefinidora = sorteado.equipe;
        responsavelForcado = {
          responsavelNome: sorteado.responsavelNome,
          indiceParticipante: sorteado.indiceParticipante,
          totalParticipantes: sorteado.totalParticipantes
        };
      }
    }
    rodada.desafiosDanca = [criarDesafioDanca(equipesParaDancar, equipeDefinidora, "canto-incorreto", responsavelForcado)];
    verificarVitoria();
    const resumo = [`${cantora.nome} cantou errado e não ganhou Disco de Ouro.`, ...equipesDuvidaram.map((equipe) => `${equipe.nome} acertou Duvidamos e ganhou 1 Vinil Comum (1 ponto).`)];
    if (equipesParaDancar.length) resumo.push(`${equipesParaDancar.map((equipe) => equipe.nome).join(" e ")} devem dançar.`);
    resumo.push(equipeDefinidora ? `${equipeDefinidora.nome} foi sorteada entre as equipes Duvidamos para definir a dança.` : "Como ninguém votou Duvidamos, o anfitrião define a dança.");
    rodada.resultado = resumo.join(" ");
  }

  ultimoResumoRodada = rodada.resultado || "Rodada encerrada.";
  renderizarPlacar();
  if (rodada.desafiosDanca.length) {
    rodada.etapa = "danca";
    renderizarEstadoRodada();
  } else {
    concluirDesafiosDanca();
  }
}

function desafioMusicalLabel(tipo) {
  return NOMES_DESAFIOS_MUSICAIS[tipo] || "responder ao desafio";
}

function equipesElegiveisParaResponderDesafio() {
  if (!rodada) return [];
  return (rodada.equipesParticipantesIds || [])
    .map(obterEquipe)
    .filter(Boolean)
    .filter((equipe) => !rodada.equipesQueResponderam.has(equipe.id) && !rodada.equipesQuePassaram.has(equipe.id));
}

function desafiosMusicaisRestantes() {
  return Object.keys(NOMES_DESAFIOS_MUSICAIS).filter((tipo) => !rodada?.desafiosResolvidos.has(tipo));
}

function renderizarEstadoDesafioMusical() {
  const temRodada = Boolean(rodada && musicaAtual);
  acoesEquipe.hidden = true;
  votacaoEquipes.hidden = true;
  avaliacaoCanto.hidden = true;
  desafiosDanca.hidden = true;
  resultadoRodada.hidden = true;
  avisoVitoria.hidden = true;
  proximaMusica.hidden = true;
  painelDesafioMusical.hidden = true;
  if (!temRodada) return;
  // A resposta é opcionalmente revelada pelo anfitrião em qualquer etapa da música.
  revelar.disabled = false;
  revelar.textContent = resposta.hidden ? "👁 Revelar resposta" : "🙈 Ocultar resposta";

  rodadaAtual.textContent = `RODADA ${numeroRodada}`;
  const equipeAtual = equipeDaVez();
  const restantes = desafiosMusicaisRestantes();
  const mostrarVotacao = rodada.etapa === "votacao-desafio-musical";
  const mostrarAvaliacao = rodada.etapa === "avaliacao-desafio-musical";
  const mostrarDanca = rodada.etapa === "danca";

  if (mostrarDanca) {
    tituloFaseEquipe.textContent = "Desafios de dança";
    instrucaoFaseEquipe.textContent = "Resolva os desafios acumulados desta música antes de continuar.";
    desafiosDanca.hidden = false;
    renderizarDesafioDanca();
    painelDesafioMusical.hidden = true;
    revelar.disabled = false;
    revelar.textContent = resposta.hidden ? "👁 Revelar resposta" : "🙈 Ocultar resposta";
    renderizarPlacar();
    return;
  }

  painelDesafioMusical.hidden = false;
  desafioMusicalDecisao.hidden = mostrarVotacao || mostrarAvaliacao || Boolean(rodada.disputaEncerrada);
  desafioMusicalVotacao.hidden = !mostrarVotacao;
  desafioMusicalAvaliacao.hidden = !mostrarAvaliacao;
  desafioMusicalEncerrado.hidden = !rodada.disputaEncerrada;

  if (rodada.etapa === "decisao-desafio-musical") {
    tituloFaseEquipe.textContent = equipeAtual ? equipeAtual.nome : "Equipe da vez";
    instrucaoFaseEquipe.textContent = "Escolha apenas um desafio. Depois de responder, não poderá tentar outra resposta para esta música.";
    desafioMusicalInstrucao.textContent = `Desafios restantes: ${restantes.map(desafioMusicalLabel).join(", ") || "nenhum"}. Pontuação fixa, sem bônus por erro ou passe.`;
    desafiosMusicaisDisponiveis.querySelectorAll("[data-desafio-musical]").forEach((botao) => {
      const tipo = botao.dataset.desafioMusical;
      const resolvido = rodada.desafiosResolvidos.has(tipo);
      botao.disabled = resolvido || !equipeAtual;
      botao.classList.toggle("is-resolved", resolvido);
      const detalhe = botao.querySelector("span:last-child");
      const pontosBase = PONTOS_DESAFIO_MUSICAL[tipo];
      const rotuloPontos = pontosBase === 1 ? "ponto" : "pontos";
      if (detalhe) detalhe.textContent = resolvido ? "DESAFIO RESOLVIDO" : `${pontosBase} ${rotuloPontos}`;
    });
    passarDesafioMusical.disabled = !equipeAtual;
    desafioMusicalStatus.textContent = `${rodada.equipesQueResponderam.size} equipe(s) já usaram a tentativa · ${rodada.equipesQuePassaram.size} passaram por completo.`;
  } else if (mostrarVotacao) {
    const equipeRespondente = obterEquipe(rodada.equipeRespondenteId);
    tituloFaseEquipe.textContent = `${equipeRespondente?.nome || "Equipe da vez"} escolheu: ${desafioMusicalLabel(rodada.desafioSelecionado)}`;
    instrucaoFaseEquipe.textContent = "As equipes elegíveis votam se a resposta será correta. Cada equipe ganha no máximo 1 ponto de votação nesta música; ao acertar, não vota mais. O anfitrião avalia depois.";
    renderizarVotosDesafioMusical();
  } else if (mostrarAvaliacao) {
    const equipeRespondente = obterEquipe(rodada.equipeRespondenteId);
    tituloFaseEquipe.textContent = `Avaliar resposta de ${equipeRespondente?.nome || "equipe"}`;
    instrucaoFaseEquipe.textContent = "Confirme a resposta antes de revelar o gabarito. A avaliação é manual.";
    tituloAvaliacaoDesafioMusical.textContent = `A equipe tentou ${desafioMusicalLabel(rodada.desafioSelecionado)}.`;
    const pontosBase = PONTOS_DESAFIO_MUSICAL[rodada.desafioSelecionado];
    const rotuloBase = pontosBase === 1 ? "ponto" : "pontos";
    textoAvaliacaoDesafioMusical.textContent = `Se acertar, recebe ${pontosBase} ${rotuloBase}. Não há bônus por erros ou passes. Cada equipe pode ganhar no máximo 1 ponto de votação nesta música.`;
  }
  // Não esconda nem bloqueie o gabarito durante votação/avaliação: o anfitrião
  // pode precisar conferir título, artista ou ano para julgar a resposta.
  renderizarPlacar();
}

function equipePodeVotarDesafioMusical(equipeId, respondenteId) {
  if (!rodada || !equipeId || equipeId === respondenteId) return false;
  return !rodada.equipesQuePassaram.has(equipeId) &&
    !rodada.equipesSemDireitoVoto.has(equipeId) &&
    !rodada.equipesQueAcertaramVoto.has(equipeId);
}

function concederPontoVotoDesafioMusical(equipe) {
  if (!rodada || !equipe || rodada.equipesQueAcertaramVoto.has(equipe.id)) return false;
  equipe.pontosVotoDesafio = (Number(equipe.pontosVotoDesafio) || 0) + 1;
  rodada.equipesQuePontuaram.add(equipe.id);
  rodada.equipesQueAcertaramVoto.add(equipe.id);
  return true;
}

function selecionarDesafioMusical(tipo) {
  if (!rodada || rodada.etapa !== "decisao-desafio-musical") return;
  if (!Object.prototype.hasOwnProperty.call(PONTOS_DESAFIO_MUSICAL, tipo)) return;
  if (rodada.desafiosResolvidos.has(tipo)) return;
  const equipe = equipeDaVez();
  if (!equipe || rodada.equipesQueResponderam.has(equipe.id) || rodada.equipesQuePassaram.has(equipe.id)) return;

  rodada.equipeRespondenteId = equipe.id;
  rodada.equipeCantoraId = equipe.id; // reutilizado apenas para identificar quem iniciou o desafio de dança
  rodada.desafioSelecionado = tipo;
  rodada.equipesQueResponderam.add(equipe.id);
  rodada.equipesQueParticiparam.add(equipe.id);
  rodada.votos = {};
  rodada.votosEmEdicao = new Set();
  rodada.equipesElegiveisVoto = equipesAtivasDaPartida().filter((item) =>
    equipePodeVotarDesafioMusical(item.id, equipe.id)
  );
  rodada.respostaAvaliada = false;
  // Preserve a resposta se o anfitrião já a abriu antes de selecionar o desafio.
  revelar.disabled = false;
  revelar.textContent = resposta.hidden ? "👁 Revelar resposta" : "🙈 Ocultar resposta";
  if (rodada.equipesElegiveisVoto.length) {
    rodada.etapa = "votacao-desafio-musical";
  } else {
    rodada.etapa = "avaliacao-desafio-musical";
  }
  renderizarEstadoRodada();
}

function renderizarVotosDesafioMusical() {
  listaVotosDesafioMusical.innerHTML = "";
  const elegiveis = rodada.equipesElegiveisVoto || [];
  elegiveis.forEach((equipe) => {
    const card = document.createElement("article");
    card.className = "vote-card";
    const title = document.createElement("strong");
    title.textContent = equipe.nome;
    const votoAtual = rodada.votos[equipe.id];
    const editando = rodada.votosEmEdicao.has(equipe.id);
    const desc = document.createElement("span");
    desc.className = "vote-status";
    desc.textContent = votoAtual && !editando
      ? `Voto registrado: ${votoAtual === "fan" ? "Fã-clube" : "Duvidamos"}`
      : votoAtual ? "Escolha o novo voto" : "Ainda não votou";
    card.append(title, desc);
    if (votoAtual && !editando) {
      const alterar = document.createElement("button");
      alterar.type = "button";
      alterar.className = "vote-change-button";
      alterar.textContent = "✎ Alterar voto";
      alterar.addEventListener("click", () => {
        rodada.votosEmEdicao.add(equipe.id);
        renderizarVotosDesafioMusical();
      });
      card.appendChild(alterar);
    } else {
      const buttons = document.createElement("div");
      buttons.className = "vote-buttons";
      const fan = document.createElement("button");
      fan.type = "button";
      fan.className = `vote-button fan${votoAtual === "fan" ? " selected" : ""}`;
      fan.textContent = "💖 Fã-clube";
      fan.addEventListener("click", () => registrarVotoDesafioMusical(equipe.id, "fan"));
      const doubt = document.createElement("button");
      doubt.type = "button";
      doubt.className = `vote-button doubt${votoAtual === "doubt" ? " selected" : ""}`;
      doubt.textContent = "🤨 Duvidamos";
      doubt.addEventListener("click", () => registrarVotoDesafioMusical(equipe.id, "doubt"));
      buttons.append(fan, doubt);
      card.appendChild(buttons);
    }
    listaVotosDesafioMusical.appendChild(card);
  });
  const total = elegiveis.filter((equipe) => Boolean(rodada.votos[equipe.id])).length;
  const pendente = rodada.votosEmEdicao.size > 0;
  confirmarVotosDesafioMusical.disabled = total !== elegiveis.length || pendente;
  confirmarVotosDesafioMusical.textContent = pendente
    ? "Finalize a alteração do voto"
    : total === elegiveis.length
      ? "Confirmar votos e avaliar resposta"
      : `Aguardando votos (${total}/${elegiveis.length})`;
}

function registrarVotoDesafioMusical(equipeId, voto) {
  if (!rodada || rodada.etapa !== "votacao-desafio-musical") return;
  if (!rodada.equipesElegiveisVoto.some((equipe) => equipe.id === equipeId)) return;
  if (rodada.equipesQueAcertaramVoto.has(equipeId)) return;
  rodada.votos[equipeId] = voto;
  rodada.votosEmEdicao.delete(equipeId);
  renderizarVotosDesafioMusical();
}

function confirmarVotacaoDesafioMusical() {
  if (!rodada || rodada.etapa !== "votacao-desafio-musical") return;
  const total = rodada.equipesElegiveisVoto.filter((equipe) => rodada.votos[equipe.id]).length;
  if (total !== rodada.equipesElegiveisVoto.length || rodada.votosEmEdicao.size > 0) return;
  rodada.etapa = "avaliacao-desafio-musical";
  renderizarEstadoRodada();
}

function sortearParticipanteJusto(equipes) {
  const equipesComParticipantes = (equipes || []).map((equipe) => ({
    equipe,
    participantes: (equipe.participantes || []).map((nome) => String(nome || "").trim()).filter(Boolean)
  })).filter((item) => item.participantes.length > 0);
  if (!equipesComParticipantes.length) return null;
  const item = equipesComParticipantes[Math.floor(Math.random() * equipesComParticipantes.length)];
  const indiceParticipante = Math.floor(Math.random() * item.participantes.length);
  return {
    equipe: item.equipe,
    responsavelNome: item.participantes[indiceParticipante],
    indiceParticipante,
    totalParticipantes: item.participantes.length
  };
}

function adicionarDesafioDancaMusical(equipesDesafiadas, equipeDefinidora, tipo, responsavelForcado = null) {
  const validas = [...new Set((equipesDesafiadas || []).map((equipe) => equipe.id))]
    .map(obterEquipe).filter(Boolean);
  if (!validas.length) return;
  const desafio = criarDesafioDanca(validas, equipeDefinidora, tipo, responsavelForcado);
  rodada.desafiosDanca.push(desafio);
  validas.forEach((equipe) => rodada.equipesJaAgendadasParaDancar.add(equipe.id));
}

function avaliarRespostaDesafioMusical(correta) {
  if (!rodada || rodada.etapa !== "avaliacao-desafio-musical" || rodada.respostaAvaliada) return;
  const respondente = obterEquipe(rodada.equipeRespondenteId);
  if (!respondente) return;
  const tipo = rodada.desafioSelecionado;
  const votos = rodada.equipesElegiveisVoto || [];
  const fas = votos.filter((equipe) => rodada.votos[equipe.id] === "fan");
  const duvidamos = votos.filter((equipe) => rodada.votos[equipe.id] === "doubt");
  const resumo = [];

  if (correta) {
    const pontosResposta = PONTOS_DESAFIO_MUSICAL[tipo];
    respondente.pontosDesafioMusical = (Number(respondente.pontosDesafioMusical) || 0) + pontosResposta;
    rodada.equipesQueAcertaram.add(respondente.id);
    rodada.equipesQuePontuaram.add(respondente.id);
    rodada.desafiosResolvidos.add(tipo);
    const rotuloPontosResposta = pontosResposta === 1 ? "ponto" : "pontos";
    resumo.push(`${respondente.nome} acertou ${desafioMusicalLabel(tipo)} e ganhou ${pontosResposta} ${rotuloPontosResposta}.`);
    const fasQuePontuaram = fas.filter(concederPontoVotoDesafioMusical);
    if (fasQuePontuaram.length) resumo.push(`${fasQuePontuaram.map((equipe) => equipe.nome).join(", ")} acertaram Fã-clube e ganharam 1 ponto cada. Não votarão mais nesta música.`);
    if (duvidamos.length) {
      adicionarDesafioDancaMusical(duvidamos, respondente, "desafio-musical-correto");
      resumo.push(`${duvidamos.map((equipe) => equipe.nome).join(", ")} erraram Duvidamos e vão dançar; ${respondente.nome} define o desafio.`);
    }
  } else {
    rodada.equipesSemDireitoVoto.add(respondente.id);
    resumo.push(`${respondente.nome} errou ${desafioMusicalLabel(tipo)} e perdeu o direito de votar nesta música.`);
    const duvidamosQuePontuaram = duvidamos.filter(concederPontoVotoDesafioMusical);
    if (duvidamosQuePontuaram.length) resumo.push(`${duvidamosQuePontuaram.map((equipe) => equipe.nome).join(", ")} acertaram Duvidamos e ganharam 1 ponto cada. Não votarão mais nesta música.`);
    const paraDancar = [respondente, ...fas];
    const sorteado = sortearParticipanteJusto(duvidamos);
    const equipeDefinidora = sorteado?.equipe || null;
    const forcarResponsavel = sorteado ? {
      responsavelNome: sorteado.responsavelNome,
      indiceParticipante: sorteado.indiceParticipante,
      totalParticipantes: sorteado.totalParticipantes
    } : null;
    adicionarDesafioDancaMusical(paraDancar, equipeDefinidora, "desafio-musical-incorreto", forcarResponsavel);
    resumo.push(`${paraDancar.map((equipe) => equipe.nome).join(" e ")} devem dançar. ${equipeDefinidora ? `${sorteado.responsavelNome}, da equipe ${equipeDefinidora.nome}, define a dança.` : "O anfitrião define a dança porque ninguém votou Duvidamos."}`);
  }

  rodada.respostaAvaliada = true;
  rodada.resultado = resumo.join(" ");
  ultimoResumoRodada = rodada.resultado;
  resposta.hidden = false;
  revelar.disabled = false;
  revelar.textContent = "🙈 Ocultar resposta";
  verificarVitoria();
  renderizarPlacar();

  if (vencedoresEquipeIds.length) {
    rodada.encerrarAposDancas = true;
    finalizarDisputaDesafioMusical();
    return;
  }
  avancarDesafioMusical();
}

function passarDesafioMusicalCompleto() {
  if (!rodada || rodada.etapa !== "decisao-desafio-musical") return;
  const equipe = equipeDaVez();
  if (!equipe || rodada.equipesQueResponderam.has(equipe.id) || rodada.equipesQuePassaram.has(equipe.id)) return;
  rodada.equipesQueParticiparam.add(equipe.id);
  rodada.equipesQuePassaram.add(equipe.id);
  rodada.equipesSemDireitoVoto.add(equipe.id);
  rodada.resultado = `${equipe.nome} passou a música por completo e não poderá votar nesta música.`;
  ultimoResumoRodada = rodada.resultado;

  const todasPassaramSemTentativa = rodada.equipesQuePassaram.size === rodada.equipesParticipantesIds.length && rodada.equipesQueResponderam.size === 0;
  if (todasPassaramSemTentativa) {
    // A próxima música deve começar depois da última equipe que acabou de passar.
    const totalEquipes = (rodada.equipesParticipantesIds || []).length;
    if (totalEquipes) indiceEquipeInicial = (rodada.indiceEquipeAtual + 1) % totalEquipes;
    rodada.tipoTodasPassaram = true;
    rodada.disputaEncerrada = true;
    rodada.desafiosDanca = [];
    adicionarDesafioDancaMusical(equipesAtivasDaPartida(), null, "todas-passaram");
    rodada.etapa = "danca";
    renderizarEstadoRodada();
    return;
  }
  avancarDesafioMusical();
}

function avancarDesafioMusical() {
  if (!rodada || rodada.disputaEncerrada) return;
  const restantes = desafiosMusicaisRestantes();
  if (!restantes.length) {
    finalizarDisputaDesafioMusical();
    return;
  }
  const ids = rodada.equipesParticipantesIds || [];
  let proximoIndice = rodada.indiceEquipeAtual;
  for (let passo = 1; passo <= ids.length; passo++) {
    const indice = (rodada.indiceEquipeAtual + passo) % ids.length;
    const id = ids[indice];
    if (!rodada.equipesQueResponderam.has(id) && !rodada.equipesQuePassaram.has(id)) {
      proximoIndice = indice;
      rodada.indiceEquipeAtual = proximoIndice;
      rodada.equipeRespondenteId = null;
      rodada.desafioSelecionado = null;
      rodada.votos = {};
      rodada.votosEmEdicao = new Set();
      rodada.equipesElegiveisVoto = [];
      rodada.respostaAvaliada = false;
      resposta.hidden = true;
      revelar.disabled = false;
      revelar.textContent = "👁 Revelar resposta";
      rodada.etapa = "decisao-desafio-musical";
      renderizarEstadoRodada();
      return;
    }
  }
  finalizarDisputaDesafioMusical();
}

function finalizarDisputaDesafioMusical() {
  if (!rodada || rodada.disputaEncerrada && rodada.etapa === "danca") return;
  rodada.disputaEncerrada = true;
  // A próxima música começa após a última equipe que teve uma oportunidade nesta disputa.
  const totalEquipesDaRodada = (rodada.equipesParticipantesIds || []).length;
  if (totalEquipesDaRodada) indiceEquipeInicial = (rodada.indiceEquipeAtual + 1) % totalEquipesDaRodada;
  const todosPassaram = rodada.equipesQuePassaram.size === rodada.equipesParticipantesIds.length && rodada.equipesQueResponderam.size === 0;
  if (todosPassaram && !rodada.desafiosDanca.length) {
    rodada.tipoTodasPassaram = true;
    rodada.resultado = "Todas as equipes passaram a música. Todas dançam; o anfitrião escolhe o desafio. Ninguém pontua nesta música.";
    ultimoResumoRodada = rodada.resultado;
    adicionarDesafioDancaMusical(equipesAtivasDaPartida(), null, "todas-passaram");
  } else {
    const idsDaRodada = rodada.equipesParticipantesIds || [];
    const todasTiveramOportunidade = idsDaRodada.every((id) => rodada.equipesQueResponderam.has(id) || rodada.equipesQuePassaram.has(id));
    const ninguemAcertouResposta = rodada.equipesQueAcertaram.size === 0;
    if (todasTiveramOportunidade && ninguemAcertouResposta) {
      // Se todas tentaram e erraram ou passaram, todas dançam ao menos uma vez.
      // As que já estão na fila cumprem a dança pendente; acrescentamos apenas as que faltam.
      const equipesQueFaltamDancar = idsDaRodada
        .filter((id) => !rodada.equipesJaAgendadasParaDancar.has(id))
        .map(obterEquipe).filter(Boolean);
      if (equipesQueFaltamDancar.length) {
        const equipesLideres = [...rodada.equipesQueAcertaramVoto].map(obterEquipe).filter(Boolean);
        const sorteado = sortearParticipanteJusto(equipesLideres);
        const equipeDefinidora = sorteado?.equipe || null;
        const forcarResponsavel = sorteado ? {
          responsavelNome: sorteado.responsavelNome,
          indiceParticipante: sorteado.indiceParticipante,
          totalParticipantes: sorteado.totalParticipantes
        } : null;
        adicionarDesafioDancaMusical(equipesQueFaltamDancar, equipeDefinidora, "desafio-musical-todos-falharam", forcarResponsavel);
      }
      rodada.resultado = "Nenhuma equipe acertou um desafio. Todas as equipes dançam e a música é descartada.";
      ultimoResumoRodada = rodada.resultado;
    } else {
      const equipesSemPontos = idsDaRodada
        // Passar a música, por si só, não gera penalidade de dança. A exceção é
        // o caso especial em que todas as equipes falham/passam e todas dançam.
        .filter((id) => rodada.equipesQueParticiparam.has(id) && !rodada.equipesQuePassaram.has(id) && !rodada.equipesQuePontuaram.has(id) && !rodada.equipesJaAgendadasParaDancar.has(id))
        .map(obterEquipe).filter(Boolean);
      if (equipesSemPontos.length) {
        let equipesLideres = [...rodada.equipesQueAcertaram].map(obterEquipe).filter(Boolean);
        if (!equipesLideres.length) equipesLideres = [...rodada.equipesQueAcertaramVoto].map(obterEquipe).filter(Boolean);
        const sorteado = sortearParticipanteJusto(equipesLideres);
        const equipeDefinidora = sorteado?.equipe || null;
        const forcarResponsavel = sorteado ? {
          responsavelNome: sorteado.responsavelNome,
          indiceParticipante: sorteado.indiceParticipante,
          totalParticipantes: sorteado.totalParticipantes
        } : null;
        adicionarDesafioDancaMusical(equipesSemPontos, equipeDefinidora, "desafio-musical-final", forcarResponsavel);
      }
      if (!rodada.resultado) {
        rodada.resultado = desafiosMusicaisRestantes().length
          ? "Não há mais equipes aptas a responder. A música foi encerrada."
          : "Os quatro desafios desta música foram resolvidos. A disputa foi encerrada.";
        ultimoResumoRodada = rodada.resultado;
      }
    }
  }
  verificarVitoria();
  renderizarPlacar();
  if (rodada.desafiosDanca.length) {
    rodada.indiceDesafioDanca = 0;
    rodada.etapa = "danca";
    renderizarEstadoRodada();
  } else {
    concluirDesafiosDanca();
  }
}

function pularEquipeAtual() {
  if (modoSelecionado === "desafio-musical") {
    passarDesafioMusicalCompleto();
    return;
  }
  if (!rodada || rodada.etapa !== "decisao") return;
  const equipesAtivas = equipesAtivasDaPartida();
  const equipe = equipeDaVez();
  if (!equipe) return;
  rodada.equipesQuePassaram.add(equipe.id);
  if (rodada.equipesQuePassaram.size >= equipesAtivas.length) {
    rodada.etapa = "danca";
    rodada.tipoTodasPassaram = true;
    rodada.resultado = "Todas as equipes passaram a música. Todas as equipes devem dançar; o anfitrião escolhe o desafio. Não há pontuação nesta rodada.";
    ultimoResumoRodada = rodada.resultado;
    renderizarPlacar();
    rodada.desafiosDanca = [criarDesafioDanca(equipesAtivas, null, "todas-passaram")];
    rodada.indiceDesafioDanca = 0;
    renderizarEstadoRodada();
    return;
  }
  let tentativas = 0;
  do {
    rodada.indiceEquipeAtual = (rodada.indiceEquipeAtual + 1) % equipesAtivas.length;
    tentativas += 1;
  } while (rodada.equipesQuePassaram.has(equipesAtivas[rodada.indiceEquipeAtual].id) && tentativas <= equipesAtivas.length);
  renderizarEstadoRodada();
}

function equipeAtualVaiCantar() {
  if (!rodada || rodada.etapa !== "decisao") return;
  const equipe = equipeDaVez();
  if (!equipe) return;
  rodada.equipeCantoraId = equipe.id;
  rodada.equipesElegiveisVoto = equipesAtivasDaPartida().filter((item) => item.id !== equipe.id && !rodada.equipesQuePassaram.has(item.id));
  rodada.votos = {};
  rodada.votosEmEdicao = new Set();
  revelar.disabled = false;
  revelar.textContent = resposta.hidden ? "👁 Revelar resposta" : "🙈 Ocultar resposta";
  if (rodada.equipesElegiveisVoto.length) {
    rodada.etapa = "votacao";
  } else {
    rodada.etapa = "avaliacao";
    revelar.disabled = false;
    revelar.textContent = "👁 Revelar resposta";
  }
  renderizarEstadoRodada();
}

function confirmarVotacao() {
  if (!rodada || rodada.etapa !== "votacao") return;
  const total = rodada.equipesElegiveisVoto.filter((equipe) => rodada.votos[equipe.id]).length;
  if (total !== rodada.equipesElegiveisVoto.length || rodada.votosEmEdicao.size > 0) return;
  rodada.etapa = "avaliacao";
  revelar.disabled = false;
  revelar.textContent = resposta.hidden ? "👁 Revelar resposta" : "🙈 Ocultar resposta";
  renderizarEstadoRodada();
}

function atualizarRodadaDepoisDeAcao() {
  renderizarEstadoRodada();
  renderizarPlacar();
}

function limparSessaoDeJogo() {
  tokenReproducaoAudio += 1;
  pararTemporizador(false);
  musica.pause();
  musica.removeAttribute("src");
  musica.load();
  musicaAtual = null;
  filaMusicas = [];
  temaSelecionado = null;
  dificuldadeSelecionada = null;
  numeroRodada = 0;
  ultimaMusicaId = null;
  rodada = null;
  vencedoresEquipeIds = [];
  textoAvisoVitoria.textContent = "";
  avisoVitoria.hidden = true;
  iniciarDesempateButton.hidden = true;
  indiceEquipeDefinidoraDuvida = 0;
  metaPontos = null;
  metaPersonalizadaAtiva = false;
  responsaveisDancaPorEquipe = {};
  modoDesempate = false;
  equipesDesempateIds = [];
  pontuacaoBaseDesempate = {};
  placarExpandido = false;
  ultimoResumoRodada = "";
  if (ultimaRodadaResumo) ultimaRodadaResumo.hidden = true;
  if (textoUltimaRodada) textoUltimaRodada.textContent = "";
  if (placarDetalhado) placarDetalhado.hidden = true;
  if (togglePlacar) {
    togglePlacar.setAttribute("aria-expanded", "false");
    togglePlacar.textContent = "Ver placar";
  }
  resposta.hidden = true;
  revelar.disabled = true;
  revelar.textContent = "👁 Revelar resposta";
  statusAudio.textContent = "";
}

iniciarJogo.addEventListener("click", () => mostrarTela(telaModos));
function abrirResumoRegrasModo(modo = "cante-dance") {
  modoSelecionado = modo;
  snapshotAntesDaRevanche = null;
  revancheEmConfiguracao = false;
  metaPontos = null;
  metaPersonalizadaAtiva = false;
  if (quantidadeEquipesSetup) quantidadeEquipesSetup.value = String(equipesConfiguradas.length);
  metaPontosInput.value = String(calcularMetaAutomaticaModo());
  atualizarModoTelaEquipes(false);
  statusEquipesSetup.textContent = "";
  const desafioMusical = modoSelecionado === "desafio-musical";
  document.getElementById("tituloRegrasModo").textContent = desafioMusical ? "🎧 Desafio Musical" : "🎤 Cante e Dance";
  descricaoRegrasModo.textContent = desafioMusical
    ? "Uma música, quatro desafios independentes. Responda, vote e aumente a recompensa para quem acertar depois."
    : "Cante o trecho no tempo escolhido, aposte no seu palpite e faça as equipes rivais dançarem!";
  regrasCanteDanceDetalhes.hidden = desafioMusical;
  regrasDesafioMusicalDetalhes.hidden = !desafioMusical;
  modalRegrasModo.hidden = false;
  document.body.classList.add("modal-open");
  continuarRegrasModo.focus();
}
function fecharResumoRegrasModo() {
  modalRegrasModo.hidden = true;
  document.body.classList.remove("modal-open");
  renderizarSetupEquipes();
  mostrarTela(telaEquipes);
}

confirmarModalAcao.addEventListener("click", () => fecharModalAcaoPersonalizada(true));
cancelarModalAcao.addEventListener("click", () => fecharModalAcaoPersonalizada(false));
fecharModalAcao.addEventListener("click", () => fecharModalAcaoPersonalizada(false));
modalAcaoPersonalizada.addEventListener("click", (evento) => {
  if (evento.target === modalAcaoPersonalizada || evento.target?.dataset?.fecharModalAcao === "true") {
    fecharModalAcaoPersonalizada(false);
  }
});

modoCanteDance.addEventListener("click", () => abrirResumoRegrasModo("cante-dance"));
modoDesafioMusical.addEventListener("click", () => abrirResumoRegrasModo("desafio-musical"));
fecharModalRegras.addEventListener("click", fecharResumoRegrasModo);
continuarRegrasModo.addEventListener("click", fecharResumoRegrasModo);
modalRegrasModo.addEventListener("click", (evento) => {
  if (evento.target === modalRegrasModo || evento.target?.dataset?.fecharRegras === "true") fecharResumoRegrasModo();
});
document.addEventListener("keydown", (evento) => {
  if (evento.key !== "Escape") return;
  if (!modalAcaoPersonalizada.hidden) {
    fecharModalAcaoPersonalizada(false);
    return;
  }
  if (!modalRegrasModo.hidden) fecharResumoRegrasModo();
  if (!modalConfirmarRevanche.hidden) fecharModalConfirmacaoRevanche();
});
voltarTelaInicial.addEventListener("click", () => {
  modoSelecionado = null;
  mostrarTela(telaInicial);
});
voltarModos.addEventListener("click", () => {
  if (revancheEmConfiguracao) {
    cancelarConfiguracaoRevanche();
    return;
  }
  mostrarTela(telaModos);
});
quantidadeEquipesSetup.addEventListener("change", async () => {
  await ajustarQuantidadeEquipesSetup(Number(quantidadeEquipesSetup.value));
});
adicionarEquipe.addEventListener("click", () => {
  if (equipesConfiguradas.length >= 12) {
    statusEquipesSetup.textContent = "A meta automatica aprovada foi definida para partidas de 2 a 12 equipes.";
    return;
  }
  ajustarQuantidadeEquipesSetup(equipesConfiguradas.length + 1, false);
});
confirmarEquipes.addEventListener("click", selecionarEquipeParaTema);
continuarEquipeDaVez.addEventListener("click", iniciarNovaRodada);
togglePlacar.addEventListener("click", () => {
  placarExpandido = !placarExpandido;
  renderizarPlacar();
});
reiniciarMesmasEquipes.addEventListener("click", reiniciarPartidaComMesmasEquipes);
confirmarAberturaRevanche.addEventListener("click", () => {
  fecharModalConfirmacaoRevanche();
  abrirConfiguracaoRevanche();
});
cancelarConfirmacaoRevanche.addEventListener("click", fecharModalConfirmacaoRevanche);
fecharConfirmacaoRevanche.addEventListener("click", fecharModalConfirmacaoRevanche);
modalConfirmarRevanche.addEventListener("click", (evento) => {
  if (evento.target === modalConfirmarRevanche || evento.target?.dataset?.cancelarRevanche === "true") fecharModalConfirmacaoRevanche();
});
voltarInicioVitoria.addEventListener("click", voltarParaInicioDepoisDaVitoria);

iniciarDesempateButton.addEventListener("click", () => {
  if (vencedoresEquipeIds.length < 2) return;
  modoDesempate = true;
  equipesDesempateIds = [...vencedoresEquipeIds];
  pontuacaoBaseDesempate = Object.fromEntries(equipesConfiguradas
    .filter((equipe) => equipesDesempateIds.includes(equipe.id))
    .map((equipe) => [equipe.id, calcularPontos(equipe)]));
  vencedoresEquipeIds = [];
  indiceEquipeInicial = 0;
  mostrarTelaEquipeDaVez();
});
voltarEquipes.addEventListener("click", () => mostrarTela(telaEquipes));
voltarTemas.addEventListener("click", () => mostrarTela(telaTemas));

metaPontosInput.addEventListener("input", () => {
  statusEquipesSetup.textContent = "";
  atualizarAjudaMeta();
});
alternarMetaManual.addEventListener("click", alternarPersonalizacaoMeta);

document.querySelectorAll(".difficulty-card").forEach((botao) => {
  botao.addEventListener("click", () => {
    const segundos = Number(botao.dataset.segundos);
    dificuldadeSelecionada = segundos === 30 ? "medio" : segundos === 45 ? "dificil" : "facil";
    const musicasTema = obterMusicasDoTema(temaSelecionado);
    if (!musicasTema.length) {
      mostrarAvisoPersonalizado(
        "Nenhuma música disponível neste tema",
        "Este tema ainda não tem músicas classificadas.",
        {
          etiqueta: "CATÁLOGO DE MÚSICAS",
          icone: "🎵",
          detalhe: "Volte à escolha dos temas ou classifique músicas neste gênero pelo painel administrativo. A partida ainda não foi iniciada.",
          tituloDetalhe: "Como continuar?",
          textoConfirmar: "Entendi"
        }
      );
      return;
    }
    prepararEquipesParaPartida();
    prepararFila();
    mostrarTelaEquipeDaVez();
  });
});

cantarMusica.addEventListener("click", equipeAtualVaiCantar);
pularMusica.addEventListener("click", pularEquipeAtual);
confirmarVotos.addEventListener("click", confirmarVotacao);
cantoCorreto.addEventListener("click", () => avaliarCanto(true));
cantoIncorreto.addEventListener("click", () => avaliarCanto(false));
passarDesafioMusical.addEventListener("click", passarDesafioMusicalCompleto);
confirmarVotosDesafioMusical.addEventListener("click", confirmarVotacaoDesafioMusical);
respostaDesafioCorreta.addEventListener("click", () => avaliarRespostaDesafioMusical(true));
respostaDesafioIncorreta.addEventListener("click", () => avaliarRespostaDesafioMusical(false));
document.querySelectorAll("[data-desafio-musical]").forEach((botao) => {
  botao.addEventListener("click", () => selecionarDesafioMusical(botao.dataset.desafioMusical));
});
desafioCumprido.addEventListener("click", () => {
  if (!rodada || rodada.etapa !== "danca") return;
  rodada.indiceDesafioDanca += 1;
  if (rodada.indiceDesafioDanca >= rodada.desafiosDanca.length) concluirDesafiosDanca();
  else renderizarEstadoRodada();
});

play.addEventListener("click", () => {
  if (musica.ended) musica.currentTime = 0;
  tocarMusica();
});
pause.addEventListener("click", pausarMusica);
resume.addEventListener("click", tocarMusica);
temporizador.addEventListener("click", iniciarTemporizador);
pararTempo.addEventListener("click", () => pararTemporizador(true));

revelar.addEventListener("click", () => {
  if (revelar.disabled) return;
  resposta.hidden = !resposta.hidden;
  revelar.textContent = resposta.hidden ? "👁 Revelar resposta" : "🙈 Ocultar resposta";
});

proximaMusica.addEventListener("click", () => {
  if (!rodada || !["resolvida", "todas-passaram"].includes(rodada.etapa) || vencedoresEquipeIds.length) return;
  mostrarTelaEquipeDaVez();
});

voltarAoInicio.addEventListener("click", async () => {
  const temPontuacao = equipesConfiguradas.some((equipe) => calcularPontos(equipe) > 0);
  const confirmarSaida = temPontuacao
    ? await confirmarAcaoPersonalizada(
        "Voltar ao menu inicial?",
        "Você está prestes a encerrar a partida atual.",
        {
          etiqueta: "ENCERRAR PARTIDA",
          icone: "🏠",
          tituloDetalhe: "O que será mantido?",
          detalhe: "O placar e o progresso desta partida serão encerrados. Os nomes e participantes das equipes permanecerão cadastrados. O catálogo de músicas e os arquivos de áudio não serão alterados.",
          textoConfirmar: "Sim, voltar ao início",
          textoCancelar: "Continuar jogando",
          perigo: true
        }
      )
    : true;
  if (!confirmarSaida) return;
  limparSessaoDeJogo();
  modoSelecionado = null;
  mostrarTela(telaModos);
});

musica.addEventListener("loadedmetadata", () => { fim.textContent = converterTempo(musica.duration); });
musica.addEventListener("timeupdate", () => {
  if (!musica.duration) return;
  progresso.value = (musica.currentTime / musica.duration) * 100;
  inicio.textContent = converterTempo(musica.currentTime);
});
progresso.addEventListener("input", () => {
  if (musica.duration) musica.currentTime = (Number(progresso.value) / 100) * musica.duration;
});
musica.addEventListener("ended", () => {
  if (!musicaAtual || telaJogo.hidden) return;
  pararTemporizador(false);
  definirEstadoPlayer("fim");
});
musica.addEventListener("error", () => {
  if (!musicaAtual) return;
  statusAudio.textContent = `Não foi possível carregar o áudio: ${musicaAtual.arquivo}. Confira o caminho do arquivo.`;
  definirEstadoPlayer("carregado");
});

if (typeof musicas === "undefined" || !Array.isArray(musicas)) {
  iniciarJogo.disabled = true;
  iniciarJogo.textContent = "Erro ao carregar o catálogo";
} else if (typeof categoriasMusicais === "undefined") {
  iniciarJogo.disabled = true;
  iniciarJogo.textContent = "Erro ao carregar categorias.js";
}

// Mantém a tela de equipes coerente se o navegador renderizar a página em tela estreita.
renderizarSetupEquipes();
