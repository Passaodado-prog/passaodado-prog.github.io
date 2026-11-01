(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.SOMKaraokeCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function normalizarTexto(valor) {
    return String(valor == null ? "" : valor).trim();
  }

  function faixaValida(faixa) {
    if (!faixa || typeof faixa !== "object") return false;
    if (!normalizarTexto(faixa.id) || !normalizarTexto(faixa.titulo) || !normalizarTexto(faixa.arquivo)) return false;
    if (!/^karaoke\/(audio|videos)\//i.test(normalizarTexto(faixa.arquivo))) return false;
    if (normalizarTexto(faixa.arquivo).split("/").includes("..")) return false;
    if (!["audio", "video"].includes(faixa.tipo)) return false;
    if (faixa.tipo === "audio") {
      if (!Array.isArray(faixa.letra) || faixa.letra.length === 0) return false;
      if (!faixa.letra.every((linha) => normalizarTexto(linha && linha.texto) && Number.isFinite(Number(linha.inicio)) && Number.isFinite(Number(linha.fim)) && Number(linha.fim) > Number(linha.inicio))) return false;
    }
    return true;
  }

  function filtrarFaixasValidas(faixas) {
    const vistosIds = new Set();
    const vistosArquivos = new Set();
    return (Array.isArray(faixas) ? faixas : []).filter((faixa) => {
      if (!faixaValida(faixa)) return false;
      const id = String(faixa.id);
      const arquivo = String(faixa.arquivo).toLowerCase();
      if (vistosIds.has(id) || vistosArquivos.has(arquivo)) return false;
      vistosIds.add(id);
      vistosArquivos.add(arquivo);
      return true;
    });
  }

  function classificarNota(valor) {
    const nota = Math.max(0, Math.min(100, Math.round(Number(valor) || 0)));
    if (nota <= 30) return { nome: "Foi ok", classe: "karaoke-band-ok" };
    if (nota <= 50) return { nome: "Foi bom", classe: "karaoke-band-good" };
    if (nota <= 70) return { nome: "Muito bom", classe: "karaoke-band-vgood" };
    if (nota <= 90) return { nome: "Incrível", classe: "karaoke-band-great" };
    return { nome: "Espetacular", classe: "karaoke-band-amazing" };
  }

  function calcularMediaNotas(notas) {
    const valores = (Array.isArray(notas) ? notas : []).map(Number);
    if (!valores.length || valores.some((n) => !Number.isFinite(n) || n < 0 || n > 100)) return null;
    return Math.round(valores.reduce((soma, nota) => soma + nota, 0) / valores.length);
  }

  function gerarAgendaIndividual(participantes, musicasPorPessoa) {
    const quantidade = Math.max(1, Math.floor(Number(musicasPorPessoa) || 1));
    const lista = (Array.isArray(participantes) ? participantes : []).filter((p) => p && normalizarTexto(p.nome));
    const agenda = [];
    for (let rodada = 0; rodada < quantidade; rodada += 1) {
      lista.forEach((p) => agenda.push({ participanteId: p.id, participanteNome: p.nome, equipeId: null, equipeNome: "" }));
    }
    return agenda;
  }

  function gerarAgendaEquipes(equipes, musicasPorPessoa) {
    const quantidade = Math.max(1, Math.floor(Number(musicasPorPessoa) || 1));
    const estado = (Array.isArray(equipes) ? equipes : []).map((equipe) => ({
      id: equipe.id,
      nome: normalizarTexto(equipe.nome),
      membros: (Array.isArray(equipe.participantes) ? equipe.participantes : [])
        .filter((p) => p && normalizarTexto(p.nome))
        .map((p) => ({ id: p.id, nome: normalizarTexto(p.nome), restante: quantidade })),
      cursor: 0
    })).filter((equipe) => equipe.membros.length);

    const agenda = [];
    let ultimaEquipeId = null;
    let cursorEquipes = 0;
    let limiteSeguranca = estado.reduce((soma, equipe) => soma + equipe.membros.length * quantidade, 0) + 1;

    while (estado.some((equipe) => equipe.membros.some((membro) => membro.restante > 0)) && limiteSeguranca > 0) {
      limiteSeguranca -= 1;
      const elegiveis = estado.map((equipe, indice) => ({ equipe, indice }))
        .filter(({ equipe }) => equipe.membros.some((membro) => membro.restante > 0));
      if (!elegiveis.length) break;

      let candidatos = elegiveis.filter(({ equipe }) => equipe.id !== ultimaEquipeId);
      if (!candidatos.length) candidatos = elegiveis;
      let escolhido = null;
      for (let passo = 0; passo < estado.length; passo += 1) {
        const indice = (cursorEquipes + passo) % estado.length;
        const candidato = candidatos.find((item) => item.indice === indice);
        if (candidato) { escolhido = candidato; break; }
      }
      if (!escolhido) escolhido = candidatos[0];

      const equipe = escolhido.equipe;
      let membro = null;
      let indiceMembro = -1;
      for (let passo = 0; passo < equipe.membros.length; passo += 1) {
        const indice = (equipe.cursor + passo) % equipe.membros.length;
        if (equipe.membros[indice].restante > 0) { membro = equipe.membros[indice]; indiceMembro = indice; break; }
      }
      if (!membro) continue;
      membro.restante -= 1;
      equipe.cursor = (indiceMembro + 1) % equipe.membros.length;
      agenda.push({ participanteId: membro.id, participanteNome: membro.nome, equipeId: equipe.id, equipeNome: equipe.nome });
      ultimaEquipeId = equipe.id;
      cursorEquipes = (escolhido.indice + 1) % estado.length;
    }
    return agenda;
  }

  function estimarDuracaoMinutos(quantidadeApresentacoes, faixas) {
    const quantidade = Math.max(0, Number(quantidadeApresentacoes) || 0);
    const lista = filtrarFaixasValidas(faixas);
    if (!quantidade) return 0;
    const duracoes = lista.map((faixa) => Number(faixa.duracaoSegundos)).filter((n) => Number.isFinite(n) && n > 0);
    const mediaSegundos = duracoes.length ? duracoes.reduce((soma, n) => soma + n, 0) / duracoes.length : 180;
    // Inclui 45 segundos médios para notas e troca de cantor. É uma estimativa, não cronômetro real.
    return quantidade * ((mediaSegundos + 45) / 60);
  }

  function formatarDuracao(minutos) {
    if (!Number.isFinite(minutos) || minutos <= 0) return "—";
    const total = Math.max(1, Math.round(minutos));
    if (total < 60) return `${total} minutos`;
    const horas = Math.floor(total / 60);
    const resto = total % 60;
    if (!resto) return horas === 1 ? "1 hora" : `${horas} horas`;
    return `${horas} h ${resto} min`;
  }

  function rankingIndividual(resultados, participantes, musicasPorPessoa = 5, metaPorApresentacao = 70) {
    const meta = Math.max(1, Number(metaPorApresentacao) || 70) * Math.max(1, Number(musicasPorPessoa) || 1);
    return (Array.isArray(participantes) ? participantes : []).map((p) => {
      const linhas = (Array.isArray(resultados) ? resultados : []).filter((r) => r.participanteId === p.id);
      const total = linhas.reduce((soma, r) => soma + r.notaFinal, 0);
      return { id: p.id, nome: p.nome, total, meta, metaAtingida: total >= meta, apresentacoes: linhas.length, media: linhas.length ? Math.round(total / linhas.length) : 0 };
    }).sort((a, b) => b.total - a.total || b.media - a.media || a.nome.localeCompare(b.nome, "pt-BR"));
  }

  function rankingEquipes(resultados, equipes, musicasPorPessoa = 5, metaPorApresentacao = 70) {
    const metaBase = Math.max(1, Number(metaPorApresentacao) || 70) * Math.max(1, Number(musicasPorPessoa) || 1);
    return (Array.isArray(equipes) ? equipes : []).map((equipe) => {
      const linhas = (Array.isArray(resultados) ? resultados : []).filter((r) => r.equipeId === equipe.id);
      const total = linhas.reduce((soma, r) => soma + r.notaFinal, 0);
      const quantidadePessoas = (Array.isArray(equipe.participantes) ? equipe.participantes : []).filter((p) => p && String(p.nome || "").trim()).length;
      const meta = metaBase * quantidadePessoas;
      return { id: equipe.id, nome: equipe.nome, total, meta, metaAtingida: total >= meta, apresentacoes: linhas.length, media: linhas.length ? Math.round(total / linhas.length) : 0 };
    }).sort((a, b) => b.media - a.media || b.total - a.total || a.nome.localeCompare(b.nome, "pt-BR"));
  }

  function faixasDisponiveis(faixas, idsUsados) {
    const usados = idsUsados instanceof Set ? idsUsados : new Set(idsUsados || []);
    return filtrarFaixasValidas(faixas).filter((faixa) => !usados.has(String(faixa.id)));
  }

  return {
    faixaValida,
    filtrarFaixasValidas,
    classificarNota,
    calcularMediaNotas,
    gerarAgendaIndividual,
    gerarAgendaEquipes,
    estimarDuracaoMinutos,
    formatarDuracao,
    rankingIndividual,
    rankingEquipes,
    faixasDisponiveis
  };
});
