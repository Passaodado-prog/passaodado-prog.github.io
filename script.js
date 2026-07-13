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
const reader = document.getElementById("reader");

// =========================
// CONFIGURAÇÃO INICIAL
// =========================

pause.classList.add("oculto");
resume.classList.add("oculto");
revelar.classList.add("oculto");
resposta.style.display = "none";

let musicaAtual = null;
let scanner = null;

// =========================
// CARREGAR CARTA
// =========================

function carregarCarta(id) {

    alert("carregarCarta recebeu: [" + id + "]");
    console.log("Recebido:", id);

console.log(musicas);

musicaAtual = musicas.find(m => m.codigo === id || m.id == id);

    if (!musicaAtual) {

        alert("Carta não encontrada!");

        return;

    }

    musica.pause();
    musica.currentTime = 0;

    musica.src = musicaAtual.arquivo;
    musica.load();

    capaAlbum.src = "img/capa-oficial.jpg";

    nome.innerText = musicaAtual.nome;
    artista.innerText = musicaAtual.artista;
    ano.innerText = musicaAtual.ano;

    carta.innerText = "Carta #" + String(musicaAtual.id).padStart(3, "0");

    resposta.style.display = "none";

    play.innerHTML = "▶ TOCAR MÚSICA";

    play.classList.remove("oculto");
    pause.classList.add("oculto");
    resume.classList.add("oculto");
    revelar.classList.add("oculto");

    progresso.value = 0;

    inicio.innerText = "00:00";
    fim.innerText = "00:00";

}

// =========================
// PLAY
// =========================

play.onclick = () => {

    if (!musicaAtual) return;

    musica.play();

    play.classList.add("oculto");
    pause.classList.remove("oculto");
    revelar.classList.remove("oculto");

};

// =========================
// PAUSE
// =========================

pause.onclick = () => {

    musica.pause();

    pause.classList.add("oculto");
    resume.classList.remove("oculto");

};

// =========================
// CONTINUAR
// =========================

resume.onclick = () => {

    musica.play();

    resume.classList.add("oculto");
    pause.classList.remove("oculto");

};

// =========================
// REVELAR
// =========================

revelar.onclick = () => {

    resposta.style.display = "block";

};

// =========================
// METADADOS
// =========================

musica.addEventListener("loadedmetadata", () => {

    fim.innerText = converter(musica.duration);

});

// =========================
// TEMPO DA MÚSICA
// =========================

musica.addEventListener("timeupdate", () => {

    if (!musica.duration) return;

    progresso.value = (musica.currentTime / musica.duration) * 100;

    inicio.innerText = converter(musica.currentTime);

});

// =========================
// MOVER BARRA
// =========================

progresso.addEventListener("input", () => {

    if (!musica.duration) return;

    musica.currentTime = (progresso.value / 100) * musica.duration;

});

// =========================
// FIM DA MÚSICA
// =========================

musica.onended = () => {

    pause.classList.add("oculto");
    resume.classList.add("oculto");

    play.classList.remove("oculto");

    play.innerHTML = "🔄 OUVIR NOVAMENTE";

};

// =========================
// CONVERTER TEMPO
// =========================

function converter(segundos) {

    let min = Math.floor(segundos / 60);

    let seg = Math.floor(segundos % 60);

    if (seg < 10) seg = "0" + seg;

    return min + ":" + seg;

}

// =========================
// CARREGAR PRIMEIRA CARTA
// =========================

const parametros = new URLSearchParams(window.location.search);

const cartaInicial = parametros.get("id") || "POP001";

carregarCarta(cartaInicial);

// =========================
// SCANNER
// =========================

botaoScanner.onclick = async () => {

    scannerTela.style.display = "flex";

    if (!scanner) {
        scanner = new Html5Qrcode("reader");
    }

    try {

        await scanner.start(

            { facingMode: "environment" },

            {
                fps: 10,
                qrbox: 250
            },

            (textoLido) => {

                console.log("QR:", textoLido);

                scanner.stop().then(() => {

                    scannerTela.style.display = "none";

                    alert("QR lido: " + textoLido);

const codigo = textoLido.trim().toUpperCase();

alert(
"QR: " +
JSON.stringify(codigo) +
"\nTamanho: " +
codigo.length
);

carregarCarta(codigo);

                });

            }

        );

    } catch (erro) {

        console.error(erro);

        alert("Erro ao abrir a câmera:\n\n" + erro);

    }

};

// =========================
// FECHAR SCANNER
// =========================

fecharScanner.onclick = async () => {

    if (scanner) {

        try {

            await scanner.stop();

        } catch (e) {}

    }

    scannerTela.style.display = "none";

};