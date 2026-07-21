// ==========================================
// MOTOR PRINCIPAL DE DIBUJO Y NAVEGACIÓN (main.js)
// ==========================================

let zonaActual = 'norte';
let categoriaActual = 'primera';
let fechaActual = '7';

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
    <div class="flex flex-col w-full bg-slate-900/95 border border-white/10 rounded-xl shadow-xl mb-3 overflow-hidden">
        <div class="flex justify-between items-center px-2.5 py-1.5 bg-slate-950 border-b border-white/10">
            <span class="text-slate-400 font-black uppercase text-[8px] tracking-wider italic">${labelEtiqueta}</span>
            <span class="text-yellow-400 font-extrabold text-[9px] bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20 tracking-wide shadow-inner">
                I: ${res.ida[0]}-${res.ida[1]} &nbsp;|&nbsp; V: ${res.vta[0]}-${res.vta[1]}
            </span>
        </div>
        <div class="flex items-center justify-between p-2 border-b border-white/5">
            <div class="flex items-center gap-2 truncate">
                ${miniEscudo(p1)}
                <span class="text-[10px] font-black ${p1 ? 'text-slate-100' : 'text-slate-500'} uppercase truncate">${p1Abreviado}</span>
            </div>
            <span class="text-white font-black text-[11px]">${p1 ? g1 : ''} ${hayPenales && p1 ? `<span class="text-yellow-500 text-[8px]">(${res.penales[0]})</span>` : ''}</span>
        </div>
        <div class="flex items-center justify-between p-2">
            <div class="flex items-center gap-2 truncate">
                ${miniEscudo(p2)}
                <span class="text-[10px] font-black ${p2 ? 'text-slate-100' : 'text-slate-500'} uppercase truncate">${p2Abreviado}</span>
            </div>
            <span class="text-white font-black text-[11px]">${p2 ? g2 : ''} ${hayPenales && p2 ? `<span class="text-yellow-500 text-[8px]">(${res.penales[1]})</span>` : ''}</span>
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
            let bg = esTop5 ? 'bg-amber-500/10 border-amber-500/20' : 'bg-white/5 border-white/10';
            let txt = esTop5 ? 'text-amber-400' : 'text-slate-200';

            return `
                <div class="grid grid-cols-12 gap-1 items-center ${bg} p-3 mb-1 rounded-xl border transition-all">
                    <div class="col-span-1 ${esTop5 ? 'text-amber-500' : 'text-slate-500'} font-black text-[10px]">${i+1}</div>
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
                    <div class="col-span-1 text-right text-amber-500 font-black text-sm italic">${eq.pts}</div>
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

    // 1. Armamos la tabla de 16
    let tabla16Jerarquica = [];
    for (let i = 0; i < 6; i++) {
        let nivel = [tablaSurAjustada[i], tablaNorteAjustada[i], tablaCentroAjustada[i]].filter(Boolean);
        nivel.sort((a, b) => (b.pts/b.pj) - (a.pts/a.pj) || b.dg - a.dg);
        tabla16Jerarquica.push(...nivel);
    }
    const clasificados16 = tabla16Jerarquica.slice(0, 16);

    // 2. Armamos Grupos A y B
    const clasificadosSur = tablaSurAjustada.slice(0, 5);
    const clasificadosNorte = tablaNorteAjustada.slice(0, 5);
    const clasificadosCentro = tablaCentroAjustada.slice(0, 5);

    const centroParaA = clasificadosCentro.filter(eq => ["SEGUI", "CAÑADITA", "MARIA GRANDE", "LITORAL"].some(s => eq.nombre.toUpperCase().includes(s)));
    const centroParaB = clasificadosCentro.filter(eq => ["HASENKAMP", "SARMIENTO", "MARADONA"].some(h => eq.nombre.toUpperCase().includes(h)));

    let grupoA = [...clasificadosSur, ...centroParaA];
    let grupoB = [...clasificadosNorte, ...centroParaB];

    const ordenarG = (g) => g.sort((a,b) => (a.posicionZona || 99) - (b.posicionZona || 99) || ((b.pts/b.pj) - (a.pts/a.pj)) || b.dg - a.dg);
    grupoA = ordenarG(grupoA);
    grupoB = ordenarG(grupoB);

    const generarFila = (eq, i, colorClase) => {
        if (!eq) return '';
        const estiloBorde = `${colorClase.replace('text-', 'border-')} bg-white/5`;
        return `
        <div class="flex justify-between items-center p-2 mb-1 rounded border-l-2 ${estiloBorde} text-[10px] uppercase font-bold text-slate-200">
            <span class="flex items-center gap-3 truncate min-w-0">
                <span class="text-slate-500 w-3 font-black text-[8px] flex-shrink-0">${i+1}</span>
                <div class="w-6 h-6 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    ${obtenerEscudo(eq.nombre)}
                </div>
                <span class="truncate leading-tight">${eq.nombre}</span>
            </span> 
            <span class="text-amber-500 font-black text-[9px] ml-2">
                ${(eq.pts/eq.pj).toFixed(2)}
            </span>
        </div>`;
    };

    cont16.innerHTML = `
        <!-- COLUMNA IZQUIERDA: GENERAL 16 -->
        <div class="flex-[1.2] bg-black/20 p-4 rounded-xl border border-white/5">
            <div class="text-[10px] font-black text-white mb-4 tracking-widest border-b border-amber-500 pb-1 italic flex justify-between">
                <span>Orden de Mérito General</span>
                <span class="text-[8px] text-slate-500 font-normal">Posición + Promedio</span>
            </div>
            ${clasificados16.map((eq, i) => generarFila(eq, i, 'text-amber-500')).join('')}
        </div>

        <!-- COLUMNA DERECHA: GRUPOS A Y B -->
        <div class="flex-1 flex flex-col gap-4">
            <div class="bg-black/20 p-4 rounded-xl border border-white/5">
                <div class="text-[10px] font-black text-emerald-400 mb-2 tracking-widest border-b border-emerald-400/30 pb-1 italic">Grupo A (Sur/Centro)</div>
                ${grupoA.map((eq, i) => generarFila(eq, i, 'text-emerald-500')).join('')}
            </div>
            <div class="bg-black/20 p-4 rounded-xl border border-white/5">
                <div class="text-[10px] font-black text-blue-400 mb-2 tracking-widest border-b border-blue-400/30 pb-1 italic">Grupo B (Norte/Centro)</div>
                ${grupoB.map((eq, i) => generarFila(eq, i, 'text-blue-500')).join('')}
            </div>
        </div>`;
}

// 7. ARMAR GRUPOS Y CUADRO DE PLAYOFFS (COMPATIBLE CON CLAUSURA Y APERTURA)
function renderizarPlayoffs(tNorte, tCentro, tSur) {
    const contCuadro = document.getElementById('cuadro-render');
    if (!contCuadro) return;

    // 🚀 CONTROL CLAVE: Si el objeto de resultados de playoffs está vacío (Torneo recién empieza/Clausura)
    const hayPlayoffsCargados = typeof resultadosPlayoffs !== 'undefined' && Object.keys(resultadosPlayoffs).length > 0;

    let grupoA = [];
    let grupoB = [];

    if (hayPlayoffsCargados) {
        // --- LÓGICA PARA TORNEO EN FASE FINAL (APERTURA) ---
        const guardarPosicionOriginal = (tabla) => tabla.map((eq, ind) => ({ ...eq, posicionZona: ind + 1 }));
        let tablaNorteAjustada = guardarPosicionOriginal([...tNorte]);
        const tablaSurAjustada = guardarPosicionOriginal([...tSur]);
        const tablaCentroAjustada = guardarPosicionOriginal([...tCentro]);

        const cat = typeof categoriaActual !== 'undefined' ? categoriaActual.toUpperCase() : "PRIMERA";
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

        const clasificadosSur = tablaSurAjustada.slice(0, 5);
        const clasificadosNorte = tablaNorteAjustada.slice(0, 5);
        const clasificadosCentro = tablaCentroAjustada.slice(0, 5);

        const centroParaA = clasificadosCentro.filter(eq => ["SEGUI", "CAÑADITA", "MARIA GRANDE", "LITORAL"].some(s => eq.nombre.toUpperCase().includes(s)));
        const centroParaB = clasificadosCentro.filter(eq => ["HASENKAMP", "SARMIENTO", "MARADONA"].some(h => eq.nombre.toUpperCase().includes(h)));

        grupoA = [...clasificadosSur, ...centroParaA];
        grupoB = [...clasificadosNorte, ...centroParaB];

        const ordenarG = (g) => g.sort((a,b) => (a.posicionZona || 99) - (b.posicionZona || 99) || ((b.pts/b.pj) - (a.pts/a.pj)) || b.dg - a.dg);
        grupoA = ordenarG(grupoA);
        grupoB = ordenarG(grupoB);
    } else {
        // --- LÓGICA PARA INICIO DE TORNEO (CLAUSURA VACÍO) ---
        // Llenamos con objetos vacíos para no romper la lectura de índices [0], [7], etc.
        grupoA = Array(8).fill({ nombre: "" });
        grupoB = Array(8).fill({ nombre: "" });
    }

    // Calculamos ganadores (Si hayPlayoffsCargados es false, devolverán "" automáticamente)
    const gan_a1 = hayPlayoffsCargados ? obtenerGanadorLlave(grupoA[0]?.nombre, grupoA[7]?.nombre, "a1") : "";
    const gan_a2 = hayPlayoffsCargados ? obtenerGanadorLlave(grupoA[3]?.nombre, grupoA[4]?.nombre, "a2") : "";
    const gan_a3 = hayPlayoffsCargados ? obtenerGanadorLlave(grupoA[1]?.nombre, grupoA[6]?.nombre, "a3") : "";
    const gan_a4 = hayPlayoffsCargados ? obtenerGanadorLlave(grupoA[2]?.nombre, grupoA[5]?.nombre, "a4") : "";

    const gan_b1 = hayPlayoffsCargados ? obtenerGanadorLlave(grupoB[0]?.nombre, grupoB[7]?.nombre, "b1") : "";
    const gan_b2 = hayPlayoffsCargados ? obtenerGanadorLlave(grupoB[3]?.nombre, grupoB[4]?.nombre, "b2") : "";
    const gan_b3 = hayPlayoffsCargados ? obtenerGanadorLlave(grupoB[1]?.nombre, grupoB[6]?.nombre, "b3") : "";
    const gan_b4 = hayPlayoffsCargados ? obtenerGanadorLlave(grupoB[2]?.nombre, grupoB[5]?.nombre, "b4") : "";

    const gan_ca1 = (gan_a1 && gan_a2) ? obtenerGanadorLlave(gan_a1, gan_a2, "ca1") : "";
    const gan_ca2 = (gan_a3 && gan_a4) ? obtenerGanadorLlave(gan_a3, gan_a4, "ca2") : "";
    const gan_cb1 = (gan_b1 && gan_b2) ? obtenerGanadorLlave(gan_b1, gan_b2, "cb1") : "";
    const gan_cb2 = (gan_b3 && gan_b4) ? obtenerGanadorLlave(gan_b3, gan_b4, "cb2") : "";

    const finalista_A = (gan_ca1 && gan_ca2) ? obtenerGanadorLlave(gan_ca1, gan_ca2, "sa1") : "";
    const finalista_B = (gan_cb1 && gan_cb2) ? obtenerGanadorLlave(gan_cb1, gan_cb2, "sb1") : "";
    const campeon_final = (finalista_A && finalista_B) ? obtenerGanadorLlave(finalista_A, finalista_B, "final") : "";

    contCuadro.innerHTML = `
        <div class="grid grid-cols-7 gap-4 items-center min-w-[1300px] py-4 px-2">
            <div>
                <h4 class="text-center text-yellow-500 font-black text-[9px] uppercase mb-3 italic">Octavos A</h4>
                ${crearTarjetaPartido(grupoA[0]?.nombre, grupoA[7]?.nombre, "a1", "Llave A1")}
                ${crearTarjetaPartido(grupoA[3]?.nombre, grupoA[4]?.nombre, "a2", "Llave A2")}
                <div class="h-8"></div>
                ${crearTarjetaPartido(grupoA[1]?.nombre, grupoA[6]?.nombre, "a3", "Llave A3")}
                ${crearTarjetaPartido(grupoA[2]?.nombre, grupoA[5]?.nombre, "a4", "Llave A4")}
            </div>
            <div class="flex flex-col justify-around h-full py-10">
                ${crearTarjetaPartido(gan_a1, gan_a2, "ca1", "Cuartos A1")}
                ${crearTarjetaPartido(gan_a3, gan_a4, "ca2", "Cuartos A2")}
            </div>
            <div class="flex flex-col justify-center h-full py-20">
                ${crearTarjetaPartido(gan_ca1, gan_ca2, "sa1", "Semifinal A")}
            </div>
            <div class="flex flex-col items-center justify-center gap-6">
                <div class="w-full">
                    ${crearTarjetaPartido(finalista_A, finalista_B, "final", "GRAN FINAL")}
                </div>
                <div class="w-full p-5 bg-gradient-to-b from-yellow-500/30 via-slate-900 to-slate-950 border-2 border-yellow-500 rounded-3xl shadow-2xl text-center">
                    <p class="text-[7px] text-yellow-500 font-black tracking-widest uppercase mb-1 italic">👑 CAMPEÓN 👑</p>
                    <div class="text-[12px] font-black text-white uppercase truncate drop-shadow-md">
                        ${campeon_final && campeon_final.trim() !== "" ? campeon_final : "— POR DEFINIR —"}
                    </div>
                </div>
            </div>
            <div class="flex flex-col justify-center h-full py-20">
                ${crearTarjetaPartido(gan_cb1, gan_cb2, "sb1", "Semifinal B")}
            </div>
            <div class="flex flex-col justify-around h-full py-10">
                ${crearTarjetaPartido(gan_cb1, gan_cb2, "cb1", "Cuartos B1")}
                ${crearTarjetaPartido(gan_b3, gan_b4, "cb2", "Cuartos B2")}
            </div>
            <div>
                <h4 class="text-center text-emerald-400 font-black text-[9px] uppercase mb-3 italic">Octavos B</h4>
                ${crearTarjetaPartido(grupoB[0]?.nombre, grupoB[7]?.nombre, "b1", "Llave B1")}
                ${crearTarjetaPartido(grupoB[3]?.nombre, grupoB[4]?.nombre, "b2", "Llave B2")}
                <div class="h-8"></div>
                ${crearTarjetaPartido(grupoB[1]?.nombre, grupoB[6]?.nombre, "b3", "Llave B3")}
                ${crearTarjetaPartido(grupoB[2]?.nombre, grupoB[5]?.nombre, "b4", "Llave B4")}
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