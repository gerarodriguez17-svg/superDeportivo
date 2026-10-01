// ==========================================
// MOTOR PRINCIPAL DE DIBUJO Y NAVEGACIÓN (main.js)
// ==========================================

let zonaActual = 'norte';
let categoriaActual = 'primera';
let fechaActual = '5'; //CAMBIAR SEMANA A SEMANA

// 1. CAMBIAR ZONA / CATEGORÍA / FECHA
function cambiarZona(z) {
    zonaActual = z;
    document.querySelectorAll('.zone-button').forEach(b => b.classList.remove('active-btn'));
    const btn = document.getElementById('zone-' + z);
    if (btn) btn.classList.add('active-btn');
    renderizar();
}

function cambiarCategoria(cat) {
    categoriaActual = cat;
    document.querySelectorAll('.category-button').forEach(b => b.classList.remove('active-btn'));
    const btn = document.getElementById('cat-' + cat);
    if (btn) btn.classList.add('active-btn');
    renderizar();
}

function cambiarFecha(f) {
    fechaActual = f;
    renderizar();
}

// 2. FUNCIÓN PARA OBTENER ESCUDO
function obtenerEscudo(nombre, clasesAdicionales = '') {
    const url = (typeof ESCUDOS_MAP !== 'undefined' && ESCUDOS_MAP[nombre]) 
        ? ESCUDOS_MAP[nombre] 
        : 'public/img/escudos/generico.png';
    return `<img src="${url}" class="w-8 h-8 object-contain inline-block ${clasesAdicionales}" onerror="this.style.display='none'" alt="">`;
}

