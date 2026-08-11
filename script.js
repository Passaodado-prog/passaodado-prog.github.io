// =========================
// ELEMENTOS DA PÁGINA
// =========================
const musica = document.getElementById("musica");

const play = document.getElementById("play");
const pause = document.getElementById("pause");
const resume = document.getElementById("resume");

const progresso = document.getElementById("progresso");

const inicio = document.getElementById("inicio");
const fim = document.getElementById("fim");

const revelar = document.getElementById("revelar");
const resposta = document.getElementById("resposta");

const nome = document.getElementById("nome");
const artista = document.getElementById("artista");
const ano = document.getElementById("ano");

const carta = document.querySelector(".carta");
const capaAlbum = document.getElementById("capaAlbum");

const scannerTela = document.getElementById("scannerTela");
const botaoScanner = document.getElementById("scanner");
const fecharScanner = document.getElementById("fecharScanner");

const telaInicial = document.getElementById("telaInicial");
const jogo = document.getElementById("jogo");
const iniciarJogo = document.getElementById("iniciarJogo");

const temporizador = document.getElementById("temporizador");
const pararTempo = document.getElementById("pararTempo");

// =========================
// CONFIGURAÇÃO INICIAL
// =========================
pause.classList.add("oculto");
resume.classList.add("oculto");
revelar.classList.add("oculto");
resposta.style.display = "none";

let musicaAtual = null;
let scanner = null;

let intervaloTemporizador = null;
let tempoRestante = 15;

// =========================
// HELPER DE REPRODUÇÃO
// =========================
function tocarMusica() {
    if (!musicaAtual) return;
    
    musica.play().then(() => {
        play.classList.add("oculto");
        pause.classList.remove("oculto");
        revelar.classList.remove("oculto");
    }).catch((erro) => {
        console.warn("Autoplay bloqueado pelo navegador:", erro);
        play.classList.remove("oculto");
        pause.classList.add("oculto");
    });
}

// =========================
// TEMPORIZADOR (15s)
// =========================
temporizador.onclick = () => {
    // Se não tiver música ou já estiver contando, não faz nada
    if (!musicaAtual || intervaloTemporizador) return;

    tempoRestante = 15;
    
    // ATUALIZAÇÃO: Removido musica.currentTime = 0; 
    // Assim a música continua tocando de onde está.
    
    // Se a música estiver pausada quando apertar o tempo, ele força a tocar.
    if (musica.paused) {
        tocarMusica();
    }

    temporizador.innerHTML = "⏱ " + tempoRestante + "s";
    temporizador.disabled = true; 
    pararTempo.classList.remove("oculto");

    intervaloTemporizador = setInterval(() => {
        tempoRestante--;
        temporizador.innerHTML = "⏱ " + tempoRestante + "s";

        if (tempoRestante <= 0) {
            finalizarTemporizador();
        }
    }, 1000);
};

pararTempo.onclick = () => {
    finalizarTemporizador();
};

function finalizarTemporizador() {
    if (intervaloTemporizador) {
        clearInterval(intervaloTemporizador);
        intervaloTemporizador = null;
    }

    // ATUALIZAÇÃO: Pausa a música, mas não zera o progresso (removemos musica.currentTime = 0;)
    musica.pause();

    // Ajusta os botões do player para o estado de "Pausado"
    play.classList.add("oculto");
    pause.classList.add("oculto");
    resume.classList.remove("oculto"); // Mostra "Continuar"

    // Reseta visual dos botões de tempo
    temporizador.innerHTML = "⏱ TEMPO";
    temporizador.disabled = false;
    pararTempo.classList.add("oculto");
    tempoRestante = 15;
}

// =========================
// CARREGAR CARTA
// =========================
function carregarCarta(id) {
    finalizarTemporizador();

    if (typeof musicas === "undefined") {
        alert("Erro: O arquivo musicas.js não foi carregado corretamente!");
        return;
    }

    musicaAtual = musicas.find(
        m => m.codigo === id || m.id == id
    );

    if (!musicaAtual) {
        alert("Carta não encontrada!");
        return;
    }

    musica.pause();
    musica.currentTime = 0;

    musica.src = musicaAtual.arquivo;
    musica.load();
    musica.volume = 1;

    capaAlbum.src = "img/capa-oficial.jpg";

    nome.innerText = musicaAtual.nome;
    artista.innerText = musicaAtual.artista;
    ano.innerText = musicaAtual.ano;

    carta.innerText = "Carta #" + String(musicaAtual.id).padStart(3, "0");

    resposta.style.display = "none";

    // ATUALIZAÇÃO: Substituí os ajustes de botões pelo inicio imediato
    progresso.value = 0;
    inicio.innerText = "00:00";
    fim.innerText = "00:00";
    
    // Toca a música automaticamente assim que carregar
    tocarMusica();
}

// =========================
// CONTROLES DE ÁUDIO
// =========================
play.onclick = () => {
    tocarMusica();
};

pause.onclick = () => {
    musica.pause();
    pause.classList.add("oculto");
    resume.classList.remove("oculto");
};

resume.onclick = () => {
    tocarMusica();
    resume.classList.add("oculto");
};

revelar.onclick = () => {
    resposta.style.display = "block";
};

// =========================
// EVENTOS DO PLAYER
// =========================
musica.addEventListener("loadedmetadata", () => {
    fim.innerText = converter(musica.duration);
});

musica.addEventListener("timeupdate", () => {
    if (!musica.duration) return;
    progresso.value = (musica.currentTime / musica.duration) * 100;
    inicio.innerText = converter(musica.currentTime);
});

progresso.addEventListener("input", () => {
    if (!musica.duration) return;
    musica.currentTime = (progresso.value / 100) * musica.duration;
});

musica.onended = () => {
    if (intervaloTemporizador) {
        finalizarTemporizador();
    } else {
        pause.classList.add("oculto");
        resume.classList.add("oculto");
        play.classList.remove("oculto");
        play.innerHTML = "🔄 OUVIR NOVAMENTE";
    }
};

function converter(segundos) {
    let min = Math.floor(segundos / 60);
    let seg = Math.floor(segundos % 60);
    if (seg < 10) seg = "0" + seg;
    return min + ":" + seg;
}

// =========================
// NAVEGAÇÃO E SCANNER
// =========================
iniciarJogo.onclick = async () => {
    telaInicial.style.display = "none";
    jogo.style.display = "block";
    await abrirScanner();
};

async function abrirScanner() {
    scannerTela.style.display = "flex";

    if (!scanner) {
        scanner = new Html5Qrcode("reader");
    }

    if (scanner.isScanning) return;

    let processando = false;

    try {
        await scanner.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: 250 },
            async (textoLido) => {
                if (processando) return;
                processando = true;

                try {
                    await scanner.stop();
                } catch (e) {
                    console.warn("Aviso ao parar scanner:", e);
                }

                scannerTela.style.display = "none";

                const codigo = textoLido.trim().toUpperCase();
                carregarCarta(codigo);
            }
        );
    } catch (erro) {
        alert("Não foi possível abrir a câmera.");
        console.error(erro);
        scannerTela.style.display = "none";
    }
}

botaoScanner.onclick = abrirScanner;

fecharScanner.onclick = async () => {
    if (scanner && scanner.isScanning) {
        try {
            await scanner.stop();
        } catch (e) {
            console.error(e);
        }
    }
    scannerTela.style.display = "none";
};