// Referencias a los elementos
const startBtn = document.getElementById('start-btn');
const calmZone = document.getElementById('calm-zone');
const calmImg = document.getElementById('calm-img');
const instructionText = document.getElementById('instruction-text');
const screamerZone = document.getElementById('screamer-zone');

const relaxAudio = document.getElementById('relax-audio');
const screamAudio = document.getElementById('scream-audio');

// --- CONFIGURACIÓN ---
const TIEMPO_DE_ESPERA_MS = 4000; // 4 segundos de música relax antes del susto.

// El evento principal: Cuando la víctima hace click
startBtn.addEventListener('click', () => {
    iniciarTrampa();
});

function iniciarTrampa() {
    // 1. FASE DE CEBO (Música relax)
    // Necesitamos el click del usuario para poder reproducir audio.
    relaxAudio.volume = 0.7; // Volumen agradable
    relaxAudio.play().catch(e => console.error("Error al reproducir relax:", e));

    // Actualizamos la interfaz para que parezca que "empezó" la relajación
    startBtn.style.display = 'none'; // Ocultamos botón
    instructionText.innerText = "Cierra los ojos y respira profundo...";
    calmImg.classList.add('flotando-suave'); // El michi empieza a flotar

    // 2. PREPARAR EL AUDIO DEL SUSTO (Truco para que cargue rápido)
    // Le bajamos el volumen a 0, le damos play y pausa instantáneo.
    // Esto fuerza al navegador a cargar el archivo en memoria.
    screamAudio.volume = 0;
    screamAudio.play().then(() => {
        screamAudio.pause();
        screamAudio.currentTime = 0;
    }).catch(e => console.log("Precarga de susto (normal en primer click)"));


    // 3. INICIAR LA CUENTA REGRESIVA
    setTimeout(() => {
        ejecutarScreamer();
    }, TIEMPO_DE_ESPERA_MS);
}

function ejecutarScreamer() {
    // a) Detener música relax de golpe
    relaxAudio.pause();
    relaxAudio.currentTime = 0;

    // b) Lanzar el audio del grito AL MÁXIMO VOLUMEN
    screamAudio.volume = 1.0;
    screamAudio.play();

    // c) Cambio visual instantáneo
    calmZone.style.display = 'none'; // Desaparece lo bonito
    screamerZone.style.display = 'flex'; // Aparece el horror

    // d) Vibración (Solo funciona en celulares Android)
    // Patrón: Vibra 800ms, para 100ms, vibra 500ms...
    if (navigator.vibrate) {
        navigator.vibrate([800, 100, 500, 100, 1000]);
    }
}

// Truco extra: Intenta preguntar si quieren salir si intentan cerrar la pestaña
window.onbeforeunload = (e) => {
    // Esto ya no muestra un mensaje personalizado en navegadores modernos,
    // pero sí detiene el cierre inmediato, aumentando el pánico.
    e.preventDefault();
    e.returnValue = '';
};