const assert = require('node:assert/strict');
let checkCount = 0;
for (const method of ['equal', 'notEqual', 'deepEqual']) { const original = assert[method].bind(assert); assert[method] = (...args) => { checkCount += 1; return original(...args); }; }
const core = require('./karaoke-core.js');

function track(id, arquivo = `karaoke/videos/${id}.mp4`, tipo = 'video', letra = []) {
  return { id, titulo: `Faixa ${id}`, artista: 'Artista', tipo, arquivo, duracaoSegundos: 180, letra };
}

// Faixas válidas, caminhos locais, mídia repetida e áudio sem letra sincronizada.
const faixas = core.filtrarFaixasValidas([
  track('v1'), track('v2'), track('v3'), track('dup-path', 'karaoke/videos/v1.mp4'),
  track('remote', 'https://example.com/song.mp4'),
  track('audio-no-lyrics', 'karaoke/audio/a.mp3', 'audio', []),
  track('audio-ok', 'karaoke/audio/b.mp3', 'audio', [{ texto: 'Linha', inicio: 0, fim: 2 }])
]);
assert.equal(faixas.length, 4, 'filtra caminho externo, áudio sem letra e arquivo repetido');
assert.equal(new Set(faixas.map(x => x.arquivo)).size, faixas.length, 'não duplica o mesmo arquivo');

const classes = [[0,'Foi ok'],[20,'Foi ok'],[30,'Foi ok'],[31,'Foi bom'],[50,'Foi bom'],[51,'Muito bom'],[70,'Muito bom'],[71,'Incrível'],[90,'Incrível'],[91,'Espetacular'],[100,'Espetacular']];
for (const [nota, nome] of classes) assert.equal(core.classificarNota(nota).nome, nome, `classificação da nota ${nota}`);
assert.equal(core.calcularMediaNotas([82,74,90]), 82, 'média de três jurados arredondada');
assert.equal(core.calcularMediaNotas([80,81]), 81, 'média com dois jurados arredondada');
assert.equal(core.calcularMediaNotas([0]), 0, 'nota zero válida');
assert.equal(core.calcularMediaNotas([101]), null, 'nota fora do limite rejeitada');

const individual = [{id:'p1',nome:'Ana'},{id:'p2',nome:'Bia'},{id:'p3',nome:'Caio'},{id:'p4',nome:'Duda'}];
const agendaIndividual = core.gerarAgendaIndividual(individual, 5);
assert.equal(agendaIndividual.length, 20, '4 participantes x 5 músicas');
for (const p of individual) assert.equal(agendaIndividual.filter(x => x.participanteId === p.id).length, 5, `${p.nome} recebe 5 apresentações`);
for (let i=1;i<agendaIndividual.length;i++) assert.notEqual(agendaIndividual[i].participanteId, agendaIndividual[i-1].participanteId, 'não repete cantor em sequência quando há alternativas');

const equipes = [
 {id:'e1',nome:'Equipe 1',participantes:[{id:'a',nome:'Ana'},{id:'b',nome:'Bia'},{id:'c',nome:'Caio'}]},
 {id:'e2',nome:'Equipe 2',participantes:[{id:'d',nome:'Duda'}]},
 {id:'e3',nome:'Equipe 3',participantes:[{id:'e',nome:'Eva'},{id:'f',nome:'Fábio'}]}
];
const agendaEquipes = core.gerarAgendaEquipes(equipes, 5);
assert.equal(agendaEquipes.length, 30, '6 participantes x 5 músicas');
for (const e of equipes) for (const p of e.participantes) assert.equal(agendaEquipes.filter(x => x.participanteId === p.id).length, 5, `${p.nome} recebe 5 apresentações`);
for (let i=1;i<agendaEquipes.length;i++) {
  const anterior = agendaEquipes[i-1], atual = agendaEquipes[i];
  const existeOutraEquipeDisponivel = equipes.some(e => e.id !== anterior.equipeId && agendaEquipes.slice(i).some(x => x.equipeId === e.id));
  if (existeOutraEquipeDisponivel) assert.notEqual(atual.equipeId, anterior.equipeId, 'alterna equipes enquanto houver outra equipe com cantores pendentes');
}

