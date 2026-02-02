// Referencias a los elementos
const startBtn = document.getElementById('start-btn');
const calmZone = document.getElementById('calm-zone');
const calmImg = document.getElementById('calm-img');
const instructionText = document.getElementById('instruction-text');
const screamerZone = document.getElementById('screamer-zone');

const relaxAudio = document.getElementById('relax-audio');
const screamAudio = document.getElementById('scream-audio');

// --- CONFIGURACIÓN DE TIEMPO ---
// 10000 ms = 10 segundos.
// Tiempo suficiente para que se olviden de que es una broma.
const TIEMPO_DE_ESPERA_MS = 10000; 

startBtn.addEventListener('click', () => {
    iniciarTrampa();
});

function iniciarTrampa() {
    // 1. FASE RELAX
    relaxAudio.volume = 0.7; 
    relaxAudio.play().catch(e => console.error("Error audio relax:", e));

    // Cambiar texto para mantenerlos ocupados esos 10 segundos
    startBtn.style.display = 'none'; 
    instructionText.innerText = "Inhalando paz... Exhalando estrés...";
    calmImg.classList.add('flotando-suave'); 

    // 2. PRECARGA DEL SUSTO (Silenciosa)
    screamAudio.volume = 0;
    screamAudio.play().then(() => {
        screamAudio.pause();
        screamAudio.currentTime = 0;
    }).catch(e => console.log("Precarga lista"));


    // 3. LA CUENTA REGRESIVA
    setTimeout(() => {
        ejecutarScreamer();
    }, TIEMPO_DE_ESPERA_MS);
}

function ejecutarScreamer() {
    // a) Cortar música relax
    relaxAudio.pause();
    relaxAudio.currentTime = 0;

    // b) SOLTAR EL GRITO (Volumen Máximo)
    screamAudio.volume = 1.0;
    screamAudio.play();

    // c) Pantallazo
    calmZone.style.display = 'none'; 
    screamerZone.style.display = 'flex'; 

    // d) Vibrar (Android)
    if (navigator.vibrate) {
        navigator.vibrate([800, 100, 500, 100, 1000]);
    }
}

// Bloqueo psicológico de salida
window.onbeforeunload = (e) => {
    e.preventDefault();
    e.returnValue = '';
};