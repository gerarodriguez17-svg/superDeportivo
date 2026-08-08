// ==========================================
// CONFIGURACIÓN DE LA TRANSMISIÓN
// ==========================================
const CONFIG_TRANSMISION = {
    // "EN_VIVO" | "REPETICION" | "PROXIMAMENTE"
    estado: "EN_VIVO", 
    posterUrl: "/public/img/portadas/PARTIDO1.png",
    
    // ID de YouTube para la repetición
    youtubeId: "J75ydWUSOmg", 

    // Placa informativa cuando no hay partido
    proximoPartido: {
        titulo: "FECHA 1 - CLAUSURA 2026",
        equipoLocal: "C.U.A.C",
        equipoVisitante: "I.F.C.B",
        fechaHora: "Domingo 9 AGOSTO"
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

    const urlPortada = CONFIG_TRANSMISION.posterUrl || '';

    // 1. Inyectamos la etiqueta video
    contenedor.innerHTML = `
        <video 
            id="reproductor-plyr" 
            class="w-full h-full object-cover"
            poster="${urlPortada}"
            playsinline 
            crossorigin 
            controls>
        </video>
    `;  

    const videoElem = document.getElementById('reproductor-plyr');

    // Inicializamos Plyr primero para asegurar que reemplace los controles nativos
    if (typeof Plyr !== 'undefined') {
        playerInstancia = new Plyr(videoElem, {
            controls: [
                'play-large', 'play', 'progress', 'current-time', 
                'mute', 'volume', 'captions', 'settings', 
                'pip', 'airplay', 'fullscreen'
            ],
            autoplay: false,
            poster: urlPortada
        });
    }

    try {
        const response = await fetch('/api/obtener-stream');
        const data = await response.json();

        if (!response.ok || !data.streamUrl) {
            console.warn("No hay transmisión en vivo activa en este momento.");
            return;
        }

        const sourceUrl = data.streamUrl;

        if (typeof Hls !== 'undefined' && Hls.isSupported()) {
            const hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true
            });

            hls.loadSource(sourceUrl);
            hls.attachMedia(videoElem);

            // Si el vivo falla o no está transmitiendo, evitamos que quede en bucle negro
            hls.on(Hls.Events.ERROR, function (event, data) {
                if (data.fatal) {
                    console.warn("Señal en vivo no detectada o desconectada. Mostrando portada.");
                    hls.destroy();
                }
            });

        } else if (videoElem.canPlayType('application/vnd.apple.mpegurl')) {
            videoElem.src = sourceUrl;
        }

    } catch (err) {
        console.error("Error al conectar con la señal:", err);
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

// Inicializador global de Google Cast
window['__onGCastApiAvailable'] = function(isAvailable) {
    if (isAvailable) {
        inicializarGoogleCast();
    }
};

function inicializarGoogleCast() {
    cast.framework.CastContext.getInstance().setOptions({
        // Utiliza el Receptor Predeterminado de Media de Google Cast
        receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    });

    const context = cast.framework.CastContext.getInstance();

    // Escuchar cuando el usuario selecciona una TV y se conecta
    context.addEventListener(
        cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
        async (event) => {
            if (event.sessionState === cast.framework.SessionState.SESSION_STARTED) {
                console.log("Conectado a Smart TV. Enviando transmisión...");
                
                // Pedimos el stream a la API para enviar la señal firmada a la TV
                const res = await fetch('/api/obtener-stream');
                const data = await res.json();
                
                if (data.streamUrl) {
                    const session = cast.framework.CastContext.getInstance().getCurrentSession();
                    const mediaInfo = new chrome.cast.media.MediaInfo(data.streamUrl, 'application/x-mpegurl');
                    const request = new chrome.cast.media.LoadRequest(mediaInfo);
                    
                    session.loadMedia(request).then(
                        () => console.log('Video cargado exitosamente en la TV'),
                        (err) => console.error('Error al reproducir en la TV:', err)
                    );
                }
            }
        }
    );
}

// Escuchadores globales
document.addEventListener('DOMContentLoaded', inicializarPantalla);
window.intentarAccesoConBaseDatos = intentarAccesoConBaseDatos;
