$ErrorActionPreference = 'Stop'

# Execute este script dentro da pasta Hitster Personal.
$projectRoot = (Get-Location).Path
$audioSource = Join-Path $projectRoot 'audio'
$videoSource = Join-Path $projectRoot 'karaoke\videos'
$mediaRoot = Join-Path (Split-Path $projectRoot -Parent) 'SOM_NA_MESA_MIDIAS_UPLOAD'
$remoteUrl = 'https://github.com/Passaodado-prog/-som-na-mesa-midias.git'
$maxBatchBytes = [long](1.2 * 1024 * 1024 * 1024)

if (-not (Test-Path -LiteralPath $audioSource -PathType Container)) {
    throw 'Pasta audio nao encontrada. Abra o terminal dentro de Hitster Personal.'
}
if (-not (Test-Path -LiteralPath $videoSource -PathType Container)) {
    throw 'Pasta karaoke\videos nao encontrada.'
}

New-Item -ItemType Directory -Force -Path $mediaRoot | Out-Null
$audioDest = Join-Path $mediaRoot 'audio'
$videoDest = Join-Path $mediaRoot 'karaoke\videos'
New-Item -ItemType Directory -Force -Path $audioDest | Out-Null
New-Item -ItemType Directory -Force -Path $videoDest | Out-Null

Write-Host ''
Write-Host 'Copiando os MP3 para uma pasta separada. Os originais nao serao apagados.' -ForegroundColor Cyan
robocopy $audioSource $audioDest /E /R:2 /W:2 /NFL /NDL /NJH /NJS
if ($LASTEXITCODE -ge 8) { throw "Falha ao copiar audio (robocopy $LASTEXITCODE)." }

Write-Host 'Copiando os videos do Karaoke.' -ForegroundColor Cyan
robocopy $videoSource $videoDest /E /R:2 /W:2 /NFL /NDL /NJH /NJS
if ($LASTEXITCODE -ge 8) { throw "Falha ao copiar videos (robocopy $LASTEXITCODE)." }

$readme = @'
# SOM NA MESA - Midias publicas

Repositorio de arquivos de audio e video utilizados pelo aplicativo SOM NA MESA.

Estrutura:
- audio/: arquivos MP3 do jogo
- karaoke/videos/: videos do modo Karaoke

O aplicativo consome estes arquivos por URLs raw do GitHub. Publique aqui somente midias que voce tem autorizacao para disponibilizar publicamente.
'@
Set-Content -LiteralPath (Join-Path $mediaRoot 'README.md') -Value $readme -Encoding UTF8

