#!/usr/bin/env node
// Exporta o array `musicas` do musicas.js para CSV de importacao no Supabase.
// Uso: node tools/exportar-catalogo.mjs "caminho/para/musicas.js" "catalogo/musicas-import.csv"
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const [sourceArg, outputArg] = process.argv.slice(2);
if (!sourceArg || !outputArg) {
  console.error('Uso: node tools/exportar-catalogo.mjs <musicas.js> <saida.csv>');
  process.exit(2);
}

const sourcePath = path.resolve(sourceArg);
const outputPath = path.resolve(outputArg);
const source = fs.readFileSync(sourcePath, 'utf8');
const musicas = vm.runInNewContext(`${source}\n;musicas`, Object.create(null), { timeout: 5000 });
if (!Array.isArray(musicas)) throw new Error('O arquivo nao declarou um array `musicas`.');

const headers = ['id', 'codigo', 'nome', 'artista', 'ano', 'audio_key', 'ativa'];
const csvCell = (value) => {
  if (value === null || value === undefined) return '';
  const s = String(value);
  return /[",\r\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
};
const rows = [headers.join(',')];
for (const m of musicas) {
  if (!Number.isInteger(m.id) || !m.codigo || !m.nome || !m.artista || !m.arquivo) {
    throw new Error(`Registro incompleto no catalogo: ${JSON.stringify(m)}`);
  }
  rows.push([m.id, m.codigo, m.nome, m.artista, m.ano, m.arquivo, true].map(csvCell).join(','));
}
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, rows.join('\n') + '\n', 'utf8');
console.log(`Exportadas ${musicas.length} musicas para ${outputPath}`);
console.log('Os caminhos de audio foram preservados exatamente como no arquivo original.');
