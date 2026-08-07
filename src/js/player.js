// ==========================================
// CONFIGURACIÓN DE LA TRANSMISIÓN
// ==========================================
const CONFIG_TRANSMISION = {
    // "EN_VIVO" | "REPETICION" | "PROXIMAMENTE"
    estado: "EN_VIVO", 
    posterUrl: "/img/portadas/estadio_cuac.jfif",
    // ID de YouTube para la repetición
    youtubeId: "J75ydWUSOmg", 

    // Placa informativa cuando no hay partido
    proximoPartido: {
        titulo: "FECHA 1 - CLAUSURA 2026",
        equipoLocal: "Cerrito",
        equipoVisitante: "María Grande",
        fechaHora: "Domingo 15:30 HS"
    }
};

// ==========================================
// VERIFICAR ACCESO GUARDADO
// ==========================================
function tieneAccesoValido() {
    const acceso = localStorage.getItem('usuario_acceso_valido') === 'true';
    const vencimiento = localStorage.getItem('acceso_vencimiento');

    if (acceso && vencimiento) {
        const ahora = new Date().getTime();
        if (ahora > parseInt(vencimiento, 10)) {
            localStorage.removeItem('usuario_acceso_valido');
            localStorage.removeItem('acceso_vencimiento');
            return false;
        }
        return true;
    }
    return false;
}

// ==========================================
// INICIALIZACIÓN PRINCIPAL (CUANDO CARGA EL DOM)
// ==========================================
function inicializarPantalla() {
    const wrapper = document.getElementById('wrapper-video-dinamico');
    if (!wrapper) return;

    if (CONFIG_TRANSMISION.estado === "EN_VIVO") {
        if (tieneAccesoValido()) {
            console.log("Acceso detectado en localStorage. Cargando stream...");
            
            // Ocultamos formulario de login si existe
            const formLogin = document.getElementById('formulario-login');
            const accesoExitoso = document.getElementById('acceso-exitoso');
            if (formLogin) formLogin.classList.add('hidden');
            if (accesoExitoso) accesoExitoso.classList.remove('hidden');

            cargarVideoDesbloqueado();
        } else {
            console.log("Usuario sin acceso. Mostrando placa de bloqueo.");
            wrapper.innerHTML = `
                <div class="w-full h-full bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
                    <div class="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                        <i data-lucide="lock" class="w-6 h-6"></i>
                    </div>
                    <h3 class="text-lg font-black italic uppercase text-white mb-1">Contenido Exclusivo</h3>
                    <p class="text-xs text-slate-400 max-w-xs mb-4">Debes ingresar tu pase o adquirir tu entrada para ver el partido en vivo.</p>
                </div>
            `;
            if (window.lucide) lucide.createIcons();
        }
    } else if (CONFIG_TRANSMISION.estado === "REPETICION") {
        wrapper.innerHTML = `
            <iframe class="w-full h-full" src="https://www.youtube.com/embed/${CONFIG_TRANSMISION.youtubeId}?autoplay=0&rel=0" frameborder="0" allowfullscreen></iframe>
        `;
    } else {
        wrapper.innerHTML = `
            <div class="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
                <h2 class="text-xl font-black text-white uppercase">${CONFIG_TRANSMISION.proximoPartido.equipoLocal} VS ${CONFIG_TRANSMISION.proximoPartido.equipoVisitante}</h2>
                <p class="text-xs text-slate-400">${CONFIG_TRANSMISION.proximoPartido.titulo} • ${CONFIG_TRANSMISION.proximoPartido.fechaHora}</p>
            </div>
        `;
    }
}

// ==========================================
// FUNCIÓN PARA SOLICITAR Y CARGAR EL STREAM FIRMADO
// ==========================================
/*async function cargarVideoDesbloqueado() {
    const wrapper = document.getElementById('wrapper-video-dinamico');
    if (!wrapper) return;

    // 1. Inyectamos la etiqueta <video> limpia
    wrapper.innerHTML = `
        <video 
            id="reproductor-bunny" 
            class="w-full h-full object-cover" 
            controls 
            playsinline 
            autoplay 
            muted>
            Su navegador no soporta reproducción HLS.
        </video>
    `;

    const videoElem = document.getElementById('reproductor-bunny');

    try {
        console.log("Pidiendo URL firmada a /api/obtener-stream...");
        const res = await fetch('/api/obtener-stream');
        const data = await res.json();

        if (!res.ok || !data.streamUrl) {
            console.error("Error al obtener stream:", data);
            return;
        }

        console.log("URL firmada recibida con éxito:", data.streamUrl);

        // 2. Cargamos la señal con HLS.js o Nativo
        if (typeof Hls !== 'undefined' && Hls.isSupported()) {
            const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
            hls.loadSource(data.streamUrl);
            hls.attachMedia(videoElem);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                console.log("Manifest parseado. Iniciando video...");
                videoElem.play().catch(e => {
                    console.warn("Autoplay prevenido por el navegador, reproduciendo silenciado.");
                    videoElem.muted = true;
                    videoElem.play();
                });
            });

            hls.on(Hls.Events.ERROR, (event, dataError) => {
                if (dataError.fatal) {
                    console.error("Error fatal HLS:", dataError);
                    if (dataError.type === Hls.ErrorTypes.NETWORK_ERROR) hls.startLoad();
                }
            });

        } else if (videoElem.canPlayType('application/vnd.apple.mpegurl')) {
            videoElem.src = data.streamUrl;
            videoElem.addEventListener('loadedmetadata', () => {
                videoElem.play();
            });
        } else {
            console.error("HLS no es soportado en este navegador.");
        }

    } catch (err) {
        console.error("Excepción al intentar cargar el video:", err);
    }
}*/

