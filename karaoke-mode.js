/* Terceiro modo independente: Karaokê. Não altera as regras dos outros modos. */
(function () {
  "use strict";

  const core = window.SOMKaraokeCore;
  const catalogoBruto = typeof catalogoKaraoke !== "undefined" ? catalogoKaraoke : [];
  const faixas = core ? core.filtrarFaixasValidas(catalogoBruto) : [];
  const $ = (id) => document.getElementById(id);
  const screens = [
    "telaInicial", "telaModos", "telaEquipes", "telaTemas", "telaDificuldade", "telaEquipeDaVez", "jogo", "telaVitoria",
    "telaKaraokeRegras", "telaKaraokeSetup", "telaKaraokeVez", "telaKaraokeEscolherMusica", "telaKaraokeApresentacao",
    "telaKaraokeAvaliacao", "telaKaraokeResultado", "telaKaraokeFinal"
  ].map($).filter(Boolean);

  const comentariosPredefinidos = [
    "Mandou bem!",
    "Acertou as frases!",
    "Entrou no tempo certo!",
    "Manteve o ritmo!",
    "Boa energia!",
    "Boa interpretação!",
    "Acompanhou bem a letra!",
    "Perdeu o ritmo em alguns trechos.",
    "Algumas palavras ficaram fora do tempo.",
    "Precisa acompanhar melhor a letra.",
    "Continue praticando!"
  ];

  let pessoasIndividuais = Array.from({ length: 4 }, (_, i) => ({ id: `karaoke-pessoa-${i + 1}`, nome: "" }));
  let equipes = [
    { id: "karaoke-equipe-1", nome: "Equipe 1", participantes: Array.from({ length: 3 }, (_, i) => ({ id: `karaoke-e1-p${i + 1}`, nome: "" })) },
    { id: "karaoke-equipe-2", nome: "Equipe 2", participantes: Array.from({ length: 3 }, (_, i) => ({ id: `karaoke-e2-p${i + 1}`, nome: "" })) }
  ];
  let proximoIdPessoa = 5;
  let proximoIdEquipe = 3;
  let formato = "individual";
  let selecaoMusica = "escolher";
  let quantidadeJurados = 3;
  let musicasPorPessoa = 5;
  let metaPorApresentacao = 70;
  let participantesSessao = [];
  let equipesSessao = [];
  let agenda = [];
  let indiceAgenda = 0;
  let cantorAtual = null;
  let faixaAtual = null;
  let faixasUsadas = new Set();
  let resultados = [];
  let intervaloAnimacaoNota = null;
  let contextoAudioTicks = null;

  const telaRegras = $("telaKaraokeRegras");
  const telaSetup = $("telaKaraokeSetup");
  const telaVez = $("telaKaraokeVez");
  const telaEscolha = $("telaKaraokeEscolherMusica");
  const telaApresentacao = $("telaKaraokeApresentacao");
  const telaAvaliacao = $("telaKaraokeAvaliacao");
  const telaResultado = $("telaKaraokeResultado");
  const telaFinal = $("telaKaraokeFinal");

  const btnModoKaraoke = $("modoKaraoke");
  const listaPessoas = $("karaokeListaPessoas");
  const listaEquipes = $("karaokeListaEquipes");
  const campoMusicasPorPessoa = $("karaokeMusicasPorPessoa");
  const campoJurados = $("karaokeQuantidadeJurados");
  const statusSetup = $("karaokeSetupMensagem");
  const btnIniciar = $("karaokeIniciarPartida");
  const campoBusca = $("karaokeBuscaMusica");
  const listaMusicas = $("karaokeListaMusicas");
  const video = $("karaokeVideo");
  const audio = $("karaokeAudio");
  const letraPainel = $("karaokeLetraSincronizada");
  const linhaAtual = $("karaokeLinhaAtual");
  const proximaLinha = $("karaokeProximaLinha");

  function mostrarTelaKaraoke(tela) {
    if (tela !== telaResultado && intervaloAnimacaoNota) {
      clearInterval(intervaloAnimacaoNota);
      intervaloAnimacaoNota = null;
    }
    screens.forEach((item) => { item.hidden = item !== tela; });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function escapar(texto) {
    return String(texto == null ? "" : texto).replace(/[&<>"']/g, (caractere) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[caractere]);
  }

  // Resolve os caminhos a partir da pasta onde index.html foi carregado.
  // new URL trata espacos e caracteres acentuados sem depender da URL da pagina.
  function resolverUrlMidia(caminho) {
    const caminhoLimpo = String(caminho || "").trim().replace(/\\/g, "/");
    if (!caminhoLimpo) throw new Error("O catalogo nao informou o caminho do arquivo.");
    return new URL(caminhoLimpo, document.baseURI).href;
  }

  function mensagemErroMidia(elemento, faixa, tipo) {
    const erro = elemento && elemento.error ? elemento.error : null;
    const codigo = erro ? Number(erro.code) : 0;
    const caminho = String(faixa && faixa.arquivo || "nao informado");
    let explicacao;

    if (codigo === 2) {
      explicacao = "O navegador nao conseguiu encontrar ou baixar o arquivo. Confira se o MP4 existe exatamente nesse caminho e se o nome corresponde ao cadastro.";
    } else if (codigo === 3) {
      explicacao = "O arquivo foi encontrado, mas o navegador nao conseguiu decodificar o video. Reexporte em MP4 com video H.264 e audio AAC.";
    } else if (codigo === 4) {
      explicacao = "O formato ou codec nao e suportado, ou o arquivo esta invalido. A extensao MP4 sozinha nao garante compatibilidade: use MP4 H.264 + AAC.";
    } else if (codigo === 1) {
      explicacao = "O carregamento do video foi interrompido. Tente recarregar a pagina e abrir a faixa novamente.";
    } else {
      explicacao = "Confira se o arquivo existe no caminho informado e se foi exportado em MP4 H.264 com audio AAC.";
    }

    const urlResolvida = elemento && (elemento.currentSrc || elemento.src) ? (elemento.currentSrc || elemento.src) : "URL ainda nao resolvida";
    console.error(`[SOM NA MESA Karaoke] Falha ao carregar ${tipo}. Codigo: ${codigo || "desconhecido"}. Caminho do catalogo: ${caminho}. URL: ${urlResolvida}`, erro || "Sem detalhes do MediaError");
    return `${explicacao} Caminho cadastrado: ${caminho}`;
  }

  function lerFormatoSelecionado() {
    return document.querySelector('input[name="karaokeFormato"]:checked')?.value || "individual";
  }

  function lerSelecaoSelecionada() {
    return document.querySelector('input[name="karaokeSelecao"]:checked')?.value || "escolher";
  }

  function pessoasPreenchidasIndividual() {
    return pessoasIndividuais.map((p) => ({ ...p, nome: String(p.nome || "").trim() })).filter((p) => p.nome);
  }

  function equipesPreenchidas() {
    return equipes.map((e) => ({
      ...e,
      nome: String(e.nome || "").trim(),
      participantes: e.participantes.map((p) => ({ ...p, nome: String(p.nome || "").trim() })).filter((p) => p.nome)
    }));
  }

  function coletarParticipantesValidos() {
    formato = lerFormatoSelecionado();
    if (formato === "individual") return pessoasPreenchidasIndividual();
    return equipesPreenchidas().flatMap((equipe) => equipe.participantes.map((p) => ({ ...p, equipeId: equipe.id, equipeNome: equipe.nome })));
  }

  function renderizarPessoasIndividuais() {
    listaPessoas.innerHTML = "";
    pessoasIndividuais.forEach((pessoa, indice) => {
      const row = document.createElement("div");
      row.className = "karaoke-person-row";
      const label = document.createElement("label");
      label.className = "field";
      const span = document.createElement("span");
      span.textContent = `Participante ${indice + 1}`;
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 60;
      input.placeholder = `Nome do cantor ${indice + 1}`;
      input.value = pessoa.nome;
      input.setAttribute("aria-label", `Nome do participante ${indice + 1}`);
      input.addEventListener("input", () => { pessoa.nome = input.value; atualizarResumoSetup(); });
      label.append(span, input);
      row.appendChild(label);
      if (pessoasIndividuais.length > 1) {
        const remover = document.createElement("button");
        remover.type = "button";
        remover.className = "karaoke-remove-button";
        remover.textContent = "Remover";
        remover.addEventListener("click", () => {
          pessoasIndividuais = pessoasIndividuais.filter((p) => p.id !== pessoa.id);
          renderizarPessoasIndividuais();
          atualizarResumoSetup();
        });
        row.appendChild(remover);
      }
      listaPessoas.appendChild(row);
    });
  }

  function renderizarEquipes() {
    listaEquipes.innerHTML = "";
    equipes.forEach((equipe, indiceEquipe) => {
      const card = document.createElement("article");
      card.className = "karaoke-team-card";
      const titulo = document.createElement("h3");
      titulo.textContent = `Equipe ${indiceEquipe + 1}`;
      const nomeLabel = document.createElement("label");
      nomeLabel.className = "field";
      const nomeCaption = document.createElement("span");
      nomeCaption.textContent = "Nome da equipe";
      const nomeInput = document.createElement("input");
      nomeInput.type = "text";
      nomeInput.maxLength = 50;
      nomeInput.value = equipe.nome;
      nomeInput.placeholder = `Ex.: Equipe ${indiceEquipe + 1}`;
      nomeInput.addEventListener("input", () => { equipe.nome = nomeInput.value; atualizarResumoSetup(); });
      nomeLabel.append(nomeCaption, nomeInput);
      const membros = document.createElement("div");
      membros.className = "karaoke-team-members";
      equipe.participantes.forEach((pessoa, indicePessoa) => {
        const row = document.createElement("div");
        row.className = "karaoke-person-row";
        const label = document.createElement("label");
        label.className = "field";
        const span = document.createElement("span");
        span.textContent = `Participante ${indicePessoa + 1}`;
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = 60;
        input.value = pessoa.nome;
        input.placeholder = `Nome do participante ${indicePessoa + 1}`;
        input.addEventListener("input", () => { pessoa.nome = input.value; atualizarResumoSetup(); });
        label.append(span, input);
        row.appendChild(label);
        if (equipe.participantes.length > 1) {
          const removerPessoa = document.createElement("button");
          removerPessoa.type = "button";
          removerPessoa.className = "karaoke-remove-button";
          removerPessoa.textContent = "×";
          removerPessoa.title = "Remover participante";
          removerPessoa.setAttribute("aria-label", `Remover participante ${indicePessoa + 1} da equipe ${indiceEquipe + 1}`);
          removerPessoa.addEventListener("click", () => {
            equipe.participantes = equipe.participantes.filter((p) => p.id !== pessoa.id);
            renderizarEquipes();
            atualizarResumoSetup();
          });
          row.appendChild(removerPessoa);
        }
        membros.appendChild(row);
      });
      const footer = document.createElement("div");
      footer.className = "karaoke-team-footer";
      const total = document.createElement("small");
      total.textContent = `${equipe.participantes.filter((p) => String(p.nome).trim()).length} participante(s) preenchido(s)`;
      const addPessoa = document.createElement("button");
      addPessoa.type = "button";
      addPessoa.className = "button secondary small";
      addPessoa.textContent = "+ Participante";
      addPessoa.addEventListener("click", () => {
        equipe.participantes.push({ id: `${equipe.id}-p-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`, nome: "" });
        renderizarEquipes();
        atualizarResumoSetup();
      });
      footer.append(total, addPessoa);
      card.append(titulo, nomeLabel, membros, footer);
      if (equipes.length > 2) {
        const removeTeam = document.createElement("button");
        removeTeam.type = "button";
        removeTeam.className = "karaoke-remove-button";
        removeTeam.style.marginTop = "10px";
        removeTeam.textContent = "Remover equipe";
        removeTeam.addEventListener("click", () => {
          equipes = equipes.filter((e) => e.id !== equipe.id);
          renderizarEquipes();
          atualizarResumoSetup();
        });
        card.appendChild(removeTeam);
      }
      listaEquipes.appendChild(card);
    });
  }

  function obterConfiguracaoAtual() {
    formato = lerFormatoSelecionado();
    selecaoMusica = lerSelecaoSelecionada();
    quantidadeJurados = Number(campoJurados.value) || 1;
    musicasPorPessoa = Math.max(1, Math.min(30, Math.floor(Number(campoMusicasPorPessoa.value) || 1)));
    const metaBruta = $("karaokeMetaPorApresentacao").value.trim();
    metaPorApresentacao = metaBruta === "" ? NaN : Number(metaBruta);
    const participantes = coletarParticipantesValidos();
    const equipesValidas = equipesPreenchidas().filter((e) => e.nome && e.participantes.length);
    return { formato, selecaoMusica, quantidadeJurados, musicasPorPessoa, participantes, equipesValidas };
  }

  function atualizarResumoSetup() {
    const config = obterConfiguracaoAtual();
    const totalParticipantes = config.participantes.length;
    const totalApresentacoes = totalParticipantes * config.musicasPorPessoa;
    const totalFaixas = faixas.length;
    const duracao = core.estimarDuracaoMinutos(totalApresentacoes, faixas);
    $("karaokeResumoApresentacoes").textContent = `${totalApresentacoes} apresentação(ões) previstas para ${totalParticipantes} participante(s)`;
    $("karaokeEstimativaTempo").textContent = `Tempo médio estimado: cerca de ${core.formatarDuracao(duracao)}.`;
    $("karaokeResumoRepertorio").textContent = totalFaixas >= totalApresentacoes
      ? `${totalFaixas} faixa(s) disponíveis; ${totalApresentacoes} serão usadas sem repetição.`
      : `São necessárias ${totalApresentacoes} faixas diferentes, mas há ${totalFaixas}. Reduza as músicas por participante ou cadastre mais mídia.`;

    const statusCatalogo = $("karaokeCatalogoStatus");
    if (!totalFaixas) {
      statusCatalogo.classList.remove("is-ready");
      statusCatalogo.textContent = "Ainda não há faixas válidas no catálogo do Karaokê. Adicione vídeos autorizados em karaoke/videos/ ou instrumentais com letra sincronizada em karaoke/audio/, e registre-os em karaoke.js. Os outros modos continuam funcionando normalmente.";
    } else {
      statusCatalogo.classList.add("is-ready");
      statusCatalogo.textContent = `${totalFaixas} faixa(s) válida(s) cadastrada(s). Cada música será usada no máximo uma vez nesta partida.`;
    }

    let validacao = "";
    if (config.musicasPorPessoa < 1 || config.musicasPorPessoa > 30) validacao = "Escolha de 1 a 30 músicas por participante.";
    else if (!Number.isInteger(metaPorApresentacao) || metaPorApresentacao < 1 || metaPorApresentacao > 100) validacao = "A meta por apresentação deve ser um número inteiro entre 1 e 100 pontos.";
    else if (!totalParticipantes) validacao = "Cadastre pelo menos um participante com nome.";
    else if (config.formato === "equipes" && (config.equipesValidas.length < 2 || config.equipesValidas.length !== equipes.length)) validacao = "Preencha o nome de todas as equipes e cadastre pelo menos um participante em cada uma. São necessárias pelo menos duas equipes.";
    else if (config.formato === "equipes" && new Set(config.equipesValidas.map((e) => e.nome.toLocaleLowerCase("pt-BR"))).size !== config.equipesValidas.length) validacao = "Os nomes das equipes precisam ser diferentes.";
    else if (totalFaixas < totalApresentacoes) validacao = `O repertório é insuficiente: são necessárias ${totalApresentacoes} faixas diferentes e há ${totalFaixas}. Reduza a quantidade de músicas por participante.`;

    statusSetup.textContent = validacao;
    btnIniciar.disabled = Boolean(validacao);
    return !validacao;
  }

  function renderizarListaFaixas() {
    const disponiveis = core.faixasDisponiveis(faixas, faixasUsadas);
    const busca = String(campoBusca.value || "").trim().toLocaleLowerCase("pt-BR");
    const filtradas = disponiveis.filter((faixa) => `${faixa.titulo} ${faixa.artista || ""}`.toLocaleLowerCase("pt-BR").includes(busca));
    $("karaokeDisponiveisResumo").textContent = `${disponiveis.length} música(s) ainda disponíveis nesta partida.`;
    const marqueeText = disponiveis.length ? disponiveis.map((faixa) => `${faixa.titulo}${faixa.artista ? ` — ${faixa.artista}` : ""}`).join("　•　") : "Nenhuma música disponível";
    $("karaokeMarqueeTrack").innerHTML = "";
    for (let i = 0; i < 2; i += 1) {
      const span = document.createElement("span");
      span.textContent = marqueeText;
      $("karaokeMarqueeTrack").appendChild(span);
    }
    listaMusicas.innerHTML = "";
    if (!filtradas.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = disponiveis.length ? "Nenhuma música corresponde à pesquisa." : "Todas as músicas cadastradas já foram utilizadas nesta partida.";
      listaMusicas.appendChild(empty);
      return;
    }
    filtradas.forEach((faixa) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "karaoke-song-card";
      const title = document.createElement("strong");
      title.textContent = faixa.titulo;
      const artist = document.createElement("span");
      artist.textContent = faixa.artista || "Artista não informado";
      const type = document.createElement("span");
      type.textContent = faixa.tipo === "video" ? "▶ Vídeo de karaokê" : "♫ Instrumental + letra";
      button.append(title, artist, type);
      button.addEventListener("click", () => iniciarFaixa(faixa));
      listaMusicas.appendChild(button);
    });
  }

  function mostrarCantorDaVez() {
    if (indiceAgenda >= agenda.length) {
      mostrarPlacarFinal();
      return;
    }
    pararMidiaKaraoke(false);
    cantorAtual = agenda[indiceAgenda];
    $("karaokeTituloCantorVez").textContent = cantorAtual.participanteNome;
    $("karaokeSubtituloCantorVez").textContent = formato === "equipes" ? `Cantor(a) da ${cantorAtual.equipeNome}. A nota será registrada para essa equipe.` : "Sua apresentação individual. A nota ficará registrada no seu placar.";
    $("karaokeNumeroApresentacao").textContent = `${indiceAgenda + 1} de ${agenda.length}`;
    $("karaokeEquipeCantorVez").textContent = formato === "equipes" ? cantorAtual.equipeNome : "Modo individual";
    $("karaokeContinuarCantor").textContent = selecaoMusica === "aleatorio" ? "Sortear música e começar →" : "Escolher música →";
    mostrarTelaKaraoke(telaVez);
  }

  function prepararAgenda() {
    const config = obterConfiguracaoAtual();
    faixaAtual = null;
    participantesSessao = config.participantes.map((p) => ({ ...p }));
    equipesSessao = config.equipesValidas.map((e) => ({ ...e, participantes: e.participantes.map((p) => ({ ...p })) }));
    agenda = config.formato === "equipes"
      ? core.gerarAgendaEquipes(equipesSessao, config.musicasPorPessoa)
      : core.gerarAgendaIndividual(participantesSessao, config.musicasPorPessoa);
    indiceAgenda = 0;
    faixasUsadas = new Set();
    resultados = [];
    mostrarCantorDaVez();
  }

  function iniciarPartida() {
    if (!atualizarResumoSetup()) return;
    prepararAgenda();
  }

  function continuarDoCantor() {
    if (selecaoMusica === "aleatorio") {
      const disponiveis = core.faixasDisponiveis(faixas, faixasUsadas);
      if (!disponiveis.length) {
        mostrarAvisoPersonalizado(
          "O repertório chegou ao fim",
          "Não restam músicas disponíveis para esta partida.",
          {
            etiqueta: "CATÁLOGO DO KARAOKÊ",
            icone: "🎤",
            tituloDetalhe: "Como continuar?",
            detalhe: "Todas as faixas cadastradas já foram utilizadas. Encerre esta partida ou prepare uma nova para liberar o repertório novamente.",
            textoConfirmar: "Entendi"
          }
        );
        return;
      }
      const faixa = disponiveis[Math.floor(Math.random() * disponiveis.length)];
      iniciarFaixa(faixa);
      return;
    }
    campoBusca.value = "";
    $("karaokeCantorEscolhaTexto").textContent = `Cantor(a): ${cantorAtual.participanteNome}${formato === "equipes" ? ` · ${cantorAtual.equipeNome}` : ""}`;
    $("karaokeEscolhaMensagem").textContent = "Escolha uma música que ainda não tenha sido utilizada.";
    renderizarListaFaixas();
    mostrarTelaKaraoke(telaEscolha);
  }

  function iniciarFaixa(faixa) {
    if (!faixa || faixasUsadas.has(String(faixa.id))) {
      $("karaokeEscolhaMensagem").textContent = "Essa música já foi utilizada nesta partida. Escolha outra.";
      return;
    }
    faixaAtual = faixa;
    faixasUsadas.add(String(faixa.id));
    $("karaokeTituloFaixa").textContent = faixa.titulo;
    $("karaokeArtistaFaixa").textContent = `${faixa.artista || "Artista não informado"} · Cantor(a): ${cantorAtual.participanteNome}${formato === "equipes" ? ` (${cantorAtual.equipeNome})` : ""}`;
    $("karaokeFormatoFaixa").textContent = faixa.tipo === "video" ? "VÍDEO KARAOKÊ" : "INSTRUMENTAL";
    $("karaokeMediaMensagem").textContent = faixa.tipo === "video" ? "Use o vídeo com a letra embutida. Ao terminar, encerre a apresentação para avaliar." : "Cante acompanhando as frases destacadas. Ao terminar, encerre a apresentação para avaliar.";
    video.pause();
    audio.pause();
    video.removeAttribute("src");
    audio.removeAttribute("src");
    video.load();
    audio.load();
    video.hidden = faixa.tipo !== "video";
    audio.hidden = faixa.tipo !== "audio";
    try {
      const urlMidia = resolverUrlMidia(faixa.arquivo);
      if (faixa.tipo === "video") {
        video.preload = "metadata";
        video.src = urlMidia;
        video.load();
        $("karaokeMediaMensagem").textContent = `Carregando vídeo: ${faixa.arquivo}. Quando estiver pronto, toque em ▶.`;
      } else {
        audio.preload = "metadata";
        audio.src = urlMidia;
        audio.load();
        $("karaokeMediaMensagem").textContent = `Carregando instrumental: ${faixa.arquivo}. Quando estiver pronto, toque em ▶.`;
      }
    } catch (erro) {
      console.error("[SOM NA MESA Karaoke] Caminho de mídia inválido:", erro);
      $("karaokeMediaMensagem").textContent = `Não foi possível preparar a mídia. Confira o campo arquivo em karaoke.js: ${faixa.arquivo || "caminho vazio"}.`;
    }
    const temLetra = Array.isArray(faixa.letra) && faixa.letra.length > 0;
    letraPainel.hidden = !temLetra;
    linhaAtual.textContent = temLetra ? "Prepare-se para cantar…" : "";
    proximaLinha.textContent = "";
    $("karaokeFalhaMedia").hidden = false;
    mostrarTelaKaraoke(telaApresentacao);
  }

  function pararMidiaKaraoke(limparFonte) {
    if (video) {
      video.pause();
      if (limparFonte) { video.removeAttribute("src"); video.load(); }
    }
    if (audio) {
      audio.pause();
      if (limparFonte) { audio.removeAttribute("src"); audio.load(); }
    }
  }

  function atualizarLetra() {
    if (!faixaAtual || !Array.isArray(faixaAtual.letra) || !faixaAtual.letra.length) return;
    const tempo = faixaAtual.tipo === "video" ? video.currentTime : audio.currentTime;
    let indice = faixaAtual.letra.findIndex((linha) => tempo >= Number(linha.inicio) && tempo < Number(linha.fim));
    if (indice < 0) indice = faixaAtual.letra.findIndex((linha) => tempo < Number(linha.inicio));
    if (indice < 0) {
      linhaAtual.textContent = "Muito bem! Continue até o fim.";
      proximaLinha.textContent = "";
      return;
    }
    const linha = faixaAtual.letra[indice];
    linhaAtual.textContent = linha.texto;
    proximaLinha.textContent = faixaAtual.letra[indice + 1] ? faixaAtual.letra[indice + 1].texto : "";
  }

  function gerarCartoesJurados() {
    const container = $("karaokeCartoesJurados");
    container.innerHTML = "";
    for (let indice = 0; indice < quantidadeJurados; indice += 1) {
      const card = document.createElement("article");
      card.className = "karaoke-judge-card";
      const title = document.createElement("h2");
      title.textContent = `Jurado ${indice + 1}`;
      const scoreLabel = document.createElement("label");
      scoreLabel.className = "field";
      const scoreCaption = document.createElement("span");
      scoreCaption.textContent = "Nota de 0 a 100";
      const scoreInput = document.createElement("input");
      scoreInput.type = "number";
      scoreInput.min = "0";
      scoreInput.max = "100";
      scoreInput.step = "1";
      scoreInput.required = true;
      scoreInput.inputMode = "numeric";
      scoreInput.placeholder = "Ex.: 85";
      scoreInput.dataset.judgeScore = String(indice);
      scoreLabel.append(scoreCaption, scoreInput);
      const commentsLabel = document.createElement("span");
      commentsLabel.className = "karaoke-comments-label";
      commentsLabel.textContent = "Comentários (opcional)";
      const comments = document.createElement("div");
      comments.className = "karaoke-comment-options";
      comentariosPredefinidos.forEach((texto, comentarioIndice) => {
        const label = document.createElement("label");
        label.className = "karaoke-comment-option";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.dataset.judgeComment = String(indice);
        checkbox.value = texto;
        checkbox.id = `karaoke-j${indice}-comment-${comentarioIndice}`;
        const span = document.createElement("span");
        span.textContent = texto;
        label.append(checkbox, span);
        comments.appendChild(label);
      });
      card.append(title, scoreLabel, commentsLabel, comments);
      container.appendChild(card);
    }
  }

  function iniciarAvaliacao() {
    pararMidiaKaraoke(false);
    $("karaokeAvaliacaoCantor").textContent = `${cantorAtual.participanteNome}${formato === "equipes" ? ` · ${cantorAtual.equipeNome}` : ""} — ${faixaAtual.titulo}`;
    $("karaokeAvaliacaoMensagem").textContent = "Cada jurado deve inserir uma nota. Os comentários são opcionais.";
    gerarCartoesJurados();
    mostrarTelaKaraoke(telaAvaliacao);
  }

  function tocarSomDeContagem() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!contextoAudioTicks) contextoAudioTicks = new AudioContextClass();
      if (contextoAudioTicks.state === "suspended") contextoAudioTicks.resume();
      const oscillator = contextoAudioTicks.createOscillator();
      const gain = contextoAudioTicks.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = 660 + Math.random() * 240;
      gain.gain.setValueAtTime(0.035, contextoAudioTicks.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, contextoAudioTicks.currentTime + 0.035);
      oscillator.connect(gain);
      gain.connect(contextoAudioTicks.destination);
      oscillator.start();
      oscillator.stop(contextoAudioTicks.currentTime + 0.04);
    } catch (_) { /* A animação visual continua se o navegador bloquear o som. */ }
  }

  function animarNotaFinal(nota) {
    if (intervaloAnimacaoNota) clearInterval(intervaloAnimacaoNota);
    const alvo = Math.max(0, Math.min(100, Math.round(nota)));
    const inicio = Date.now();
    $("karaokeNotaFinal").textContent = "0";
    let ticks = 0;
    intervaloAnimacaoNota = setInterval(() => {
      const decorrido = Date.now() - inicio;
      $("karaokeNotaFinal").textContent = String(Math.floor(Math.random() * 101));
      if (ticks % 2 === 0) tocarSomDeContagem();
      ticks += 1;
      if (decorrido >= 1700) {
        clearInterval(intervaloAnimacaoNota);
        intervaloAnimacaoNota = null;
        $("karaokeNotaFinal").textContent = String(alvo);
        tocarSomDeContagem();
      }
    }, 70);
  }

  function enviarNotasJurados() {
    const inputs = [...document.querySelectorAll("[data-judge-score]")];
    const notas = inputs.map((input) => input.value.trim() === "" ? NaN : Number(input.value));
    if (notas.length !== quantidadeJurados || notas.some((n) => !Number.isInteger(n) || n < 0 || n > 100)) {
      $("karaokeAvaliacaoMensagem").textContent = "Confira as notas: todos os jurados precisam informar um número inteiro de 0 a 100.";
      inputs.find((input) => input.value.trim() === "" || !Number.isInteger(Number(input.value)) || Number(input.value) < 0 || Number(input.value) > 100)?.focus();
      return;
    }
    const notaFinal = core.calcularMediaNotas(notas);
    const classificacao = core.classificarNota(notaFinal);
    const comentariosPorJurado = [];
    for (let indice = 0; indice < quantidadeJurados; indice += 1) {
      const selecionados = [...document.querySelectorAll(`[data-judge-comment="${indice}"]:checked`)].map((input) => input.value);
      comentariosPorJurado.push({ jurado: indice + 1, nota: notas[indice], comentarios: selecionados });
    }
    const comentarios = [...new Set(comentariosPorJurado.flatMap((item) => item.comentarios))];
    const resultado = {
      participanteId: cantorAtual.participanteId,
      participanteNome: cantorAtual.participanteNome,
      equipeId: cantorAtual.equipeId,
      equipeNome: cantorAtual.equipeNome,
      faixaId: String(faixaAtual.id),
      titulo: faixaAtual.titulo,
      artista: faixaAtual.artista || "",
      notaFinal,
      classificacao: classificacao.nome,
      classeClassificacao: classificacao.classe,
      notasJurados: comentariosPorJurado,
      comentarios,
      numeroApresentacao: indiceAgenda + 1
    };
    resultados.push(resultado);
    $("karaokeResultadoScoreCard").className = `karaoke-result-card ${classificacao.classe}`;
    $("karaokeClassificacaoFinal").textContent = classificacao.nome;
    $("karaokeResultadoCantor").textContent = `${cantorAtual.participanteNome}${formato === "equipes" ? ` · ${cantorAtual.equipeNome}` : ""} — ${faixaAtual.titulo}`;
    const commentsContainer = $("karaokeComentariosResultado");
    commentsContainer.innerHTML = "";
    if (!comentarios.length) {
      const empty = document.createElement("span");
      empty.className = "karaoke-note";
      empty.textContent = "Nenhum comentário selecionado.";
      commentsContainer.appendChild(empty);
    } else {
      comentarios.forEach((comentario) => {
        const tag = document.createElement("span");
        tag.className = "karaoke-comment-tag";
        tag.textContent = comentario;
        commentsContainer.appendChild(tag);
      });
    }
    const scoresContainer = $("karaokeNotasJuradosResultado");
    scoresContainer.innerHTML = "";
    comentariosPorJurado.forEach((item) => {
      const row = document.createElement("div");
      row.className = "karaoke-judge-score-row";
      const name = document.createElement("span");
      name.textContent = `Jurado ${item.jurado}`;
      const score = document.createElement("strong");
      score.textContent = `${item.nota}/100`;
      row.append(name, score);
      scoresContainer.appendChild(row);
    });
    mostrarTelaKaraoke(telaResultado);
    animarNotaFinal(notaFinal);
  }

  function mostrarPlacarFinal() {
    pararMidiaKaraoke(true);
    if (formato === "individual") {
      $("karaokeTituloFinal").textContent = "Placar individual final";
      $("karaokeSubtituloFinal").textContent = "Todos os participantes concluíram a mesma quantidade de apresentações. O ranking considera a pontuação acumulada.";
    } else {
      $("karaokeTituloFinal").textContent = "Placar final por equipes";
      $("karaokeSubtituloFinal").textContent = "O total de pontos é acumulado por equipe. Para comparar equipes de tamanhos diferentes, a classificação é ordenada pela média por apresentação; o total também aparece.";
    }
    const ranking = formato === "individual"
      ? core.rankingIndividual(resultados, participantesSessao, musicasPorPessoa, metaPorApresentacao)
      : core.rankingEquipes(resultados, equipesSessao, musicasPorPessoa, metaPorApresentacao);
    const container = $("karaokeRankingFinal");
    container.innerHTML = "";
    ranking.forEach((item, indice) => {
      const li = document.createElement("li");
      li.className = "karaoke-ranking-item";
      const pos = document.createElement("span");
      pos.className = "karaoke-ranking-position";
      pos.textContent = String(indice + 1);
      const meta = document.createElement("div");
      meta.className = "karaoke-ranking-name";
      meta.textContent = item.nome;
      const detail = document.createElement("span");
      detail.className = "karaoke-ranking-meta";
      detail.textContent = `${item.apresentacoes} apresentação(ões) · média ${item.media}/100 · meta ${item.meta} pts ${item.metaAtingida ? "alcançada" : "não alcançada"}`;
      meta.appendChild(detail);
      const score = document.createElement("div");
      score.className = "karaoke-ranking-score";
      const total = document.createElement("strong");
      total.textContent = `${item.total} pts`;
      const average = document.createElement("span");
      average.textContent = "total acumulado";
      score.append(total, average);
      li.append(pos, meta, score);
      container.appendChild(li);
    });
    mostrarTelaKaraoke(telaFinal);
  }

  async function voltarAoMenuInicial() {
    const confirmar = await confirmarAcaoPersonalizada(
      "Voltar ao menu inicial?",
      "O progresso desta partida de Karaokê será encerrado.",
      {
        etiqueta: "ENCERRAR KARAOKÊ",
        icone: "🎤",
        tituloDetalhe: "O que será descartado?",
        detalhe: "As apresentações e o placar desta partida serão descartados. Os cadastros de participantes, equipes e vídeos do catálogo serão mantidos.",
        textoConfirmar: "Sim, voltar ao início",
        textoCancelar: "Continuar no Karaokê",
        perigo: true
      }
    );
    if (!confirmar) return;
    if (intervaloAnimacaoNota) { clearInterval(intervaloAnimacaoNota); intervaloAnimacaoNota = null; }
    pararMidiaKaraoke(true);
    faixaAtual = null;
    cantorAtual = null;
    agenda = [];
    indiceAgenda = 0;
    faixasUsadas.clear();
    resultados = [];
    participantesSessao = [];
    equipesSessao = [];
    mostrarTelaKaraoke($("telaInicial"));
  }

  function iniciarNovaPartidaMesmaConfiguracao() {
    pararMidiaKaraoke(true);
    prepararAgenda();
  }

  function voltarAosModos() {
    if (intervaloAnimacaoNota) { clearInterval(intervaloAnimacaoNota); intervaloAnimacaoNota = null; }
    pararMidiaKaraoke(true);
    faixaAtual = null;
    mostrarTelaKaraoke($("telaModos"));
  }

  function inicializar() {
    if (!btnModoKaraoke || !telaRegras || !telaSetup) return;
    $("karaokeCatalogoStatus").textContent = faixas.length
      ? `${faixas.length} faixa(s) válida(s) no catálogo.`
      : "Ainda não há faixas cadastradas para o Karaokê. Veja as instruções abaixo para preparar o repertório.";
    renderizarPessoasIndividuais();
    renderizarEquipes();
    atualizarResumoSetup();

    btnModoKaraoke.addEventListener("click", () => mostrarTelaKaraoke(telaRegras));
    $("continuarKaraokeRegras").addEventListener("click", () => {
      renderizarPessoasIndividuais();
      renderizarEquipes();
      atualizarResumoSetup();
      mostrarTelaKaraoke(telaSetup);
    });
    $("voltarKaraokeModos").addEventListener("click", voltarAosModos);
    $("karaokeVoltarModosSetup").addEventListener("click", voltarAosModos);
    $("karaokeSairDaPartida").addEventListener("click", async () => {
      const confirmar = await confirmarAcaoPersonalizada(
        "Sair do Karaokê?",
        "O placar e o progresso desta partida serão encerrados.",
        {
          etiqueta: "SAIR DA PARTIDA",
          icone: "🎤",
          tituloDetalhe: "O que será mantido?",
          detalhe: "Os cadastros de participantes, equipes e vídeos do catálogo não serão apagados. Você poderá começar outra partida depois.",
          textoConfirmar: "Sim, sair",
          textoCancelar: "Continuar jogando",
          perigo: true
        }
      );
      if (confirmar) voltarAosModos();
    });
    $("karaokeVoltarModosFinal").addEventListener("click", voltarAosModos);
    $("karaokeNovaPartida").addEventListener("click", iniciarNovaPartidaMesmaConfiguracao);
    $("karaokeAdicionarPessoa").addEventListener("click", () => {
      pessoasIndividuais.push({ id: `karaoke-pessoa-${proximoIdPessoa++}`, nome: "" });
      renderizarPessoasIndividuais();
      atualizarResumoSetup();
    });
    $("karaokeAdicionarEquipe").addEventListener("click", () => {
      const id = `karaoke-equipe-${proximoIdEquipe++}`;
      equipes.push({ id, nome: `Equipe ${proximoIdEquipe - 1}`, participantes: Array.from({ length: 3 }, (_, i) => ({ id: `${id}-p${i + 1}`, nome: "" })) });
      renderizarEquipes();
      atualizarResumoSetup();
    });
    document.querySelectorAll('input[name="karaokeFormato"], input[name="karaokeSelecao"]').forEach((input) => input.addEventListener("change", () => {
      formato = lerFormatoSelecionado();
      selecaoMusica = lerSelecaoSelecionada();
      $("karaokeSetupIndividual").hidden = formato !== "individual";
      $("karaokeSetupEquipes").hidden = formato !== "equipes";
      atualizarResumoSetup();
    }));
    campoMusicasPorPessoa.addEventListener("input", atualizarResumoSetup);
    $("karaokeMetaPorApresentacao").addEventListener("input", atualizarResumoSetup);
    campoJurados.addEventListener("change", () => { quantidadeJurados = Number(campoJurados.value) || 1; atualizarResumoSetup(); });
    btnIniciar.addEventListener("click", iniciarPartida);
    $("karaokeContinuarCantor").addEventListener("click", continuarDoCantor);
    $("karaokeCancelarEscolha").addEventListener("click", mostrarCantorDaVez);
    campoBusca.addEventListener("input", renderizarListaFaixas);
    $("karaokeFinalizarApresentacao").addEventListener("click", iniciarAvaliacao);
    $("karaokeFalhaMedia").addEventListener("click", voltarAoMenuInicial);
    $("karaokeEnviarNotas").addEventListener("click", enviarNotasJurados);
    $("karaokeProximoCantor").addEventListener("click", () => {
      indiceAgenda += 1;
      faixaAtual = null;
      if (indiceAgenda >= agenda.length) mostrarPlacarFinal();
      else mostrarCantorDaVez();
    });
    video.addEventListener("timeupdate", atualizarLetra);
    audio.addEventListener("timeupdate", atualizarLetra);
    video.addEventListener("loadedmetadata", () => {
      if (!faixaAtual || video.hidden || faixaAtual.tipo !== "video") return;
      const duracao = Number.isFinite(video.duration) ? video.duration : 0;
      const minutos = Math.floor(duracao / 60);
      const segundos = String(Math.floor(duracao % 60)).padStart(2, "0");
      $("karaokeMediaMensagem").textContent = duracao > 0
        ? `Vídeo carregado (${minutos}:${segundos}). Toque em ▶ para começar.`
        : "Vídeo carregado. Toque em ▶ para começar.";
    });
    audio.addEventListener("loadedmetadata", () => {
      if (!faixaAtual || audio.hidden || faixaAtual.tipo !== "audio") return;
      $("karaokeMediaMensagem").textContent = "Instrumental carregado. Toque em ▶ para começar.";
    });
    video.addEventListener("error", () => {
      if (faixaAtual && !video.hidden) {
        $("karaokeMediaMensagem").textContent = mensagemErroMidia(video, faixaAtual, "vídeo");
      }
    });
    audio.addEventListener("error", () => {
      if (faixaAtual && !audio.hidden) {
        $("karaokeMediaMensagem").textContent = mensagemErroMidia(audio, faixaAtual, "instrumental");
      }
    });
    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape" && !telaSetup.hidden) {
        // A configuração não é modal; Escape não descarta nomes digitados.
      }
    });
  }

  inicializar();
})();
