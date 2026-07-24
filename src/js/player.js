// ==========================================
// CONFIGURACIÓN DE LA TRANSMISIÓN
// ==========================================
const CONFIG_TRANSMISION = {
    // "EN_VIVO" | "REPETICION" | "PROXIMAMENTE"
    estado: "EN_VIVO", 

    // URL de Bunny.net para el vivo
    bunnyUrl: "https://customer-s9j2d2h307gul2fy.cloudflarestream.com/407942320be38f97de9277fc37d3d08c/manifest/video.m3u8",

    // ID de YouTube para la repetición
    youtubeId: "J75ydWUSOmg", 

    // Placa informativo cuando no hay partido
    proximoPartido: {
        titulo: "FECHA 1 - CLAUSURA 2026",
        equipoLocal: "Cerrito",
        equipoVisitante: "María Grande",
        fechaHora: "Domingo 15:30 HS"
    }
};

// ==========================================
// LÓGICA DE CONTROL DEL REPRODUCTOR Y ACCESO
// ==========================================
function cargarReproductor() {
    const wrapper = document.getElementById('wrapper-video-dinamico');
    if (!wrapper) return;

    wrapper.innerHTML = "";

    // 1. SI ESTÁ EN VIVO -> VERIFICAMOS ACCESO / CÓDIGO
    if (CONFIG_TRANSMISION.estado === "EN_VIVO") {
        
        // Verificamos si en localStorage existe un pase/código validado por Supabase
        const tieneAcceso = localStorage.getItem('usuario_acceso_valido') === 'true';

        if (tieneAcceso) {
            // Usuario PAGÓ / VALIDÓ -> Mostramos la señal de Bunny
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
            inicializarHlsBunny(CONFIG_TRANSMISION.bunnyUrl);
        } else {
            // Usuario NO PAGÓ -> Mostramos placa de bloqueo con botón de pago
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

    } 
    // 2. SI ES REPETICIÓN -> LIBRE PARA TODOS (YOUTUBE)
    else if (CONFIG_TRANSMISION.estado === "REPETICION") {
        wrapper.innerHTML = `
            <iframe 
                class="w-full h-full" 
                src="https://www.youtube.com/embed/${CONFIG_TRANSMISION.youtubeId}?autoplay=0&rel=0" 
                title="Repetición del Partido" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen>
            </iframe>
        `;
    } 
    // 3. SI ES PROXIMAMENTE -> LIBRE PARA TODOS (PLACA)
    else {
        wrapper.innerHTML = `
            <div class="w-full h-full bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col items-center justify-center p-6 text-center">
                <div class="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black italic uppercase px-3 py-1 rounded-full mb-3 tracking-widest">
                    Próxima Transmisión
                </div>
                <h2 class="text-xl md:text-2xl font-black italic uppercase text-white mb-1">
                    ${CONFIG_TRANSMISION.proximoPartido.equipoLocal} VS ${CONFIG_TRANSMISION.proximoPartido.equipoVisitante}
                </h2>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    ${CONFIG_TRANSMISION.proximoPartido.titulo} • ${CONFIG_TRANSMISION.proximoPartido.fechaHora}
                </p>
            </div>
        `;
    }
}

function inicializarHlsBunny(urlStream) {
    const video = document.getElementById('reproductor-bunny');
    if (!video) return;

    if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
        hls.loadSource(urlStream);
        hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = urlStream;
    }
}

document.addEventListener('DOMContentLoaded', cargarReproductor);


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

        // 1. Guardar permisos en LocalStorage
        localStorage.setItem('acceso_superdep', 'true');
        
        const ahora = new Date();
        const diasHastaMiercoles = (10 - ahora.getDay()) % 7 || 7;
        ahora.setDate(ahora.getDate() + diasHastaMiercoles);
        ahora.setHours(0, 0, 0, 0);
        localStorage.setItem('acceso_vencimiento', ahora.getTime().toString());

        // 2. Ocultar formulario e indicar acceso concedido en pantalla
        const formLogin = document.getElementById('formulario-login');
        const accesoExitoso = document.getElementById('acceso-exitoso');

        if (formLogin) formLogin.classList.add('hidden');
        if (accesoExitoso) accesoExitoso.classList.remove('hidden');

        // 3. Activar el reproductor (si la función aplicarAcceso existe)
        if (typeof aplicarAcceso === 'function') {
            const videoId = typeof VIDEO_ID_DOMINGO !== 'undefined' ? VIDEO_ID_DOMINGO : '';
            aplicarAcceso(videoId);
        }

    } catch (err) {
        if (txtError) {
            txtError.innerText = "ERROR DE CONEXIÓN. INTENTÁ DE NUEVO.";
            txtError.classList.remove('hidden');
        }
        btn.disabled = false;
        btn.innerText = "DESBLOQUEAR PARTIDO";
    }
}

// ⚠️ Asegurar exposición al botón del HTML
window.intentarAccesoConBaseDatos = intentarAccesoConBaseDatos;