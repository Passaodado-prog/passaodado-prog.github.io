const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

class FakeElement {
  constructor(id='') { this.id=id; this.children=[]; this.listeners={}; this._innerHTML=''; this.textContent=''; this.value=''; this.files=[]; this.hidden=false; this.disabled=false; this.required=false; this.className=''; this.style={}; this.attributes={}; this.src=''; this.duration=123; this.paused=true; }
  addEventListener(type, fn) { (this.listeners[type] ||= []).push(fn); }
  dispatch(type, event={}) { for (const fn of (this.listeners[type]||[])) fn({ preventDefault(){}, ...event }); }
  append(...items) { for (const item of items) this.appendChild(item); }
  appendChild(item) { this.children.push(item); item.parentNode=this; return item; }
  remove() { if (this.parentNode) this.parentNode.children=this.parentNode.children.filter(x=>x!==this); }
  focus() {}
  pause() { this.paused=true; }
  load() {}
  click() { this.dispatch('click'); }
  removeAttribute(name) { if(name==='src') this.src=''; }
  set innerHTML(v) { this._innerHTML=v; if(v==='') this.children=[]; }
  get innerHTML() { return this._innerHTML; }
  querySelectorAll(selector) { const out=[]; const walk=n=>{ for(const c of n.children||[]){ if(selector==='button' && c.tagName==='button') out.push(c); walk(c); } }; walk(this); return out; }
}
const ids = [
 'formKaraokeVideo','karaokeVideoTitulo','karaokeVideoArtista','karaokeVideoAno','karaokeVideoArquivo','karaokeVideoPreviewWrap','karaokeVideoPreview','karaokeVideoDuracao','karaokeVideoArquivoInfo','karaokeVideoPreparar','karaokeVideoBaixar','karaokeVideoCancelarPreparacao','karaokeVideoCancelarEdicao','karaokeVideoStatus','karaokeVideoBusca','karaokeVideoLista','karaokeAdminTotal','karaokeVideoExportar','karaokeVideoExportStatus','karaokeAdminConflict','karaokeAdminConflictText','karaokeAdminBackupConflict','karaokeAdminDiscardConflict'
];
const elements = Object.fromEntries(ids.map(id=>[id,new FakeElement(id)]));
const storage = new Map();
let objectUrlCount=0;
const document = {
  getElementById(id){ return elements[id] || null; },
  createElement(tag){ const el=new FakeElement(); el.tagName=tag; return el; },
  body:new FakeElement('body')
};
const url = { createObjectURL(){ return `blob:mock-${++objectUrlCount}`; }, revokeObjectURL(){} };
const original = [
 {id:'karaoke-audio-001', titulo:'Instrumental existente', artista:'Artista A', tipo:'audio', arquivo:'karaoke/audio/a.mp3', duracaoSegundos:120, letra:[{texto:'linha',inicio:0,fim:3}]},
 {id:'karaoke-video-004', titulo:'Vídeo antigo', artista:'Cantor antigo', ano:1998, tipo:'video', arquivo:'karaoke/videos/karaoke-video-004.mp4', duracaoSegundos:180, letra:[]}
];
const context = {
 document, window:{confirm:()=>true,setTimeout:()=>0}, URL:url,
 localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},
 catalogoKaraoke:original, console, Blob,
};
vm.runInNewContext(fs.readFileSync(__dirname+'/admin-karaoke.js','utf8'), context);

assert(elements.karaokeAdminTotal.textContent.includes('1 vídeo'));
assert(elements.karaokeVideoLista.children.length===2, 'should list both video and existing audio');

// Edit video metadata, preserving file and audio catalog.
const videoRow = elements.karaokeVideoLista.children.find(row=>row.children.some(ch=>ch.className==='karaoke-video-row-main' && ch.children[0].textContent==='Vídeo antigo'));
assert(videoRow, 'video row should exist');
const editButton = videoRow.children.find(ch=>ch.className==='karaoke-video-row-actions').children[0];
editButton.click();
assert(elements.karaokeVideoTitulo.value==='Vídeo antigo');
elements.karaokeVideoTitulo.value='Vídeo revisado';
elements.karaokeVideoAno.value='2001';
elements.formKaraokeVideo.dispatch('submit');
let saved = JSON.parse(storage.get('som-na-mesa-admin-karaoke-draft-v1'));
assert(saved.catalogo.find(x=>x.id==='karaoke-video-004').titulo==='Vídeo revisado');
assert(saved.catalogo.find(x=>x.id==='karaoke-video-004').ano===2001);
assert(saved.catalogo.find(x=>x.id==='karaoke-audio-001'), 'existing audio must be preserved');

// Remove a video: only metadata should be removed, not the audio entry.
const refreshedVideoRow = elements.karaokeVideoLista.children.find(row=>row.children.some(ch=>ch.className==='karaoke-video-row-main' && ch.children[0].textContent==='Vídeo revisado'));
const removeButton = refreshedVideoRow.children.find(ch=>ch.className==='karaoke-video-row-actions').children[1];
removeButton.click();
saved = JSON.parse(storage.get('som-na-mesa-admin-karaoke-draft-v1'));
assert(!saved.catalogo.some(x=>x.id==='karaoke-video-004'));
assert(saved.catalogo.some(x=>x.id==='karaoke-audio-001'));

// Stage and complete a new video registration.
const file = {name:'clip.mp4',size:123456,type:'video/mp4'};
elements.karaokeVideoArquivo.files=[file];
elements.karaokeVideoArquivo.dispatch('change');
elements.karaokeVideoPreview.duration=123;
elements.karaokeVideoPreview.onloadedmetadata();
elements.karaokeVideoTitulo.value='Nova música';
elements.karaokeVideoArtista.value='Novo cantor';
elements.karaokeVideoAno.value='2024';
elements.formKaraokeVideo.dispatch('submit');
assert(!elements.karaokeVideoBaixar.disabled, 'download button should enable after prepare');
elements.karaokeVideoBaixar.click();
saved = JSON.parse(storage.get('som-na-mesa-admin-karaoke-draft-v1'));
const added = saved.catalogo.find(x=>x.titulo==='Nova música');
assert(added, 'new video should be registered after download click');
assert(added.id==='karaoke-video-005', 'sequence should not reuse removed ID');
assert(added.arquivo==='karaoke/videos/karaoke-video-005.mp4');
assert(added.artista==='Novo cantor' && added.ano===2024 && added.duracaoSegundos===123);
assert(elements.karaokeVideoTitulo.disabled===false && elements.karaokeVideoArtista.disabled===false, 'fields must re-enable after adding');

// Export button should generate a download and record its fingerprint.
elements.karaokeVideoExportar.click();
saved = JSON.parse(storage.get('som-na-mesa-admin-karaoke-draft-v1'));
assert(saved.exportFingerprint, 'export should record fingerprint');
assert(saved.catalogo.some(x=>x.id==='karaoke-audio-001'), 'export draft preserves audio entries');
console.log('PASS: 12 admin karaoke workflow assertions');
