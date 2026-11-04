$ErrorActionPreference = 'Stop'

$root = (Get-Location).Path
$required = @('index.html', 'script.js', 'karaoke-mode.js', 'musicas.js', 'karaoke.js')
foreach ($file in $required) {
    if (-not (Test-Path -LiteralPath (Join-Path $root $file) -PathType Leaf)) {
        throw "Arquivo obrigatorio nao encontrado: $file. Execute este script dentro da pasta Hitster Personal."
    }
}

function Write-Utf8NoBom([string]$Path, [string]$Content) {
    $encoding = [System.Text.UTF8Encoding]::new($false)
    [System.IO.File]::WriteAllText($Path, $Content, $encoding)
}

$scriptPath = Join-Path $root 'script.js'
$karaokePath = Join-Path $root 'karaoke-mode.js'
$indexPath = Join-Path $root 'index.html'
$workflowSource = Join-Path $PSScriptRoot '.github\workflows\som-na-mesa-pages.yml'
if (-not (Test-Path -LiteralPath $workflowSource -PathType Leaf)) {
    throw "Arquivo de workflow nao encontrado ao lado do script: $workflowSource"
}

# Prepare all changes in memory first. No project file is written until every check passes.
$scriptContent = [System.IO.File]::ReadAllText($scriptPath)
$karaokeContent = [System.IO.File]::ReadAllText($karaokePath)
$indexContent = [System.IO.File]::ReadAllText($indexPath)

if ($scriptContent -notmatch 'somNaMesaMediaUrl\(musicaAtual\.arquivo\)') {
    $pattern = 'musica\.src\s*=\s*musicaAtual\.arquivo\s*;'
    $matches = [regex]::Matches($scriptContent, $pattern)
    if ($matches.Count -ne 1) {
        throw "Nao encontrei exatamente uma atribuicao musica.src = musicaAtual.arquivo em script.js. Nenhum arquivo foi alterado."
    }
    $scriptRegex = [regex]::new($pattern)
    $scriptContent = $scriptRegex.Replace($scriptContent, 'musica.src = window.somNaMesaMediaUrl(musicaAtual.arquivo);', 1)
}

if ($karaokeContent -notmatch 'somNaMesaMediaUrl\(caminhoLimpo\)') {
    $oldReturn = 'return new URL\(caminhoLimpo, document\.baseURI\)\.href;'
    $matches = [regex]::Matches($karaokeContent, $oldReturn)
    if ($matches.Count -eq 1) {
        $newReturn = 'return typeof window.somNaMesaMediaUrl === "function" ? window.somNaMesaMediaUrl(caminhoLimpo) : new URL(caminhoLimpo, document.baseURI).href;'
        $karaokeRegex = [regex]::new($oldReturn)
        $karaokeContent = $karaokeRegex.Replace($karaokeContent, $newReturn, 1)
    } elseif ($karaokeContent -match 'video\.src\s*=\s*faixa\.arquivo\s*;') {
        $videoPattern = 'video\.src\s*=\s*faixa\.arquivo\s*;'
        $videoRegex = [regex]::new($videoPattern)
        $karaokeContent = $videoRegex.Replace($karaokeContent, 'video.src = window.somNaMesaMediaUrl(faixa.arquivo);', 1)
    } else {
        throw "Nao encontrei o ponto de carregamento de midia esperado em karaoke-mode.js. Nenhum arquivo foi alterado."
    }
}

# Keep the player-facing copy consistent: this mode uses videos only.
$karaokeContent = $karaokeContent.Replace('Adicione vídeos autorizados em karaoke/videos/ ou instrumentais com letra sincronizada em karaoke/audio/, e registre-os em karaoke.js.', 'Adicione vídeos autorizados em karaoke/videos/ e registre-os em karaoke.js.')
$karaokeContent = $karaokeContent.Replace('faixa.tipo === "video" ? "VÍDEO KARAOKÊ" : "INSTRUMENTAL"', '"VÍDEO KARAOKÊ"')
$karaokeContent = $karaokeContent.Replace('faixa.tipo === "video" ? "Use o vídeo com a letra embutida. Ao terminar, encerre a apresentação para avaliar." : "Cante acompanhando as frases destacadas. Ao terminar, encerre a apresentação para avaliar."', '"Use o vídeo com a letra embutida. Ao terminar, encerre a apresentação para avaliar."')
$karaokeContent = $karaokeContent.Replace('`Carregando instrumental: ${faixa.arquivo}. Quando estiver pronto, toque em ▶.`', '`Carregando vídeo: ${faixa.arquivo}. Quando estiver pronto, toque em ▶.`')

