const dataInicio = new Date("2024-06-10T00:00:00");
const contador = document.getElementById("contador");

function mostrarMensagem(texto) {
    const mensagem = document.getElementById("mensagem-aniversario");
    mensagem.textContent = texto;
    mensagem.style.display = "block";

    setTimeout(() => {
        mensagem.style.display = "none";
    }, 8000);
}

function efeitoBrilho() {
    const brilho = document.getElementById("efeito-brilho");
    brilho.style.display = "block";
    setTimeout(() => {
        brilho.style.display = "none";
    }, 8000);
}

function coracoesSubindo() {
    const container = document.getElementById("efeito-coracoes");
    container.innerHTML = "";

    for (let i = 0; i < 30; i++) {
        const coracao = document.createElement("div");
        coracao.className = "coracao";
        coracao.style.left = Math.random() * 100 + "vw";
        coracao.style.animationDuration = (3 + Math.random() * 2) + "s";
        coracao.textContent = "❤️";
        container.appendChild(coracao);
    }

    container.style.display = "block";
    setTimeout(() => {
        container.style.display = "none";
    }, 8000);
}

function atualizarContador() {
    const agora = new Date();
    let diff = agora - dataInicio;

    const segundosTotais = Math.floor(diff / 1000);
    const minutosTotais = Math.floor(segundosTotais / 60);
    const horasTotais = Math.floor(minutosTotais / 60);
    const diasTotais = Math.floor(horasTotais / 24);
    const semanas = Math.floor(diasTotais / 7);

    let anos = agora.getFullYear() - dataInicio.getFullYear();
    let meses = agora.getMonth() - dataInicio.getMonth();
    if (meses < 0) {
        anos--;
        meses += 12;
    }

    const dias = diasTotais % 30;
    const horas = horasTotais % 24;
    const minutos = minutosTotais % 60;
    const segundos = segundosTotais % 60;

    contador.innerHTML = `
        <strong>${anos}</strong> anos, 
        <strong>${meses}</strong> meses, 
        <strong>${semanas}</strong> semanas, 
        <strong>${dias}</strong> dias, 
        <strong>${horas}</strong> horas, 
        <strong>${minutos}</strong> minutos, 
        <strong>${segundos}</strong> segundos
    `;

    const hoje = new Date();
    const mesmaData = hoje.getDate() === dataInicio.getDate();

    if (mesmaData) {
        if (meses > 0 || anos > 0) {
            mostrarMensagem(`💚 Feliz ${anos * 12 + meses} meses de amor!`);
            efeitoBrilho();
        }

        if (hoje.getMonth() === dataInicio.getMonth() && anos > 0) {
            mostrarMensagem(`🧡 Feliz ${anos} ano(s) de amor!`);
            coracoesSubindo();
        }
    }
}

setInterval(atualizarContador, 1000);
atualizarContador();

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    preloader.style.opacity = "0";
    setTimeout(() => preloader.style.display = "none", 500);
});

// Fade-in ao scrollar
const elements = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold: 0.1
});
elements.forEach(el => observer.observe(el));

// Música de fundo
const musica = new Audio("style/audio/d4vd - Feel It.mp3"); // troque o nome do arquivo aqui
musica.loop = true;
musica.volume = 0.2;

const muteButton = document.getElementById("muteButton");
let tocando = false;

muteButton.addEventListener("click", () => {
    if (!tocando) {
        musica.play();
        tocando = true;
        muteButton.textContent = "🔊";
    } else {
        musica.pause();
        tocando = false;
        muteButton.textContent = "🔈";
    }
});
