// ==========================================
// CONTROL DEL REPRODUCTOR Y AUTENTICACIÓN
// ==========================================

const VIDEO_ID_DOMINGO = "KAAzvgvVBiI"; // 🚀 CAMBIÁ ESTE ID CADA DOMINGO
let ytpPlayer = null; 
let idVideoGlobal = VIDEO_ID_DOMINGO;

// DESPLAZAMIENTO SUAVE ENTRE SECCIONES
function irASeccion(idSeccion) {
    const elemento = document.getElementById(idSeccion);
    if (elemento) {
        const offset = 130; 
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = elemento.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// ACTIVAR PANTALLA Y CONTROLES DEL VIDEO
function aplicarAcceso(videoID) {
    if (localStorage.getItem('acceso_superdep') === 'true') {
        if (videoID && videoID.length === 11) {
            idVideoGlobal = videoID;
        } else {
            idVideoGlobal = VIDEO_ID_DOMINGO;
        }

        const placeholder = document.getElementById('video-placeholder');
        const form = document.getElementById('formulario-login');
        const exito = document.getElementById('acceso-exitoso');
        const escudo = document.getElementById('escudo-anti-clic');
        const controles = document.getElementById('controles-propios');

        if (escudo) escudo.classList.remove('hidden');
        if (controles) controles.classList.remove('hidden');
        if (placeholder) placeholder.classList.add('hidden');
        if (form) form.classList.add('hidden');
        if (exito) exito.classList.remove('hidden');

        if (typeof YT !== 'undefined' && YT.Player && !ytpPlayer) {
            onYouTubeIframeAPIReady();
        }
        
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
}

// API NATIVA DE YOUTUBE (BLINDADA CON FIX IPHONE)
function onYouTubeIframeAPIReady() {
    if (localStorage.getItem('acceso_superdep') === 'true' && document.getElementById('player-api') && !ytpPlayer) {
        const esIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

        ytpPlayer = new YT.Player('player-api', {
            height: '100%',
            width: '100%',
            videoId: idVideoGlobal,
            playerVars: {
                'autoplay': 1,
                'controls': 0,
                'modestbranding': 1,
                'rel': 0,
                'showinfo': 0,
                'iv_load_policy': 3,
                'disablekb': 1,
                'playsinline': esIOS ? 0 : 1 
            },
            events: {
                'onReady': (event) => {
                    event.target.playVideo();
                }
            }
        });
    }
}

// CONTROLES DE REPRODUCTOR (Play, Pausa, Ampliar iOS/Android)
function controlarReproductor(accion) {
    if (!ytpPlayer || typeof ytpPlayer.playVideo !== 'function') return;
    
    if (accion === 'play') {
        ytpPlayer.playVideo();
    } else if (accion === 'pause') {
        ytpPlayer.pauseVideo();
    } else if (accion === 'fullscreen') {
        const cajaVideo = document.getElementById('contenedor-reproductor');
        const esIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (esIOS) {
            const videoElement = document.querySelector('#player-api iframe');
            if (videoElement && videoElement.webkitEnterFullscreen) {
                videoElement.webkitEnterFullscreen();
            } else {
                ytpPlayer.playVideo();
            }
        } else {
            if (cajaVideo) {
                if (cajaVideo.requestFullscreen) cajaVideo.requestFullscreen();
                else if (cajaVideo.webkitRequestFullscreen) cajaVideo.webkitRequestFullscreen();
                else if (cajaVideo.msRequestFullscreen) cajaVideo.msRequestFullscreen();
            }
        }
    } else if (accion === 'cast') {
        alert("📺 PARA VER EN TU TELEVISOR:\n\n1. Desliza la barra de notificaciones de tu celular.\n2. Toca 'Emitir', 'Transmitir' o 'Smart View'.\n3. Selecciona tu tele para transmitir.");
    }
}

// VALIDACIÓN DE CÓDIGO CON BACKEND (SUPABASE)
async function intentarAccesoConBaseDatos() {
    const input = document.getElementById('clave-input');
    const btn = document.getElementById('btn-validar');
    const txtError = document.getElementById('error-mensaje');
    
    if (!input || !input.value.trim()) return;
    
    const codigoIngresado = input.value.trim().toUpperCase();

    btn.disabled = true;
    btn.innerText = "VERIFICANDO...";
    txtError.classList.add('hidden');

    try {
        const response = await fetch('/api/validar-clave', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ codigo: codigoIngresado })
        });

        const resultado = await response.json();

        if (!response.ok || !resultado.valido) {
            txtError.innerText = resultado.mensaje || resultado.error || "Código inválido.";
            txtError.classList.remove('hidden');
            btn.disabled = false;
            btn.innerText = "DESBLOQUEAR PARTIDO";
            return;
        }

        localStorage.setItem('acceso_superdep', 'true');
        
        const ahora = new Date();
        const diasHastaMiercoles = (10 - ahora.getDay()) % 7 || 7;
        ahora.setDate(ahora.getDate() + diasHastaMiercoles);
        ahora.setHours(0, 0, 0, 0);
        localStorage.setItem('acceso_vencimiento', ahora.getTime().toString());

        aplicarAcceso(VIDEO_ID_DOMINGO);

    } catch (err) {
        txtError.innerText = "ERROR DE CONEXIÓN. INTENTÁ DE NUEVO.";
        txtError.classList.remove('hidden');
        btn.disabled = false;
        btn.innerText = "DESBLOQUEAR PARTIDO";
    }
}

// DETECTOR AUTOMÁTICO DE MERCADO PAGO Y VENCIMIENTOS
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('pago') === 'exitoso') {
        localStorage.setItem('acceso_superdep', 'true');
        window.history.replaceState({}, document.title, window.location.pathname);
        aplicarAcceso(VIDEO_ID_DOMINGO);
    }

    const ahora = new Date().getTime();
    const tieneAcceso = localStorage.getItem('acceso_superdep') === 'true';
    const vencimiento = localStorage.getItem('acceso_vencimiento');

    if (tieneAcceso && vencimiento && ahora > parseInt(vencimiento)) {
        localStorage.removeItem('acceso_superdep');
        localStorage.removeItem('acceso_vencimiento');
        location.reload();
        return;
    }

    if (localStorage.getItem('acceso_superdep') === 'true') {
        aplicarAcceso(VIDEO_ID_DOMINGO); 
    }
});

// SEGURIDAD DE TECLADO Y CLIC DERECHO
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) || (e.ctrlKey && (e.key === 'u' || e.key === 'U'))) {
        e.preventDefault();
    }
});