if ($indexContent -notmatch '<script\s+src=["'']media-config\.js["'']\s*>') {
    $pattern = '<script\s+src=["'']musicas\.js["'']\s*>\s*</script>'
    $matches = [regex]::Matches($indexContent, $pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
    if ($matches.Count -ne 1) {
        throw "Nao encontrei exatamente uma inclusao de musicas.js em index.html. Nenhum arquivo foi alterado."
    }
    $replacement = '<script src="media-config.js"></script>' + [Environment]::NewLine + $matches[0].Value
    $indexRegex = [regex]::new($pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
    $indexContent = $indexRegex.Replace($indexContent, $replacement, 1)
}

$mediaConfig = @'
(function (window) {
  "use strict";
  const MEDIA_BASE_URL = "https://raw.githubusercontent.com/Passaodado-prog/-som-na-mesa-midias/main/";
  const hostname = String(window.location.hostname || "").toLowerCase();
  const privateIPv4 = /^(?:10(?:\.\d{1,3}){3}|192\.168(?:\.\d{1,3}){2}|172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2})$/.test(hostname);
  const localHost = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1" || hostname === "0.0.0.0" || hostname.endsWith(".local") || privateIPv4 || window.location.protocol === "file:";
  function somNaMesaMediaUrl(path) {
    const value = String(path == null ? "" : path).trim().replace(/\\/g, "/");
    if (!value) throw new Error("O catalogo nao informou o caminho da midia.");
    if (/^(?:https?:|blob:|data:)/i.test(value)) return value;
    const relativePath = value.replace(/^\/+/, "");
    if (localHost) return new URL(relativePath, document.baseURI).href;
    return new URL(relativePath, MEDIA_BASE_URL).href;
  }
  window.somNaMesaMediaUrl = somNaMesaMediaUrl;
  window.SOM_NA_MESA_MEDIA_BASE_URL = MEDIA_BASE_URL;
})(window);
'@

$workflowDir = Join-Path $root '.github\workflows'
$workflowPath = Join-Path $workflowDir 'som-na-mesa-pages.yml'

# Back up existing files outside the project, then write the validated changes.
$parent = Split-Path -Parent $root
$backup = Join-Path $parent ("SOM_NA_MESA_BACKUP_PUBLICACAO_" + (Get-Date -Format 'yyyyMMdd_HHmmss'))
New-Item -ItemType Directory -Force -Path $backup | Out-Null
foreach ($file in @('index.html', 'script.js', 'karaoke-mode.js', 'media-config.js')) {
    $source = Join-Path $root $file
    if (Test-Path -LiteralPath $source -PathType Leaf) {
        Copy-Item -LiteralPath $source -Destination (Join-Path $backup $file) -Force
    }
}
if (Test-Path -LiteralPath $workflowPath -PathType Leaf) {
   if ([System.IO.Path]::GetFullPath($workflowSource) -ine [System.IO.Path]::GetFullPath($workflowPath)) {
    if ([System.IO.Path]::GetFullPath($workflowSource) -ine [System.IO.Path]::GetFullPath($workflowPath)) {
    Copy-Item -LiteralPath $workflowSource -Destination $workflowPath -Force
}
}
}

New-Item -ItemType Directory -Force -Path $workflowDir | Out-Null
Write-Utf8NoBom $scriptPath $scriptContent
Write-Utf8NoBom $karaokePath $karaokeContent
Write-Utf8NoBom $indexPath $indexContent
Write-Utf8NoBom (Join-Path $root 'media-config.js') $mediaConfig
if ([System.IO.Path]::GetFullPath($workflowSource) -ine [System.IO.Path]::GetFullPath($workflowPath)) {
    Copy-Item -LiteralPath $workflowSource -Destination $workflowPath -Force
}

Write-Host ''
Write-Host 'Preparacao concluida.' -ForegroundColor Green
Write-Host "Backup criado em: $backup"
Write-Host 'Arquivos alterados: index.html, script.js, karaoke-mode.js, media-config.js e .github/workflows/som-na-mesa-pages.yml'
Write-Host 'Nenhum MP3, video, catalogo ou arquivo administrativo foi apagado.'
Write-Host 'Agora confira git diff antes de fazer commit.' -ForegroundColor Cyan