let playerInstancia = null; // Guardamos la instancia del reproductor

async function cargarVideoDesbloqueado() {
    const contenedor = document.getElementById('wrapper-video-dinamico');
    if (!contenedor) return;

    // 1. Estructura del video para Plyr
    contenedor.innerHTML = `
        <video 
            id="reproductor-plyr" 
            class="w-full h-full object-cover"
            poster="${CONFIG_TRANSMISION.posterUrl}"
            playsinline 
            crossorigin 
            controls>
        </video>
    `;  

    const videoElem = document.getElementById('reproductor-plyr');

    try {
        // 2. Pedimos la URL firmada a tu backend de Vercel
        const response = await fetch('/api/obtener-stream');
        const data = await response.json();

        if (!response.ok || !data.streamUrl) {
            console.error("Error al obtener el token de la transmisión:", data);
            return;
        }

        const sourceUrl = data.streamUrl;

        // 3. Inicializamos HLS.js
        if (Hls.isSupported()) {
            const hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true
            });

            hls.loadSource(sourceUrl);
            hls.attachMedia(videoElem);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                // Inicializamos Plyr con controles completos (incluye AirPlay)
                playerInstancia = new Plyr(videoElem, {
                    controls: [
                        'play-large', 'play', 'progress', 'current-time', 
                        'mute', 'volume', 'captions', 'settings', 
                        'pip', 'airplay', 'fullscreen'
                    ],
                    autoplay: false
                });
            });

        } else if (videoElem.canPlayType('application/vnd.apple.mpegurl')) {
            // Safari nativo (iOS / Mac)
            videoElem.src = sourceUrl;
            playerInstancia = new Plyr(videoElem, {
                controls: [
                    'play-large', 'play', 'progress', 'current-time', 
                    'mute', 'volume', 'airplay', 'fullscreen'
                ],
                autoplay: true
            });
        }

    } catch (err) {
        console.error("Error de conexión al cargar la señal:", err);
    }
}


// ==========================================
// VALIDACIÓN DEL CÓDIGO INGRESDADO POR EL USUARIO
// ==========================================
async function intentarAccesoConBaseDatos() {
    const input = document.getElementById('clave-input');
    const btn = document.getElementById('btn-validar');
    const txtError = document.getElementById('error-mensaje');
    
    if (!input || !input.value.trim()) return;
    
    const codigoIngresado = input.value.trim().toUpperCase();

    btn.disabled = true;
    btn.innerText = "VERIFICANDO...";
    if (txtError) txtError.classList.add('hidden');

    try {
        const response = await fetch('/api/validar-clave', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ codigo: codigoIngresado })
        });

        const resultado = await response.json();

        if (!response.ok || !resultado.valido) {
            if (txtError) {
                txtError.innerText = resultado.mensaje || resultado.error || "Código inválido.";
                txtError.classList.remove('hidden');
            }
            btn.disabled = false;
            btn.innerText = "DESBLOQUEAR PARTIDO";
            return;
        }

        // 1. Guardar en localStorage
        localStorage.setItem('usuario_acceso_valido', 'true');
        
        const ahora = new Date();
        const diasHastaMiercoles = (10 - ahora.getDay()) % 7 || 7;
        ahora.setDate(ahora.getDate() + diasHastaMiercoles);
        ahora.setHours(0, 0, 0, 0);
        localStorage.setItem('acceso_vencimiento', ahora.getTime().toString());

        // 2. Ocultar formulario
        const formLogin = document.getElementById('formulario-login');
        const accesoExitoso = document.getElementById('acceso-exitoso');

        if (formLogin) formLogin.classList.add('hidden');
        if (accesoExitoso) accesoExitoso.classList.remove('hidden');

        // 3. Ejecutar la inyección del video
        cargarVideoDesbloqueado();

    } catch (err) {
        if (txtError) {
            txtError.innerText = "ERROR DE CONEXIÓN. INTENTÁ DE NUEVO.";
            txtError.classList.remove('hidden');
        }
        btn.disabled = false;
        btn.innerText = "DESBLOQUEAR PARTIDO";
    }
}


// Escuchadores globales
document.addEventListener('DOMContentLoaded', inicializarPantalla);
window.intentarAccesoConBaseDatos = intentarAccesoConBaseDatos;