// 3. PROCESAMIENTO DE TABLAS DE POSICIONES
function obtenerTablaPorZona(zona, categoria) {
    if (typeof NORTE_DATA === 'undefined') return [];

    let equipos = zona === 'norte' ? EQUIPOS_NORTE : (zona === 'centro' ? EQUIPOS_CENTRO : EQUIPOS_SUR);
    let data = (zona === 'norte' ? NORTE_DATA : (zona === 'centro' ? CENTRO_DATA : SUR_DATA))[categoria];
    
    let stats = {};
    equipos.forEach(e => stats[e] = { pts: 0, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 });
    
    if(!data) return [];

    Object.values(data).forEach(fecha => {
        if(fecha.partidos) {
            fecha.partidos.forEach(p => {
                if (p.R && p.R !== "-" && p.R !== "") {
                    const scores = p.R.split(/[-|]/).map(s => parseInt(s.trim()));
                    if(scores.length === 2 && !isNaN(scores[0]) && !isNaN(scores[1])) {
                        const L = p.L.trim(); const V = p.V.trim();
                        if(stats[L] && stats[V]) {
                            stats[L].pj++; stats[V].pj++;
                            stats[L].gf += scores[0]; stats[L].gc += scores[1];
                            stats[V].gf += scores[1]; stats[V].gc += scores[0];
                            if (scores[0] > scores[1]) {
                                stats[L].pts += 3; stats[L].pg++; stats[V].pp++;
                            } else if (scores[1] > scores[0]) {
                                stats[V].pts += 3; stats[V].pg++; stats[L].pp++;
                            } else {
                                stats[L].pts += 1; stats[V].pts += 1;
                                stats[L].pe++; stats[V].pe++;
                            }
                        }
                    }
                }
            });
        }
    });

    return Object.entries(stats)
        .map(([nombre, s]) => ({ nombre, ...s, dg: s.gf - s.gc }))
        .sort((a,b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);
}

// 4. LÓGICA DE GANADORES DE PLAYOFFS
function obtenerGanadorLlave(p1, p2, llaveId) {
    if (!p1) return p2 || "";
    if (!p2) return p1 || "";

    let idPrefijo = llaveId;
    const cat = typeof categoriaActual !== 'undefined' ? categoriaActual.toUpperCase() : "PRIMERA";
    if (cat === "SUB17") idPrefijo = `sub17_${llaveId}`;
    if (cat === "SUB20") idPrefijo = `sub20_${llaveId}`;

    if (typeof resultadosPlayoffs === 'undefined') return "";
    const res = resultadosPlayoffs[idPrefijo];
    if (!res) return "";

    if (res.vta && (res.vta[0] === "-" || res.vta[1] === "-")) return "";

    const golesIda1 = Number(res.ida[0]) || 0;
    const golesIda2 = Number(res.ida[1]) || 0;
    const golesVta1 = Number(res.vta[0]) || 0;
    const golesVta2 = Number(res.vta[1]) || 0;

    const g1 = golesIda1 + golesVta1;
    const g2 = golesIda2 + golesVta2;
    const esOctavos = !llaveId.includes('c') && !llaveId.includes('s') && !llaveId.includes('final');

    if (g1 > g2) return p1;
    if (g2 > g1) return p2;

    if (esOctavos) {
        return p1; 
    } else {
        const penales1 = Number(res.penales?.[0]) || 0;
        const penales2 = Number(res.penales?.[1]) || 0;
        if (penales1 > penales2) return p1;
        if (penales2 > penales1) return p2;
        return ""; 
    }
}

// 5. RENDERIZADO DE PARTIDOS EN CUADRO
function crearTarjetaPartido(p1, p2, llaveId, labelEtiqueta) {
    const abreviarNombre = (nombre) => {
        if (!nombre || nombre === "---") return "";
        let n = nombre.trim();
        n = n.replace(/Viale Football Club/gi, "Viale FC");
        n = n.replace(/Independiente FC/gi, "Independiente");
        n = n.replace(/Litoral María Grande/gi, "Litoral M.G");
        n = n.replace(/Atlético María Grande/gi, "Atletico M.G");
        n = n.replace(/Sarmiento de Crespo/gi, "Sar. Crespo");
        n = n.replace(/Cultural de Crespo/gi, "Cult. Crespo");
        n = n.replace(/U\. Agrarios Cerrito/gi, "U.A. Cerrito");
        n = n.replace(/Atlético Hasenkamp/gi, "Atl. Hasenkamp");
        n = n.replace(/Escuela Diego Maradona/gi, "Esc. D. Mar.");
        n = n.replace(/Deportivo Tuyango/gi, "Dep. Tuyango");
        n = n.replace(/Juventud Sarmiento/gi, "Juv. Sarmiento");
        n = n.replace(/J\. Unida de Bovril/gi, "J. U. Bovril");
        n = n.replace(/Deportivo Bovril/gi, "Dep. Bovril");
        return n;
    };

    const p1Abreviado = p1 ? abreviarNombre(p1) : '— POR DEFINIR —';
    const p2Abreviado = p2 ? abreviarNombre(p2) : '— POR DEFINIR —';

    let idPrefijo = llaveId;
    const cat = typeof categoriaActual !== 'undefined' ? categoriaActual.toUpperCase() : "PRIMERA";
    if (cat === "SUB17") idPrefijo = `sub17_${llaveId}`;
    if (cat === "SUB20") idPrefijo = `sub20_${llaveId}`;

    const res = (typeof resultadosPlayoffs !== 'undefined' && resultadosPlayoffs[idPrefijo]) 
        ? resultadosPlayoffs[idPrefijo] 
        : { ida: ["-", "-"], vta: ["-", "-"], penales: ["-", "-"] };

    const tieneIda = res.ida && res.ida[0] !== "-" && res.ida[1] !== "-";
    const tieneVuelta = res.vta && res.vta[0] !== "-" && res.vta[1] !== "-";

    let g1 = "", g2 = "";
    if (tieneIda && tieneVuelta) {
        g1 = Number(res.ida[0]) + Number(res.vta[0]);
        g2 = Number(res.ida[1]) + Number(res.vta[1]);
    } else if (tieneIda) {
        g1 = Number(res.ida[0]);
        g2 = Number(res.ida[1]);
    }

    const hayPenales = tieneIda && tieneVuelta && (g1 === g2) && 
                       res.penales && res.penales[0] !== "-" && res.penales[1] !== "-" &&
                       (Number(res.penales[0]) > 0 || Number(res.penales[1]) > 0);

    const miniEscudo = (nombre) => {
        if (!nombre || nombre === "---") return `<div class="w-5 h-5 bg-white/5 rounded-full"></div>`;
        return `<div class="w-5 h-5 flex items-center justify-center flex-shrink-0 overflow-visible">${obtenerEscudo(nombre)}</div>`;
    };
    return `
        <!-- CONTENEDOR DEL PARTIDO -->
        <div class="w-full">
            
            <!-- TÍTULO AFUERA DE LA TARJETA -->
            <div class="text-center text-slate-300 font-black uppercase text-[10px] md:text-[11px] tracking-widest mb-1 italic drop-shadow-md">
                ${labelEtiqueta}
            </div>
            
            <!-- TARJETA VISUAL -->
            <div class="flex flex-col w-full bg-slate-900/95 border border-white/10 rounded-xl shadow-xl mb-3 overflow-hidden">
                
                <!-- Cabecera interna (Solo Ida y Vuelta centrados) -->
                <div class="flex justify-center items-center px-3 py-1.5 bg-slate-950 border-b border-white/10">
                    <span class="text-yellow-400 font-extrabold text-[9px] md:text-[10px] bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20 tracking-wide shadow-inner">
                        I: ${res.ida[0]}-${res.ida[1]} &nbsp;|&nbsp; V: ${res.vta[0]}-${res.vta[1]}
                    </span>
                </div>
                
                <!-- Equipo 1 y Goles/Penales -->
                <div class="flex items-center justify-between p-2 border-b border-white/5">
                    <div class="flex items-center gap-2 truncate pr-2">
                        ${miniEscudo(p1)}
                        <span class="text-[10px] font-black ${p1 ? 'text-slate-100' : 'text-slate-500'} uppercase truncate">${p1Abreviado}</span>
                    </div>
                    <span class="text-white font-black text-[11px] whitespace-nowrap">${p1 ? g1 : ''} ${hayPenales && p1 ? `<span class="text-yellow-500 text-[8px] ml-0.5">(${res.penales[0]})</span>` : ''}</span>
                </div>
                
                <!-- Equipo 2 y Goles/Penales -->
                <div class="flex items-center justify-between p-2">
                    <div class="flex items-center gap-2 truncate pr-2">
                        ${miniEscudo(p2)}
                        <span class="text-[10px] font-black ${p2 ? 'text-slate-100' : 'text-slate-500'} uppercase truncate">${p2Abreviado}</span>
                    </div>
                    <span class="text-white font-black text-[11px] whitespace-nowrap">${p2 ? g2 : ''} ${hayPenales && p2 ? `<span class="text-yellow-500 text-[8px] ml-0.5">(${res.penales[1]})</span>` : ''}</span>
                </div>
                
            </div>
        </div>`;
}

// 6. FUNCIÓN DE RENDERIZADO COMPLETO
function renderizar() {

    if (typeof NORTE_DATA === 'undefined') return;

    // A) Tabla de Posiciones
    const tituloTabla = document.getElementById('titulo-tabla');
    if (tituloTabla) tituloTabla.innerText = `Posiciones - ${zonaActual.toUpperCase()} (${categoriaActual.toUpperCase()})`;
    
    const tNorte = obtenerTablaPorZona('norte', categoriaActual);
    const tCentro = obtenerTablaPorZona('centro', categoriaActual);
    const tSur = obtenerTablaPorZona('sur', categoriaActual);
    const tablaMostrar = zonaActual === 'norte' ? tNorte : (zonaActual === 'centro' ? tCentro : tSur);

    // --- NUEVA LÓGICA: IDENTIFICAR AL MEJOR 6TO ---
    const sextos = [tNorte[5], tCentro[5], tSur[5]].filter(Boolean);
    sextos.sort((a, b) => {
        const promA = a.pj > 0 ? a.pts / a.pj : 0;
        const promB = b.pj > 0 ? b.pts / b.pj : 0;
        return promB - promA || b.dg - a.dg;
    });
    const mejorSextoNombre = sextos.length > 0 ? sextos[0].nombre : null;

    const header = `
        <div class="grid grid-cols-12 gap-1 px-4 mb-2 text-[9px] font-black uppercase text-slate-500 tracking-tighter">
            <div class="col-span-1">#</div>
            <div class="col-span-4">Equipo</div>
            <div class="col-span-1 text-center">PJ</div>
            <div class="col-span-1 text-center">G</div>
            <div class="col-span-1 text-center">E</div>
            <div class="col-span-1 text-center">P</div>
            <div class="col-span-1 text-center">GF/GC</div>
            <div class="col-span-1 text-center">DG</div>
            <div class="col-span-1 text-right">PTS</div>
        </div>
    `;

    const contTabla = document.getElementById('tabla-render');
    if (contTabla) {
        contTabla.innerHTML = header + tablaMostrar.map((eq, i) => {
            const esTop5 = i < 5;
            const esMejorSexto = (i === 5 && eq.nombre === mejorSextoNombre);
            
            // Estilos por defecto (resto de los equipos)
            let bg = 'bg-white/5 border-white/10';
            let txt = 'text-slate-200';
            let numColor = 'text-slate-500';
            let ptsColor = 'text-slate-300';

            // Estilos si es Top 5
            if (esTop5) {
                bg = 'bg-amber-500/10 border-amber-500/20';
                txt = 'text-amber-400';
                numColor = 'text-amber-500';
                ptsColor = 'text-amber-500';
            } 
            // Estilos si es el Mejor 6to
            else if (esMejorSexto) {
                bg = 'bg-blue-500/10 border-blue-500/30';
                txt = 'text-blue-400';
                numColor = 'text-blue-500';
                ptsColor = 'text-blue-400';
            }

            return `
                <div class="grid grid-cols-12 gap-1 items-center ${bg} p-3 mb-1 rounded-xl border transition-all">
                    <div class="col-span-1 ${numColor} font-black text-[10px]">${i+1}</div>
                    <div class="col-span-4 font-black italic uppercase text-[10px] ${txt} flex items-center gap-1.5 overflow-hidden">
                        ${obtenerEscudo(eq.nombre)}
                        <span class="truncate">${eq.nombre}</span>
                    </div>
                    <div class="col-span-1 text-center text-slate-400 font-bold text-[10px]">${eq.pj}</div>
                    <div class="col-span-1 text-center text-slate-400 font-bold text-[10px]">${eq.pg}</div>
                    <div class="col-span-1 text-center text-slate-400 font-bold text-[10px]">${eq.pe}</div>
                    <div class="col-span-1 text-center text-slate-400 font-bold text-[10px]">${eq.pp}</div>
                    <div class="col-span-1 text-center text-slate-500 text-[9px] font-medium">${eq.gf}/${eq.gc}</div>
                    <div class="col-span-1 text-center text-slate-400 font-bold text-[10px]">${eq.dg > 0 ? '+' + eq.dg : eq.dg}</div>
                    <div class="col-span-1 text-right ${ptsColor} font-black text-sm italic">${eq.pts}</div>
                </div>
            `;
        }).join('');
    }
    
    // B) Fixture
    let dataFixture = zonaActual === 'norte' ? NORTE_DATA[categoriaActual] : (zonaActual === 'centro' ? CENTRO_DATA[categoriaActual] : SUR_DATA[categoriaActual]);
    const fecha = (dataFixture && dataFixture[fechaActual]) ? dataFixture[fechaActual] : { partidos: [], libre: "" };
    
    const contFix = document.getElementById('fixture-render');
    if (contFix) {
        if(!fecha.partidos || fecha.partidos.length === 0) {
            contFix.innerHTML = `<p class="text-center text-slate-600 text-[10px] uppercase font-black py-8">No hay partidos cargados</p>`;
        } else {
            contFix.innerHTML = fecha.partidos.map(p => `
                <div class="bg-slate-950/50 p-4 rounded-2xl border border-white/5 flex justify-between items-center text-[10px] font-black italic uppercase tracking-tighter mb-2">
                    <div class="flex items-center w-[40%]">
                        ${obtenerEscudo(p.L)}
                        <span class="truncate">${p.L}</span>
                    </div>
                    <div class="mx-2 px-3 py-1.5 rounded-lg ${p.R === '-' ? 'bg-white/5 text-slate-600' : 'bg-amber-600 text-white shadow-lg'} min-w-[55px] text-center">
                        ${p.R === '-' ? 'VS' : p.R.replace('|', '-')}
                    </div>
                    <div class="flex items-center w-[40%] justify-end text-right">
                        <span class="truncate">${p.V}</span>
                        ${obtenerEscudo(p.V, 'ml-2')}
                    </div>
                </div>
            `).join('');
        }
    }

    // C) Cuadro de Playoffs
    renderizarPlayoffs(tNorte, tCentro, tSur);

    // D) Orden de Mérito (🚀 AHORA SÍ CONECTADO)
    renderizarMerito(tNorte, tCentro, tSur);
}

// 6.B) FUNCIÓN PARA RENDERIZAR TABLAS DE MÉRITO (JERÁRQUICO Y GRUPOS)
function renderizarMerito(tNorte, tCentro, tSur) {
    const cont16 = document.getElementById('top-16-render');
    if (!cont16) return;

    cont16.className = "flex flex-col lg:flex-row gap-6 w-full mb-8";
    const isClausura = (typeof MODO_TORNEO !== 'undefined' && MODO_TORNEO === 'CLAUSURA');

    const generarFila = (eq, i, colorClase, posReal) => {
        if (!eq) return '';
        const estiloBorde = `${colorClase.replace('text-', 'border-')} bg-white/5`;
        const prom = eq.pj > 0 ? (eq.pts/eq.pj).toFixed(2) : "0.00";
        return `
        <div class="flex justify-between items-center p-2 mb-1 rounded border-l-2 ${estiloBorde} text-[10px] uppercase font-bold text-slate-200">
            <span class="flex items-center gap-3 truncate min-w-0">
                <span class="text-slate-400 w-4 md:w-5 font-black text-[11px] md:text-xs flex-shrink-0">${posReal}</span>
                <div class="w-6 h-6 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    ${obtenerEscudo(eq.nombre)}
                </div>
                <span class="truncate leading-tight">${eq.nombre}</span>
            </span> 
            <span class="text-amber-500 font-black text-[9px] ml-2">
                ${prom}
            </span>
        </div>`;
    };

    if (isClausura) {
        // --- LÓGICA CLAUSURA 2026 ---
            // Recuperamos la función para guardar la posición interna de cada zona
            const guardarPosicionOriginal = (tabla) => tabla.map((eq, ind) => ({ ...eq, posicionZona: ind + 1 }));
            
            const tNorteConPos = guardarPosicionOriginal(tNorte);
            const tCentroConPos = guardarPosicionOriginal(tCentro);
            const tSurConPos = guardarPosicionOriginal(tSur);

            // Juntamos los tres grupos ya con la propiedad 'posicionZona' adentro
            let todosLosEquipos = [...tNorteConPos, ...tCentroConPos, ...tSurConPos];
            
            // Ordenar general: 1° por posición en su zona, 2° por Promedio (pts/pj) y 3° por Diferencia de Gol
            todosLosEquipos.sort((a, b) => {
                // Filtro reglamentario de la Liga: Prioriza el puesto en el grupo
                if (a.posicionZona !== b.posicionZona) {
                    return a.posicionZona - b.posicionZona;
                }
                
                // Si salieron en el mismo puesto (ej. todos los 1°), desempata promedio y dg
                const promA = a.pj > 0 ? a.pts / a.pj : 0;
                const promB = b.pj > 0 ? b.pts / b.pj : 0;
                return promB - promA || b.dg - a.dg;
            });

            const top16 = todosLosEquipos.slice(0, 16);

            // ENCABEZADO ÚNICO PARA LAS COLUMNAS (Se muestra una sola vez arriba de cada tabla)
            const headerColumnas = `
                <div class="grid grid-cols-12 gap-1 px-2.5 mb-1.5 text-[8px] font-black uppercase text-slate-500 tracking-wider">
                    <div class="col-span-1">#</div>
                    <div class="col-span-5">Equipo</div>
                    <div class="col-span-2 text-center">PTS</div>
                    <div class="col-span-1 text-center">PJ</div>
                    <div class="col-span-3 text-right pr-1">PROMEDIO</div>
                </div>
            `;

            // NUEVA FUNCIÓN INTERNA DE RENDERIZADO LIMPIA (SIN LOS TEXTOS REPETIDOS ADENTRO)
            const generarFilaClausura = (eq, posReal, colorNumero) => {
                const promedio = eq.pj > 0 ? (eq.pts / eq.pj).toFixed(3) : "0.000";
                return `
                    <div class="grid grid-cols-12 gap-1 items-center bg-white/5 border border-white/10 p-2.5 mb-1 rounded-xl transition-all">
                        <!-- Número de Orden de Mérito -->
                        <div class="col-span-1 ${colorNumero} font-black text-[11px]">${posReal}</div>
                        
                        <!-- Escudo y Nombre del Equipo -->
                        <div class="col-span-5 font-black italic uppercase text-[10px] text-slate-200 flex items-center gap-1.5 overflow-hidden">
                            ${obtenerEscudo(eq.nombre)}
                            <span class="truncate">${eq.nombre}</span>
                            <span class="text-[8px] text-slate-500 font-sans not-italic font-normal">(${eq.posicionZona}°Z)</span>
                        </div>
                        
                        <!-- Datos limpios alineados con el encabezado superior -->
                        <div class="col-span-2 text-center text-slate-300 font-bold text-[10px]">${eq.pts}</div>
                        <div class="col-span-1 text-center text-slate-300 font-bold text-[10px]">${eq.pj}</div>
                        <div class="col-span-3 text-right ${colorNumero} font-black text-sm italic tracking-tight pr-1">${promedio}</div>
                    </div>
                `;
            };

            // MÉTODO SEGURO: Definimos los índices usando funciones de Array para evitar el borrado de corchetes
            const indicesA_Ordenados = new Array(0, 2, 4, 6, 9, 11, 13, 15);
            const grupoA = indicesA_Ordenados.map(idx => ({ equipo: top16[idx], posReal: idx + 1 })).filter(item => item.equipo);

            const indicesB_Ordenados = new Array(1, 3, 5, 7, 8, 10, 12, 14);
            const grupoB = indicesB_Ordenados.map(idx => ({ equipo: top16[idx], posReal: idx + 1 })).filter(item => item.equipo);
            cont16.innerHTML = `
                            <div class="flex-[1.2] bg-black/20 p-4 rounded-xl border border-white/5">
                                <div class="text-xs md:text-sm font-black text-white mb-4 tracking-widest border-b border-amber-500 pb-2 italic flex justify-between items-end uppercase">
                                    <span>Orden de Mérito General (Clausura)</span>
                                    <span class="text-[9px] text-slate-500 font-normal normal-case">Posición + Promedio</span>
                                </div>
                                ${headerColumnas}
                                ${top16.map((eq, i) => generarFilaClausura(eq, i + 1, 'text-amber-500')).join('')}
                            </div>
                            <div class="flex-1 flex flex-col gap-4">
                                <div class="bg-black/20 p-4 rounded-xl border border-white/5">
                                    <div class="text-xs md:text-sm font-black text-emerald-400 mb-3 tracking-widest border-b border-emerald-400/30 pb-2 italic uppercase">
                                        Clasificados Lado A
                                    </div>
                                    ${headerColumnas}
                                    ${grupoA.map(item => generarFilaClausura(item.equipo, item.posReal, 'text-emerald-500')).join('')}
                                </div>
                                <div class="bg-black/20 p-4 rounded-xl border border-white/5">
                                    <div class="text-xs md:text-sm font-black text-blue-400 mb-3 tracking-widest border-b border-blue-400/30 pb-2 italic uppercase">
                                        Clasificados Lado B
                                    </div>
                                    ${headerColumnas}
                                    ${grupoB.map(item => generarFilaClausura(item.equipo, item.posReal, 'text-blue-500')).join('')}
                                </div>
                            </div>`;
        } else {
        // --- LÓGICA ORIGINAL APERTURA 2026 (INTACTA) ---
        const guardarPosicionOriginal = (tabla) => tabla.map((eq, ind) => ({ ...eq, posicionZona: ind + 1 }));
        let tablaNorteAjustada = guardarPosicionOriginal([...tNorte]);
        const tablaSurAjustada = guardarPosicionOriginal([...tSur]);
        const tablaCentroAjustada = guardarPosicionOriginal([...tCentro]);

        const cat = categoriaActual.toUpperCase();
        if (cat === "PRIMERA") {
            const idxMaradona = tablaNorteAjustada.findIndex(e => e.nombre.toUpperCase().includes("DIEGO MARADONA"));
            const idxBovril = tablaNorteAjustada.findIndex(e => e.nombre.toUpperCase().includes("BOVRIL"));
            if (idxMaradona !== -1 && idxBovril !== -1) {
                const [eqM] = tablaNorteAjustada.splice(idxMaradona, 1);
                const nIdxB = tablaNorteAjustada.findIndex(e => e.nombre.toUpperCase().includes("BOVRIL"));
                const [eqB] = tablaNorteAjustada.splice(nIdxB, 1);
                tablaNorteAjustada.splice(4, 0, eqM);
                tablaNorteAjustada.splice(5, 0, eqB);
                tablaNorteAjustada = tablaNorteAjustada.map((e, idx) => ({...e, posicionZona: idx + 1}));
            }
        }

        let tabla16Jerarquica = [];
        for (let i = 0; i < 6; i++) {
            let nivel = [tablaSurAjustada[i], tablaNorteAjustada[i], tablaCentroAjustada[i]].filter(Boolean);
            nivel.sort((a, b) => (b.pts/b.pj) - (a.pts/a.pj) || b.dg - a.dg);
            tabla16Jerarquica.push(...nivel);
        }
        const clasificados16 = tabla16Jerarquica.slice(0, 16);

        let grupoA = [...tablaSurAjustada.slice(0, 5), ...tablaCentroAjustada.slice(0, 5).filter(eq => ["SEGUI", "CAÑADITA", "MARIA GRANDE", "LITORAL"].some(s => eq.nombre.toUpperCase().includes(s)))];
        let grupoB = [...tablaNorteAjustada.slice(0, 5), ...tablaCentroAjustada.slice(0, 5).filter(eq => ["HASENKAMP", "SARMIENTO", "MARADONA"].some(h => eq.nombre.toUpperCase().includes(h)))];

        const ordenarG = (g) => g.sort((a,b) => (a.posicionZona || 99) - (b.posicionZona || 99) || ((b.pts/b.pj) - (a.pts/a.pj)) || b.dg - a.dg);
        
        cont16.innerHTML = `
            <div class="flex-[1.2] bg-black/20 p-4 rounded-xl border border-white/5">
                <div class="text-[10px] font-black text-white mb-4 tracking-widest border-b border-amber-500 pb-1 italic flex justify-between">
                    <span>Orden de Mérito General</span>
                    <span class="text-[8px] text-slate-500 font-normal">Posición + Promedio</span>
                </div>
                ${clasificados16.map((eq, i) => generarFila(eq, i, 'text-amber-500', i+1)).join('')}
            </div>
            <div class="flex-1 flex flex-col gap-4">
                <div class="bg-black/20 p-4 rounded-xl border border-white/5">
                    <div class="text-[10px] font-black text-emerald-400 mb-2 tracking-widest border-b border-emerald-400/30 pb-1 italic">Grupo A (Sur/Centro)</div>
                    ${ordenarG(grupoA).map((eq, i) => generarFila(eq, i, 'text-emerald-500', i+1)).join('')}
                </div>
                <div class="bg-black/20 p-4 rounded-xl border border-white/5">
                    <div class="text-[10px] font-black text-blue-400 mb-2 tracking-widest border-b border-blue-400/30 pb-1 italic">Grupo B (Norte/Centro)</div>
                    ${ordenarG(grupoB).map((eq, i) => generarFila(eq, i, 'text-blue-500', i+1)).join('')}
                </div>
            </div>`;
    }
}

// 7. ARMAR GRUPOS Y CUADRO DE PLAYOFFS
function renderizarPlayoffs(tNorte, tCentro, tSur) {
    const contCuadro = document.getElementById('cuadro-render');
    if (!contCuadro) return;

    const isClausura = (typeof MODO_TORNEO !== 'undefined' && MODO_TORNEO === 'CLAUSURA');
    let eq_a1_1, eq_a1_2, eq_a2_1, eq_a2_2, eq_a3_1, eq_a3_2, eq_a4_1, eq_a4_2;
    let eq_b1_1, eq_b1_2, eq_b2_1, eq_b2_2, eq_b3_1, eq_b3_2, eq_b4_1, eq_b4_2;

    if (isClausura) {
        // --- LÓGICA CLAUSURA 2026 ---
        // Recuperamos la función para guardar la posición interna de cada zona antes de mezclarlos
        const guardarPosicionOriginal = (tabla) => tabla.map((eq, ind) => ({ ...eq, posicionZona: ind + 1 }));
        
        const tNorteConPos = guardarPosicionOriginal(tNorte);
        const tCentroConPos = guardarPosicionOriginal(tCentro);
        const tSurConPos = guardarPosicionOriginal(tSur);

        // Juntamos los tres grupos con la propiedad 'posicionZona' cargada
        let todos = [...tNorteConPos, ...tCentroConPos, ...tSurConPos];
        
        // Ordenamiento General Reglamentario (Posición en zona primero, luego Promedio y DG)
        todos.sort((a, b) => {
            if (a.posicionZona !== b.posicionZona) {
                return a.posicionZona - b.posicionZona;
            }
            const promA = a.pj > 0 ? a.pts / a.pj : 0;
            const promB = b.pj > 0 ? b.pts / b.pj : 0;
            return promB - promA || b.dg - a.dg;
        });
        
        const top16 = todos.slice(0, 16);

        // Lado A
        eq_a1_1 = top16[0]?.nombre; eq_a1_2 = top16[15]?.nombre; // 1 vs 16
        eq_a2_1 = top16[6]?.nombre; eq_a2_2 = top16[9]?.nombre;  // 7 vs 10
        eq_a3_1 = top16[4]?.nombre; eq_a3_2 = top16[11]?.nombre; // 5 vs 12
        eq_a4_1 = top16[2]?.nombre; eq_a4_2 = top16[13]?.nombre; // 3 vs 14

        // Lado B
        eq_b1_1 = top16[1]?.nombre; eq_b1_2 = top16[14]?.nombre; // 2 vs 15
        eq_b2_1 = top16[7]?.nombre; eq_b2_2 = top16[8]?.nombre;  // 8 vs 9
        eq_b3_1 = top16[5]?.nombre; eq_b3_2 = top16[10]?.nombre; // 6 vs 11
        eq_b4_1 = top16[3]?.nombre; eq_b4_2 = top16[12]?.nombre; // 4 vs 13

    } else {
        // --- LÓGICA ORIGINAL APERTURA 2026 ---
        const hayPlayoffsCargados = typeof resultadosPlayoffs !== 'undefined' && Object.keys(resultadosPlayoffs).length > 0;
        let grupoA = Array(8).fill({ nombre: "" }), grupoB = Array(8).fill({ nombre: "" });

        if (hayPlayoffsCargados) {
            const guardarPosicionOriginal = (tabla) => tabla.map((eq, ind) => ({ ...eq, posicionZona: ind + 1 }));
            let tablaNorte = guardarPosicionOriginal([...tNorte]);
            const tablaSur = guardarPosicionOriginal([...tSur]);
            const tablaCentro = guardarPosicionOriginal([...tCentro]);

            if (categoriaActual.toUpperCase() === "PRIMERA") {
                const idxM = tablaNorte.findIndex(e => e.nombre.toUpperCase().includes("DIEGO MARADONA"));
                const idxB = tablaNorte.findIndex(e => e.nombre.toUpperCase().includes("BOVRIL"));
                if (idxM !== -1 && idxB !== -1) {
                    const [eqM] = tablaNorte.splice(idxM, 1);
                    const [eqB] = tablaNorte.splice(tablaNorte.findIndex(e => e.nombre.toUpperCase().includes("BOVRIL")), 1);
                    tablaNorte.splice(4, 0, eqM); tablaNorte.splice(5, 0, eqB);
                }
            }
            const ordenarG = (g) => g.sort((a,b) => (a.posicionZona || 99) - (b.posicionZona || 99) || ((b.pts/b.pj) - (a.pts/a.pj)) || b.dg - a.dg);
            grupoA = ordenarG([...tablaSur.slice(0, 5), ...tablaCentro.slice(0, 5).filter(eq => ["SEGUI", "CAÑADITA", "MARIA GRANDE", "LITORAL"].some(s => eq.nombre.toUpperCase().includes(s)))]);
            grupoB = ordenarG([...tablaNorte.slice(0, 5), ...tablaCentro.slice(0, 5).filter(eq => ["HASENKAMP", "SARMIENTO", "MARADONA"].some(h => eq.nombre.toUpperCase().includes(h)))]);
        }
        
        eq_a1_1 = grupoA[0]?.nombre; eq_a1_2 = grupoA[7]?.nombre;
        eq_a2_1 = grupoA[3]?.nombre; eq_a2_2 = grupoA[4]?.nombre;
        eq_a3_1 = grupoA[1]?.nombre; eq_a3_2 = grupoA[6]?.nombre;
        eq_a4_1 = grupoA[2]?.nombre; eq_a4_2 = grupoA[5]?.nombre;

        eq_b1_1 = grupoB[0]?.nombre; eq_b1_2 = grupoB[7]?.nombre;
        eq_b2_1 = grupoB[3]?.nombre; eq_b2_2 = grupoB[4]?.nombre;
        eq_b3_1 = grupoB[1]?.nombre; eq_b3_2 = grupoB[6]?.nombre;
        eq_b4_1 = grupoB[2]?.nombre; eq_b4_2 = grupoB[5]?.nombre;
    }

    // Calcular ganadores dinámicamente
    const gan_a1 = obtenerGanadorLlave(eq_a1_1, eq_a1_2, "a1");
    const gan_a2 = obtenerGanadorLlave(eq_a2_1, eq_a2_2, "a2");
    const gan_a3 = obtenerGanadorLlave(eq_a3_1, eq_a3_2, "a3");
    const gan_a4 = obtenerGanadorLlave(eq_a4_1, eq_a4_2, "a4");

    const gan_b1 = obtenerGanadorLlave(eq_b1_1, eq_b1_2, "b1");
    const gan_b2 = obtenerGanadorLlave(eq_b2_1, eq_b2_2, "b2");
    const gan_b3 = obtenerGanadorLlave(eq_b3_1, eq_b3_2, "b3");
    const gan_b4 = obtenerGanadorLlave(eq_b4_1, eq_b4_2, "b4");

    const gan_ca1 = (gan_a1 && gan_a2) ? obtenerGanadorLlave(gan_a1, gan_a2, "ca1") : "";
    const gan_ca2 = (gan_a3 && gan_a4) ? obtenerGanadorLlave(gan_a3, gan_a4, "ca2") : "";
    const gan_cb1 = (gan_b1 && gan_b2) ? obtenerGanadorLlave(gan_b1, gan_b2, "cb1") : "";
    const gan_cb2 = (gan_b3 && gan_b4) ? obtenerGanadorLlave(gan_b3, gan_b4, "cb2") : "";

    const finalista_A = (gan_ca1 && gan_ca2) ? obtenerGanadorLlave(gan_ca1, gan_ca2, "sa1") : "";
    const finalista_B = (gan_cb1 && gan_cb2) ? obtenerGanadorLlave(gan_cb1, gan_cb2, "sb1") : "";
    const campeon_final = (finalista_A && finalista_B) ? obtenerGanadorLlave(finalista_A, finalista_B, "final") : "";

    // Etiquetas dinámicas para visualización
    const lbl = isClausura 
        ? ["1º vs 16º", "7º vs 10º", "5º vs 12º", "3º vs 14º", "2º vs 15º", "8º vs 9º", "6º vs 11º", "4º vs 13º"] 
        : ["Llave A1", "Llave A2", "Llave A3", "Llave A4", "Llave B1", "Llave B2", "Llave B3", "Llave B4"];

     // Formatear el texto de la categoría para la marca de agua
    let categoriaFondo = "1° DIVISIÓN";
    if (categoriaActual === "sub20") categoriaFondo = "SUB-20";
    if (categoriaActual === "sub17") categoriaFondo = "SUB-17";

    // Actualizar el indicador externo en el HTML
    const indicadorPlayoffs = document.getElementById('categoria-playoffs');
    if (indicadorPlayoffs) {
        indicadorPlayoffs.innerText = categoriaFondo;
    }

    contCuadro.innerHTML = `
        <div class="relative w-full overflow-hidden rounded-3xl">
            
            <!-- LOGO (Arriba al centro, sin texto de categoría) -->
            <div class="absolute top-0 md:top-2 left-0 right-0 flex flex-col items-center justify-start opacity-15 pointer-events-none z-0 select-none origin-top scale-75 md:scale-90">
                <div class="bg-emerald-600 p-4 md:p-5 rounded-3xl shadow-lg mb-3 mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white w-12 h-12 md:w-16 md:h-16"><path d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9"></path><path d="M7.8 4.7a6.14 6.14 0 0 0-.8 7.5"></path><circle cx="12" cy="9" r="2"></circle><path d="M16.2 4.8c2 2 2.26 5.11.8 7.47"></path><path d="M19.1 1.9a9.96 9.96 0 0 1 0 14.1"></path><path d="M9.5 18h5"></path><path d="m8 22 4-11 4 11"></path></svg>
                </div>
                <div class="text-center">
                    <h1 class="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none text-white mb-2">
                        SUPER <span class="text-emerald-500">DEPORTIVO</span>
                    </h1>
                    <p class="text-base md:text-lg font-bold text-slate-500 uppercase tracking-[0.3em] italic">CERRITO • Entre Ríos</p>
                </div>
            </div>

            <!-- CUADRO DE LLAVES ORIGINAL -->
            <div class="relative z-10 flex flex-row justify-between items-stretch w-full min-w-[1100px] py-6 px-2 gap-4">
                
                <!-- OCTAVOS LADO A -->
                <div class="flex flex-col justify-between w-[14%] gap-3">
                    <h4 class="text-center text-yellow-500 font-black text-[9px] uppercase mb-2 italic">Octavos A</h4>
                    ${crearTarjetaPartido(eq_a1_1, eq_a1_2, "a1", lbl[0])}
                    ${crearTarjetaPartido(eq_a2_1, eq_a2_2, "a2", lbl[1])}
                    <div class="h-4"></div>
                    ${crearTarjetaPartido(eq_a3_1, eq_a3_2, "a3", lbl[2])}
                    ${crearTarjetaPartido(eq_a4_1, eq_a4_2, "a4", lbl[3])}
                </div>

                <!-- CUARTOS LADO A -->
                <div class="flex flex-col justify-around w-[14%] py-12 gap-3">
                    ${crearTarjetaPartido(gan_a1, gan_a2, "ca1", "Cuartos A1")}
                    ${crearTarjetaPartido(gan_a3, gan_a4, "ca2", "Cuartos A2")}
                </div>

                <!-- SEMIFINAL LADO A -->
                <div class="flex flex-col justify-center w-[14%] py-24 gap-3">
                    ${crearTarjetaPartido(gan_ca1, gan_ca2, "sa1", "Semi A")}
                </div>

                <!-- FINAL (CENTRO) -->
                <div class="flex flex-col items-center justify-center w-[16%] gap-4 z-10 px-1 pt-32">
                    <div class="w-full">
                        ${crearTarjetaPartido(finalista_A, finalista_B, "final", "FINAL")}
                    </div>
                    <div class="w-full p-4 bg-gradient-to-b from-yellow-500/30 via-slate-900 to-slate-950 border-2 border-yellow-500 rounded-2xl shadow-2xl text-center">
                        <p class="text-[7px] text-yellow-500 font-black tracking-widest uppercase mb-1 italic">👑 CAMPEÓN 👑</p>
                        <div class="text-[11px] lg:text-[12px] font-black text-white uppercase truncate drop-shadow-md">
                            ${campeon_final && campeon_final.trim() !== "" ? campeon_final : "— POR DEFINIR —"}
                        </div>
                    </div>
                </div>

                <!-- SEMIFINAL LADO B -->
                <div class="flex flex-col justify-center w-[14%] py-24 gap-3">
                    ${crearTarjetaPartido(gan_cb1, gan_cb2, "sb1", "Semi B")}
                </div>

                <!-- CUARTOS LADO B -->
                <div class="flex flex-col justify-around w-[14%] py-12 gap-3">
                    ${crearTarjetaPartido(gan_cb1, gan_cb2, "cb1", "Cuartos B1")}
                    ${crearTarjetaPartido(gan_b3, gan_b4, "cb2", "Cuartos B2")}
                </div>

                <!-- OCTAVOS LADO B -->
                <div class="flex flex-col justify-between w-[14%] gap-3">
                    <h4 class="text-center text-emerald-400 font-black text-[9px] uppercase mb-2 italic">Octavos B</h4>
                    ${crearTarjetaPartido(eq_b1_1, eq_b1_2, "b1", lbl[4])}
                    ${crearTarjetaPartido(eq_b2_1, eq_b2_2, "b2", lbl[5])}
                    <div class="h-4"></div>
                    ${crearTarjetaPartido(eq_b3_1, eq_b3_2, "b3", lbl[6])}
                    ${crearTarjetaPartido(eq_b4_1, eq_b4_2, "b4", lbl[7])}
                </div>
                
            </div>
        </div>`;
}

// 8. RENDERIZADO DE SPONSORS (CARRUSEL Y GRID)
function renderizarSponsors() {
    if (typeof SPONSORS === 'undefined' || !SPONSORS.length) return;

    // A) Carrusel Superior Infinito
    const carrusel = document.getElementById('sponsors-carousel');
    if (carrusel) {
        // Duplicamos el array para lograr el efecto de scroll infinito sin saltos
        const listaDuplicada = [...SPONSORS, ...SPONSORS];
        carrusel.innerHTML = listaDuplicada.map(s => `
            <div class="carousel-item flex items-center justify-center bg-slate-900/80 border border-white/5 rounded-xl p-2 px-4 shadow-md">
                <img src="${s.logo}" alt="${s.nombre}" class="h-8 md:h-10 object-contain max-w-[120px]" onerror="this.src='public/img/escudos/generico.png'">
            </div>
        `).join('');
    }

    // B) Grilla Inferior de Auspiciantes
    const grid = document.getElementById('sponsors-grid');
    if (grid) {
        grid.innerHTML = SPONSORS.map(s => `
            <div class="bg-slate-900/60 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:border-emerald-500/30 transition-all group">
                <div class="h-16 w-full flex items-center justify-center overflow-hidden">
                    <img src="${s.logo}" alt="${s.nombre}" class="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300" onerror="this.style.display='none'">
                </div>
                <p class="text-[9px] font-black uppercase tracking-wider text-slate-400 text-center leading-tight line-clamp-2">${s.nombre}</p>
            </div>
        `).join('');
    }
}

// 9. DISPARADOR AL CARGAR LA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();
    renderizar();
    renderizarSponsors(); // 🚀 AGREGAMOS ESTA LÍNEA ACÁ
});


// Función para navegar suavemente a cualquier sección desde el índice
function irASeccion(idSeccion) {
    const seccion = document.getElementById(idSeccion);
    
    if (seccion) {
        // Desplazamiento suave con un pequeño margen para no tapar el encabezado
        seccion.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        console.warn(`No se encontró la sección con el ID: ${idSeccion}`);
    }
}