const usadas = new Set(['v1']);
assert.deepEqual(core.faixasDisponiveis(faixas, usadas).map(x => x.id).includes('v1'), false, 'não repete música usada');
assert.equal(core.estimarDuracaoMinutos(20, faixas), 75, '20 apresentações x (180s + 45s) = 75 min');
assert.equal(core.formatarDuracao(59), '59 minutos');
assert.equal(core.formatarDuracao(60), '1 hora');
assert.equal(core.formatarDuracao(125), '2 h 5 min');

const resultados = [
 {participanteId:'a',participanteNome:'Ana',equipeId:'e1',equipeNome:'Equipe 1',notaFinal:90},
 {participanteId:'b',participanteNome:'Bia',equipeId:'e1',equipeNome:'Equipe 1',notaFinal:70},
 {participanteId:'d',participanteNome:'Duda',equipeId:'e2',equipeNome:'Equipe 2',notaFinal:85}
];
const rankingEquipe = core.rankingEquipes(resultados, equipes);
assert.equal(rankingEquipe[0].id, 'e2', 'ranking por média evita vantagem automática da equipe maior');
assert.equal(rankingEquipe.find(x=>x.id==='e1').total, 160, 'total acumulado também é preservado');
const rankingInd = core.rankingIndividual(resultados, individual);
assert.equal(rankingInd[0].nome, 'Ana', 'ranking individual por pontos acumulados');
const rankingMetaIndividual = core.rankingIndividual(resultados, [{id:'a',nome:'Ana'}], 1, 80);
assert.equal(rankingMetaIndividual.find(x => x.id === 'a').meta, 80, 'meta individual = meta por apresentação x músicas');
assert.equal(rankingMetaIndividual.find(x => x.id === 'a').metaAtingida, true, 'marca meta individual alcançada');
const rankingMetaEquipe = core.rankingEquipes(resultados, equipes, 1, 70);
assert.equal(rankingMetaEquipe.find(x => x.id === 'e1').meta, 210, 'meta de equipe proporcional a três integrantes');
assert.equal(rankingMetaEquipe.find(x => x.id === 'e2').metaAtingida, true, 'marca meta da equipe menor alcançada');


// Stress test: different numbers of teams and participants per team.
for (const teamCount of [2, 3, 5, 8, 10, 12]) {
  const manyTeams = Array.from({ length: teamCount }, (_, teamIndex) => ({
    id: `stress-team-${teamIndex}`,
    nome: `Equipe ${teamIndex + 1}`,
    participantes: Array.from({ length: 1 + (teamIndex % 6) }, (_, memberIndex) => ({
      id: `stress-${teamIndex}-${memberIndex}`,
      nome: `Pessoa ${teamIndex + 1}-${memberIndex + 1}`
    }))
  }));
  const songsEach = 5;
  const schedule = core.gerarAgendaEquipes(manyTeams, songsEach);
  const totalPlayers = manyTeams.reduce((sum, team) => sum + team.participantes.length, 0);
  assert.equal(schedule.length, totalPlayers * songsEach, `agenda completa com ${teamCount} equipes`);
  for (const team of manyTeams) for (const person of team.participantes) {
    assert.equal(schedule.filter(turn => turn.participanteId === person.id).length, songsEach, `${person.nome} recebe exatamente ${songsEach} apresentações`);
  }
  for (let i = 1; i < schedule.length; i++) {
    if (schedule[i].equipeId === schedule[i - 1].equipeId) {
      const outraEquipeAindaTemVez = schedule.slice(i).some(turn => turn.equipeId !== schedule[i].equipeId);
      assert.equal(outraEquipeAindaTemVez, false, `não repete equipe em sequência quando outra ainda tem vez (${teamCount} equipes)`);
    }
  }
}

for (const peopleCount of [1, 2, 4, 10, 20]) {
  const people = Array.from({ length: peopleCount }, (_, i) => ({ id: `stress-person-${i}`, nome: `Pessoa ${i + 1}` }));
  const schedule = core.gerarAgendaIndividual(people, 5);
  assert.equal(schedule.length, peopleCount * 5, `agenda individual completa com ${peopleCount} participantes`);
  for (const person of people) assert.equal(schedule.filter(turn => turn.participanteId === person.id).length, 5, `${person.nome} recebe cinco apresentações`);
}

console.log(`PASSOU: ${checkCount} verificações do núcleo do Karaokê.`);