Push-Location $mediaRoot
try {
    Write-Host ''
    Write-Host 'Preparando repositorio de midias...' -ForegroundColor Cyan
    if (-not (Test-Path -LiteralPath (Join-Path $mediaRoot '.git'))) {
        git init
        if ($LASTEXITCODE -ne 0) { throw 'git init falhou.' }
    }
    git branch -M main
    if ($LASTEXITCODE -ne 0) { throw 'Nao foi possivel definir a branch main.' }

    git config user.name 'natan'
    git config user.email 'neitan693@gmail.com'

    $remoteNames = @(git remote)
    if ($remoteNames -contains 'origin') {
        $currentRemote = (git remote get-url origin).Trim()
        if ($currentRemote -ne $remoteUrl) {
            throw "O origin desta pasta aponta para outro repositorio: $currentRemote"
        }
    } else {
        git remote add origin $remoteUrl
        if ($LASTEXITCODE -ne 0) { throw 'Nao foi possivel configurar o repositorio remoto.' }
    }

    # Repositorio novo nao possui HEAD ate o primeiro commit.
    # show-ref --quiet verifica a branch sem emitir erro quando ela ainda nao existe.
    git show-ref --verify --quiet refs/heads/main
    if ($LASTEXITCODE -eq 0) {
        Write-Host 'Foi encontrado um commit local anterior. Enviando-o antes de continuar...' -ForegroundColor Yellow
        git push -u origin main
        if ($LASTEXITCODE -ne 0) { throw 'Ha um commit local pendente. Resolva o push e execute o script novamente.' }
    } elseif ($LASTEXITCODE -ne 1) {
        throw 'Nao foi possivel verificar a branch main do repositorio de midias.'
    } else {
        Write-Host 'Repositorio ainda sem commits. O primeiro lote criara o commit inicial.' -ForegroundColor Green
    }

    $allFiles = @(Get-ChildItem -LiteralPath $mediaRoot -File -Recurse | Where-Object { $_.FullName -notmatch '[\\/]\.git[\\/]' } | Sort-Object FullName)
    if ($allFiles.Count -eq 0) { throw 'Nenhum arquivo de midia foi encontrado.' }

    $tooLarge = @($allFiles | Where-Object { $_.Length -ge 100MB })
    if ($tooLarge.Count -gt 0) {
        $tooLarge | ForEach-Object { Write-Host ("Arquivo acima de 100 MB: {0} ({1:N1} MB)" -f $_.FullName, ($_.Length / 1MB)) -ForegroundColor Red }
        throw 'O GitHub bloqueia arquivos individuais acima de 100 MB no Git convencional. Nao continue.'
    }

    $totalBytes = [long](($allFiles | Measure-Object Length -Sum).Sum)
    Write-Host ("Arquivos a enviar: {0}" -f $allFiles.Count)
    Write-Host ("Tamanho total: {0:N2} GB" -f ($totalBytes / 1GB))

    $batches = New-Object System.Collections.ArrayList
    $currentBatch = New-Object System.Collections.ArrayList
    [long]$currentBytes = 0
    foreach ($file in $allFiles) {
        if ($currentBatch.Count -gt 0 -and ($currentBytes + [long]$file.Length) -gt $maxBatchBytes) {
            [void]$batches.Add(@($currentBatch.ToArray()))
            $currentBatch = New-Object System.Collections.ArrayList
            $currentBytes = 0
        }
        [void]$currentBatch.Add($file)
        $currentBytes += [long]$file.Length
    }
    if ($currentBatch.Count -gt 0) { [void]$batches.Add(@($currentBatch.ToArray())) }

    Write-Host ("O envio sera dividido em {0} lotes, cada um com no maximo aproximadamente 1,2 GB." -f $batches.Count) -ForegroundColor Green

    for ($i = 0; $i -lt $batches.Count; $i++) {
        $batch = @($batches[$i])
        $relativePaths = @($batch | ForEach-Object { $_.FullName.Substring($mediaRoot.Length + 1) })
        $batchBytes = [long](($batch | Measure-Object Length -Sum).Sum)
        Write-Host ''
        Write-Host ("Preparando lote {0}/{1}: {2:N2} GB" -f ($i + 1), $batches.Count, ($batchBytes / 1GB)) -ForegroundColor Cyan

        git add -- $relativePaths
        if ($LASTEXITCODE -ne 0) { throw "git add falhou no lote $($i + 1)." }

        git diff --cached --quiet
        if ($LASTEXITCODE -eq 0) {
            Write-Host 'Este lote ja estava registrado; pulando.' -ForegroundColor Yellow
            continue
        }

        git commit -m ("Adiciona midias lote {0} de {1}" -f ($i + 1), $batches.Count)
        if ($LASTEXITCODE -ne 0) { throw "git commit falhou no lote $($i + 1)." }

        git push -u origin main
        if ($LASTEXITCODE -ne 0) { throw "git push falhou no lote $($i + 1). Corrija a autenticacao/conexao e execute o script novamente para continuar." }
    }

    Write-Host ''
    Write-Host 'Envio de midias concluido. Confira o repositorio no GitHub antes de alterar o jogo.' -ForegroundColor Green
    git status --short
} finally {
    Pop-Location
}
