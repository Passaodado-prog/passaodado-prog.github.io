#!/usr/bin/env node
// Valida os caminhos referenciados por musicas.js contra a pasta local de audio.
// Uso: node tools/validar-audios.mjs "caminho/para/Hitster Personal"
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const projectDirArg = process.argv[2];
if (!projectDirArg) {
  console.error('Uso: node tools/validar-audios.mjs <pasta-do-projeto-que-contem-musicas.js>');
  process.exit(2);
}
const projectDir = path.resolve(projectDirArg);
const sourcePath = path.join(projectDir, 'musicas.js');
if (!fs.existsSync(sourcePath)) throw new Error(`Nao encontrei ${sourcePath}`);
const source = fs.readFileSync(sourcePath, 'utf8');
const musicas = vm.runInNewContext(`${source}\n;musicas`, Object.create(null), { timeout: 5000 });
if (!Array.isArray(musicas)) throw new Error('O arquivo nao declarou um array `musicas`.');

const byAudio = new Map();
const missing = [];
for (const m of musicas) {
  const key = String(m.arquivo || '');
  if (!byAudio.has(key)) byAudio.set(key, []);
  byAudio.get(key).push(m.codigo);
  const localPath = path.join(projectDir, key.replaceAll('/', path.sep));
  if (!key || !fs.existsSync(localPath)) missing.push({ codigo: m.codigo, nome: m.nome, arquivo: key });
}
const duplicatedPaths = [...byAudio.entries()].filter(([, codes]) => codes.length > 1);
const nullYears = musicas.filter(m => m.ano === null || m.ano === undefined).map(m => `${m.codigo} - ${m.nome}`);
console.log(`Total de registros: ${musicas.length}`);
console.log(`Caminhos de audio unicos: ${byAudio.size}`);
console.log(`Caminhos repetidos: ${duplicatedPaths.length}`);
for (const [file, codes] of duplicatedPaths) console.log(`  REPETIDO ${file}: cartas ${codes.join(', ')}`);
console.log(`Referencias a arquivos inexistentes: ${missing.length}`);
for (const m of missing) console.log(`  AUSENTE carta ${m.codigo} - ${m.nome}: ${m.arquivo}`);
console.log(`Musicas sem ano: ${nullYears.length}`);
for (const item of nullYears) console.log(`  SEM ANO ${item}`);
const beep = path.join(projectDir, 'audio', 'beep.mp3');
console.log(`Arquivo de beep ${fs.existsSync(beep) ? 'encontrado' : 'nao encontrado'}: audio/beep.mp3`);
if (missing.length > 0 || duplicatedPaths.length > 0) process.exitCode = 1;
