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
const telaInicial = document.getElementById("telaInicial");
const jogo = document.getElementById("jogo");
const iniciarJogo = document.getElementById("iniciarJogo");
console.log(iniciarJogo);

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

    
    



musicaAtual = musicas.find(m => m.codigo === id || m.id == id);

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

iniciarJogo.onclick = async () => {

    telaInicial.style.display = "none";

    jogo.style.display = "block";

    await abrirScanner();

};

// =========================
// SCANNER
// =========================

async function abrirScanner() {

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


                scanner.stop().then(() => {

                    scannerTela.style.display = "none";

                    

const codigo = textoLido.trim().toUpperCase();



carregarCarta(codigo);



play.click();

                });

            }

        );

    } catch (erro) {

    alert("Não foi possível abrir a câmera.");



        

    }

};

botaoScanner.onclick = abrirScanner;

// =========================
// FECHAR SCANNER
// =========================

fecharScanner.onclick = async () => {

    if (scanner) {

        try {

            await scanner.stop();
            await scanner.clear();
scanner = null;

        } catch (e) {}

    }

    scannerTela.style.display = "none";

};