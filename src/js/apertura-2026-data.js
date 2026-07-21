// DATA Y RESULTADOS DEL TORNEO APERTURA 2026 (HISTORIAL CONGELADO)

const ESCUDOS_MAP = {
    "U. Agrarios Cerrito": "public/img/escudos/cuac.png",
    "Atlético Hernandarias": "public/img/escudos/cah.png",
    "J. Unida de Bovril": "public/img/escudos/juventudc.png",
    "Deportivo Tuyango": "public/img/escudos/tuyango.png",
    "Deportivo Bovril": "public/img/escudos/cdb.png",
    "Independiente FC": "public/img/escudos/ifbc.png",
    "Union Alcaraz": "public/img/escudos/ufc.png",
    "Atlético Hasenkamp": "public/img/escudos/cahr.png",
    "Litoral María Grande": "public/img/escudos/litoral.png",
    "Cañadita Central": "public/img/escudos/cacc.png",
    "Atlético María Grande": "public/img/escudos/camg.png",
    "Segui FC": "public/img/escudos/segui.png",
    "Escuela Diego Maradona": "public/img/escudos/maradona.png",
    "Juventud Sarmiento": "public/img/escudos/cjs.png",
    "Atlético Arsenal": "public/img/escudos/caa.png",
    "Viale Football Club": "public/img/escudos/viale.png",
    "Sarmiento de Crespo": "public/img/escudos/sarmientoc.png",
    "Union de Crespo": "public/img/escudos/unionc.png",
    "Deportivo Tabossi": "public/img/escudos/cadt.png",
    "Cultural de Crespo": "public/img/escudos/culturalc.png",
    "Union de Viale": "public/img/escudos/unionviale.jpg" 
};

const EQUIPOS_CENTRO = ["Litoral María Grande", "Cañadita Central", "Atlético María Grande", "Atlético Hasenkamp", "Segui FC", "Escuela Diego Maradona", "Juventud Sarmiento"];
const EQUIPOS_NORTE = ["J. Unida de Bovril", "Deportivo Tuyango", "U. Agrarios Cerrito", "Atlético Hernandarias", "Deportivo Bovril", "Independiente FC", "Union Alcaraz"];
const EQUIPOS_SUR = ["Atlético Arsenal", "Viale Football Club", "Sarmiento de Crespo", "Union de Crespo", "Deportivo Tabossi", "Cultural de Crespo", "Union de Viale"];

const NORTE_DATA = {
    primera: {
        "1": { partidos: [{ L: "Atlético Hernandarias", V: "Deportivo Tuyango", R: "0-3" }, { L: "J. Unida de Bovril", V: "Independiente FC", R: "2-0" }, { L: "U. Agrarios Cerrito", V: "Union Alcaraz", R: "4-2" }], libre: "Deportivo Bovril" },
        "2": { partidos: [{ L: "Deportivo Bovril", V: "Atlético Hernandarias", R: "2-3" }, { L: "Deportivo Tuyango", V: "U. Agrarios Cerrito", R: "2-1" }, { L: "Union Alcaraz", V: "J. Unida de Bovril", R: "0-3" }], libre: "Independiente FC" },
        "3": { partidos: [{ L: "Independiente FC", V: "Union Alcaraz", R: "2-0" }, { L: "U. Agrarios Cerrito", V: "Deportivo Bovril", R: "3-1" }, { L: "J. Unida de Bovril", V: "Deportivo Tuyango", R: "1-1" }], libre: "Atlético Hernandarias" },
        "4": { partidos: [{ L: "Atlético Hernandarias", V: "U. Agrarios Cerrito", R: "0-6" }, { L: "Deportivo Tuyango", V: "Independiente FC", R: "0-0" }, { L: "Deportivo Bovril", V: "J. Unida de Bovril", R: "0-0" }], libre: "Union Alcaraz" },
        "5": { partidos: [{ L: "Independiente FC", V: "Deportivo Bovril", R: "1-3" }, { L: "J. Unida de Bovril", V: "Atlético Hernandarias", R: "2-0" }, { L: "Union Alcaraz", V: "Deportivo Tuyango", R: "1-2" }], libre: "U. Agrarios Cerrito" },
        "6": { partidos: [{ L: "Atlético Hernandarias", V: "Independiente FC", R: "1-3" }, { L: "U. Agrarios Cerrito", V: "J. Unida de Bovril", R: "1-0" }, { L: "Deportivo Bovril", V: "Union Alcaraz", R: "1-1" }], libre: "Deportivo Tuyango" },
        "7": { partidos: [{ L: "Independiente FC", V: "U. Agrarios Cerrito", R: "0-1" }, { L: "Union Alcaraz", V: "Atlético Hernandarias", R: "2-1" }, { L: "Deportivo Tuyango", V: "Deportivo Bovril", R: "1-1" }], libre: "J. Unida de Bovril" }
    },
    sub20: {
        "1": { partidos: [{ L: "J. Unida de Bovril", V: "Independiente FC", R: "0-1" }, { L: "Atlético Hernandarias", V: "Deportivo Tuyango", R: "0-0" }, { L: "U. Agrarios Cerrito", V: "Union Alcaraz", R: "3-1" }], libre: "Deportivo Bovril" },
        "2": { partidos: [{ L: "Deportivo Bovril", V: "Atlético Hernandarias", R: "0-0" }, { L: "Union Alcaraz", V: "J. Unida de Bovril", R: "0-3" }, { L: "Deportivo Tuyango", V: "U. Agrarios Cerrito", R: "1-0" }], libre: "Independiente FC" },
        "3": { partidos: [{ L: "Independiente FC", V: "Union Alcaraz", R: "2-2" }, { L: "U. Agrarios Cerrito", V: "Deportivo Bovril", R: "4-4" }, { L: "J. Unida de Bovril", V: "Deportivo Tuyango", R: "0-0" }], libre: "Atlético Hernandarias" },
        "4": { partidos: [{ L: "Atlético Hernandarias", V: "U. Agrarios Cerrito", R: "1-2" }, { L: "Deportivo Tuyango", V: "Independiente FC", R: "1-1" }, { L: "Deportivo Bovril", V: "J. Unida de Bovril", R: "0-0" }], libre: "Union Alcaraz" },
        "5": { partidos: [{ L: "Independiente FC", V: "Deportivo Bovril", R: "1-3" }, { L: "J. Unida de Bovril", V: "Atlético Hernandarias", R: "1-0" }, { L: "Union Alcaraz", V: "Deportivo Tuyango", R: "1-0" }], libre: "U. Agrarios Cerrito" },
        "6": { partidos: [{ L: "Atlético Hernandarias", V: "Independiente FC", R: "0-2" }, { L: "U. Agrarios Cerrito", V: "J. Unida de Bovril", R: "1-1" }, { L: "Deportivo Bovril", V: "Union Alcaraz", R: "4-1" }], libre: "Deportivo Tuyango" },
        "7": { partidos: [{ L: "Independiente FC", V: "U. Agrarios Cerrito", R: "0-1" }, { L: "Union Alcaraz", V: "Atlético Hernandarias", R: "1-1" }, { L: "Deportivo Tuyango", V: "Deportivo Bovril", R: "0-0" }], libre: "J. Unida de Bovril" }
    },
    sub17: {
        "1": { partidos: [{ L: "J. Unida de Bovril", V: "Independiente FC", R: "2-0" }, { L: "Atlético Hernandarias", V: "Deportivo Tuyango", R: "0-2" }, { L: "U. Agrarios Cerrito", V: "Union Alcaraz", R: "4-1" }], libre: "Deportivo Bovril" },
        "2": { partidos: [{ L: "Union Alcaraz", V: "J. Unida de Bovril", R: "1-1" }, { L: "Deportivo Tuyango", V: "U. Agrarios Cerrito", R: "0-2" }, { L: "Atlético Hernandarias", V: "Deportivo Bovril", R: "0-2" }], libre: "Independiente FC" },
        "3": { partidos: [{ L: "Independiente FC", V: "Union Alcaraz", R: "0-1" }, { L: "U. Agrarios Cerrito", V: "Deportivo Bovril", R: "0-0" }, { L: "J. Unida de Bovril", V: "Deportivo Tuyango", R: "0-0" }], libre: "Atlético Hernandarias" },
        "4": { partidos: [{ L: "Atlético Hernandarias", V: "U. Agrarios Cerrito", R: "1-1" }, { L: "Deportivo Tuyango", V: "Independiente FC", R: "0-0" }, { L: "Deportivo Bovril", V: "J. Unida de Bovril", R: "3-0" }], libre: "Union Alcaraz" },
        "5": { partidos: [{ L: "Independiente FC", V: "Deportivo Bovril", R: "1-2" }, { L: "J. Unida de Bovril", V: "Atlético Hernandarias", R: "2-2" }, { L: "Union Alcaraz", V: "Deportivo Tuyango", R: "0-0" }], libre: "U. Agrarios Cerrito" },
        "6": { partidos: [{ L: "Atlético Hernandarias", V: "Independiente FC", R: "1-1" }, { L: "U. Agrarios Cerrito", V: "J. Unida de Bovril", R: "2-1" }, { L: "Deportivo Bovril", V: "Union Alcaraz", R: "2-1" }], libre: "Deportivo Tuyango" },
        "7": { partidos: [{ L: "Independiente FC", V: "U. Agrarios Cerrito", R: "2-0" }, { L: "Union Alcaraz", V: "Atlético Hernandarias", R: "0-0" }, { L: "Deportivo Tuyango", V: "Deportivo Bovril", R: "1-1" }], libre: "J. Unida de Bovril" }
    }
};


const CENTRO_DATA = {
    primera: {
        "1": { partidos: [{ L: "Atlético Hasenkamp", V: "Segui FC", R: "3-0" }, { L: "Litoral María Grande", V: "Juventud Sarmiento", R: "5-0" }, { L: "Cañadita Central", V: "Escuela Diego Maradona", R: "2-0" }], libre: "Atlético María Grande" },
        "2": { partidos: [{ L: "Atlético María Grande", V: "Atlético Hasenkamp", R: "2-1" }, { L: "Segui FC", V: "Cañadita Central", R: "0-2" }, { L: "Escuela Diego Maradona", V: "Litoral María Grande", R: "1-2" }], libre: "Juventud Sarmiento" },
        "3": { partidos: [{ L: "Juventud Sarmiento", V: "Escuela Diego Maradona", R: "1-0" }, { L: "Cañadita Central", V: "Atlético María Grande", R: "1-5" }, { L: "Litoral María Grande", V: "Segui FC", R: "3-1" }], libre: "Atlético Hasenkamp" },
        "4": { partidos: [{ L: "Atlético Hasenkamp", V: "Cañadita Central", R: "1-1" }, { L: "Segui FC", V: "Juventud Sarmiento", R: "2-2" }, { L: "Atlético María Grande", V: "Litoral María Grande", R: "1-0" }], libre: "Escuela Diego Maradona" },
        "5": { partidos: [{ L: "Juventud Sarmiento", V: "Atlético María Grande", R: "1-1" }, { L: "Litoral María Grande", V: "Atlético Hasenkamp", R: "3-0" }, { L: "Escuela Diego Maradona", V: "Segui FC", R: "1-0" }], libre: "Cañadita Central" },
        "6": { partidos: [{ L: "Atlético Hasenkamp", V: "Juventud Sarmiento", R: "0-0" }, { L: "Cañadita Central", V: "Litoral María Grande", R: "0-0" }, { L: "Atlético María Grande", V: "Escuela Diego Maradona", R: "2-0" }], libre: "Segui FC" },
        "7": { partidos: [{ L: "Juventud Sarmiento", V: "Cañadita Central", R: "2-3" }, { L: "Escuela Diego Maradona", V: "Atlético Hasenkamp", R: "2-0" }, { L: "Segui FC", V: "Atlético María Grande", R: "1-2" }], libre: "Litoral María Grande" }
    },
    sub20: {
        "1": { partidos: [{ L: "Cañadita Central", V: "Escuela Diego Maradona", R: "1-0" }, { L: "Litoral María Grande", V: "Juventud Sarmiento", R: "2-1" }, { L: "Atlético Hasenkamp", V: "Segui FC", R: "1-1" }], libre: "Atlético María Grande" },
        "2": { partidos: [{ L: "Segui FC", V: "Cañadita Central", R: "0-1" }, { L: "Atlético María Grande", V: "Atlético Hasenkamp", R: "4-0" }, { L: "Escuela Diego Maradona", V: "Litoral María Grande", R: "0-1" }], libre: "Juventud Sarmiento" },
        "3": { partidos: [{ L: "Juventud Sarmiento", V: "Escuela Diego Maradona", R: "1-4" }, { L: "Cañadita Central", V: "Atlético María Grande", R: "0-3" }, { L: "Litoral María Grande", V: "Segui FC", R: "6-0" }], libre: "Atlético Hasenkamp" },
        "4": { partidos: [{ L: "Atlético Hasenkamp", V: "Cañadita Central", R: "0-4" }, { L: "Segui FC", V: "Juventud Sarmiento", R: "6-1" }, { L: "Atlético María Grande", V: "Litoral María Grande", R: "0-0" }], libre: "Escuela Diego Maradona" },
        "5": { partidos: [{ L: "Juventud Sarmiento", V: "Atlético María Grande", R: "0-0" }, { L: "Litoral María Grande", V: "Atlético Hasenkamp", R: "2-0" }, { L: "Escuela Diego Maradona", V: "Segui FC", R: "2-1" }], libre: "Cañadita Central" },
        "6": { partidos: [{ L: "Atlético Hasenkamp", V: "Juventud Sarmiento", R: "2-1" }, { L: "Cañadita Central", V: "Litoral María Grande", R: "0-0" }, { L: "Atlético María Grande", V: "Escuela Diego Maradona", R: "0-0" }], libre: "Segui FC" },
        "7": { partidos: [{ L: "Juventud Sarmiento", V: "Cañadita Central", R: "1-4" }, { L: "Escuela Diego Maradona", V: "Atlético Hasenkamp", R: "1-2" }, { L: "Segui FC", V: "Atlético María Grande", R: "1-4" }], libre: "Litoral María Grande" }
    },
    sub17: {
        "1": { partidos: [{ L: "Cañadita Central", V: "Escuela Diego Maradona", R: "1-1" }, { L: "Litoral María Grande", V: "Juventud Sarmiento", R: "2-0" }, { L: "Atlético Hasenkamp", V: "Segui FC", R: "5-0" }], libre: "Atlético María Grande" },
        "2": { partidos: [{ L: "Atlético María Grande", V: "Atlético Hasenkamp", R: "2-0" }, { L: "Escuela Diego Maradona", V: "Litoral María Grande", R: "0-2" }, { L: "Segui FC", V: "Cañadita Central", R: "1-0" }], libre: "Juventud Sarmiento" },
        "3": { partidos: [{ L: "Juventud Sarmiento", V: "Escuela Diego Maradona", R: "1-1" }, { L: "Cañadita Central", V: "Atlético María Grande", R: "0-2" }, { L: "Litoral María Grande", V: "Segui FC", R: "5-1" }], libre: "Atlético Hasenkamp" },
        "4": { partidos: [{ L: "Atlético Hasenkamp", V: "Cañadita Central", R: "1-2" }, { L: "Segui FC", V: "Juventud Sarmiento", R: "2-2" }, { L: "Atlético María Grande", V: "Litoral María Grande", R: "2-0" }], libre: "Escuela Diego Maradona" },
        "5": { partidos: [{ L: "Juventud Sarmiento", V: "Atlético María Grande", R: "0-2" }, { L: "Litoral María Grande", V: "Atlético Hasenkamp", R: "3-0" }, { L: "Escuela Diego Maradona", V: "Segui FC", R: "3-0" }], libre: "Cañadita Central" },
        "6": { partidos: [{ L: "Atlético Hasenkamp", V: "Juventud Sarmiento", R: "2-0" }, { L: "Cañadita Central", V: "Litoral María Grande", R: "3-2" }, { L: "Atlético María Grande", V: "Escuela Diego Maradona", R: "3-0" }], libre: "Segui FC" },
        "7": { partidos: [{ L: "Juventud Sarmiento", V: "Cañadita Central", R: "1-1" }, { L: "Escuela Diego Maradona", V: "Atlético Hasenkamp", R: "1-1" }, { L: "Segui FC", V: "Atlético María Grande", R: "0-3" }], libre: "Litoral María Grande" }
    }
};

const SUR_DATA = { 
    primera: {
        "1": { partidos: [{ L: "Atlético Arsenal", V: "Deportivo Tabossi", R: "4-0" }, { L: "Union de Crespo", V: "Union de Viale", R: "7-0" }, { L: "Viale Football Club", V: "Cultural de Crespo", R: "5-1" }], libre: "Sarmiento de Crespo" },
        "2": { partidos: [{ L: "Sarmiento de Crespo", V: "Atlético Arsenal", R: "1-2" }, { L: "Deportivo Tabossi", V: "Viale Football Club", R: "1-3" }, { L: "Cultural de Crespo", V: "Union de Crespo", R: "1-0" }], libre: "Union de Viale" },
        "3": { partidos: [{ L: "Union de Viale", V: "Cultural de Crespo", R: "0-8" }, { L: "Viale Football Club", V: "Sarmiento de Crespo", R: "3-0" }, { L: "Union de Crespo", V: "Deportivo Tabossi", R: "3-0" }], libre: "Atlético Arsenal" },
        "4": { partidos: [{ L: "Atlético Arsenal", V: "Viale Football Club", R: "1-2" }, { L: "Deportivo Tabossi", V: "Union de Viale", R: "2-0" }, { L: "Sarmiento de Crespo", V: "Union de Crespo", R: "0-1" }], libre: "Cultural de Crespo" },
        "5": { partidos: [{ L: "Union de Viale", V: "Sarmiento de Crespo", R: "2-6" }, { L: "Union de Crespo", V: "Atlético Arsenal", R: "3-4" }, { L: "Cultural de Crespo", V: "Deportivo Tabossi", R: "6-0" }], libre: "Viale Football Club" },
        "6": { partidos: [{ L: "Atlético Arsenal", V: "Union de Viale", R: "2-1" }, { L: "Viale Football Club", V: "Union de Crespo", R: "1-0" }, { L: "Sarmiento de Crespo", V: "Cultural de Crespo", R: "1-1" }], libre: "Deportivo Tabossi" },
        "7": { partidos: [{ L: "Union de Viale", V: "Viale Football Club", R: "1-6" }, { L: "Cultural de Crespo", V: "Atlético Arsenal", R: "2-1" }, { L: "Deportivo Tabossi", V: "Sarmiento de Crespo", R: "0-3" }], libre: "Union de Crespo" }
    }, 
    sub20: {
        "1": { partidos: [{ L: "Viale Football Club", V: "Cultural de Crespo", R: "1-1" }, { L: "Atlético Arsenal", V: "Deportivo Tabossi", R: "2-0" }, { L: "Union de Crespo", V: "Union de Viale", R: "1-0" }], libre: "Sarmiento de Crespo" },
        "2": { partidos: [{ L: "Cultural de Crespo", V: "Union de Crespo", R: "3-2" }, { L: "Deportivo Tabossi", V: "Viale Football Club", R: "0-3" }, { L: "Sarmiento de Crespo", V: "Atlético Arsenal", R: "1-3" }], libre: "Union de Viale" },
        "3": { partidos: [{ L: "Union de Viale", V: "Cultural de Crespo", R: "0-3" }, { L: "Viale Football Club", V: "Sarmiento de Crespo", R: "3-1" }, { L: "Union de Crespo", V: "Deportivo Tabossi", R: "2-0" }], libre: "Atlético Arsenal" },
        "4": { partidos: [{ L: "Atlético Arsenal", V: "Viale Football Club", R: "1-2" }, { L: "Deportivo Tabossi", V: "Union de Viale", R: "5-1" }, { L: "Sarmiento de Crespo", V: "Union de Crespo", R: "2-4" }], libre: "Cultural de Crespo" },
        "5": { partidos: [{ L: "Union de Viale", V: "Sarmiento de Crespo", R: "2-5" }, { L: "Union de Crespo", V: "Atlético Arsenal", R: "2-3" }, { L: "Cultural de Crespo", V: "Deportivo Tabossi", R: "0-2" }], libre: "Viale Football Club" },
        "6": { partidos: [{ L: "Atlético Arsenal", V: "Union de Viale", R: "1-0" }, { L: "Viale Football Club", V: "Union de Crespo", R: "0-0" }, { L: "Sarmiento de Crespo", V: "Cultural de Crespo", R: "0-3" }], libre: "Deportivo Tabossi" },
        "7": { partidos: [{ L: "Union de Viale", V: "Viale Football Club", R: "0-3" }, { L: "Cultural de Crespo", V: "Atlético Arsenal", R: "3-3" }, { L: "Deportivo Tabossi", V: "Sarmiento de Crespo", R: "1-1" }], libre: "Union de Crespo" }
    }, 
    sub17: {
        "1": { partidos: [{ L: "Atlético Arsenal", V: "Deportivo Tabossi", R: "0-0" }, { L: "Union de Crespo", V: "Union de Viale", R: "12-0" }, { L: "Viale Football Club", V: "Cultural de Crespo", R: "1-0" }], libre: "Sarmiento de Crespo" },
        "2": { partidos: [{ L: "Sarmiento de Crespo", V: "Atlético Arsenal", R: "2-0" }, { L: "Cultural de Crespo", V: "Union de Crespo", R: "0-2" }, { L: "Deportivo Tabossi", V: "Viale Football Club", R: "0-2" }], libre: "Union de Viale" },
        "3": { partidos: [{ L: "Union de Viale", V: "Cultural de Crespo", R: "0-5" }, { L: "Viale Football Club", V: "Sarmiento de Crespo", R: "0-0" }, { L: "Union de Crespo", V: "Deportivo Tabossi", R: "3-1" }], libre: "Atlético Arsenal" },
        "4": { partidos: [{ L: "Atlético Arsenal", V: "Viale Football Club", R: "2-0" }, { L: "Deportivo Tabossi", V: "Union de Viale", R: "4-0" }, { L: "Sarmiento de Crespo", V: "Union de Crespo", R: "0-2" }], libre: "Cultural de Crespo" },
        "5": { partidos: [{ L: "Union de Viale", V: "Sarmiento de Crespo", R: "2-5" }, { L: "Union de Crespo", V: "Atlético Arsenal", R: "2-0" }, { L: "Cultural de Crespo", V: "Deportivo Tabossi", R: "1-1" }], libre: "Viale Football Club" },
        "6": { partidos: [{ L: "Atlético Arsenal", V: "Union de Viale", R: "4-0" }, { L: "Viale Football Club", V: "Union de Crespo", R: "0-1" }, { L: "Sarmiento de Crespo", V: "Cultural de Crespo", R: "1-3" }], libre: "Deportivo Tabossi" },
        "7": { partidos: [{ L: "Union de Viale", V: "Viale Football Club", R: "0-15" }, { L: "Cultural de Crespo", V: "Atlético Arsenal", R: "0-0" }, { L: "Deportivo Tabossi", V: "Sarmiento de Crespo", R: "1-0" }], libre: "Union de Crespo" }
    } 
};


const resultadosPlayoffs = {
    // ====================================================================
    // PRIMERA DIVISIÓN
    // ====================================================================
    // Octavos (Resultados actuales)
    a1: { ida: [1, 1], vta: [4, 0], penales: [0, 0] },
    a2: { ida: [3, 1], vta: [2, 0], penales: [0, 0] },
    a3: { ida: [0, 0], vta: [1, 0], penales: [0, 0] },
    a4: { ida: [3, 1], vta: [4, 0], penales: [0, 0] },
    b1: { ida: [1, 0], vta: [2, 1], penales: [0, 0] },
    b2: { ida: [1, 1], vta: [1, 1], penales: [0, 0] }, // Se define por penales si sigue igual
    b3: { ida: [0, 0], vta: [3, 0], penales: [0, 0] },
    b4: { ida: [3, 2], vta: [0, 0], penales: [0, 0] },

    // Cuartos de Final Primera (Usamos "-" para lo que NO se jugó)
    ca1: { ida: [2, 1], vta: ["4", "1"], penales: ["-", "-"] },
    ca2: { ida: [1, 0], vta: ["2", "2"], penales: ["-", "-"] },
    cb1: { ida: [3, 0], vta: ["8", "1"], penales: ["-", "-"] },
    cb2: { ida: [0, 0], vta: ["1", "1"], penales: ["5", "4"] },

    // Semifinales Primera
    sa1: { ida: ["1", "0"], vta: ["0", "1"], penales: ["7", "6"] },
    sb1: { ida: ["0", "0"], vta: ["2", "0"], penales: ["-", "-"] },

    // Gran Final Primera
    final: { ida: ["2", "3"], vta: ["2", "1"], penales: ["5", "4"] },


    // ====================================================================
    // SUB 17
    // ====================================================================
    sub17_a1: { ida: [2, 0], vta: [2, 0], penales: [0, 0] },
    sub17_a2: { ida: [0, 1], vta: [0, 2], penales: [0, 0] },
    sub17_a3: { ida: [5, 0], vta: [3, 1], penales: [0, 0] },
    sub17_a4: { ida: [3, 0], vta: [0, 1], penales: [0, 0] },
    sub17_b1: { ida: [3, 0], vta: [3, 0], penales: [0, 0] },
    sub17_b2: { ida: [1, 2], vta: [1, 0], penales: [0, 0] },
    sub17_b3: { ida: [2, 0], vta: [0, 0], penales: [0, 0] },
    sub17_b4: { ida: [0, 0], vta: [2, 0], penales: [0, 0] },

    // Cuartos de Final Sub-17
    sub17_ca1: { ida: [1, 0], vta: ["1", "0"], penales: ["-", "-"] },
    sub17_ca2: { ida: [1, 1], vta: ["0", "2"], penales: ["-", "-"] },
    sub17_cb1: { ida: [2, 0], vta: ["0", "0"], penales: ["-", "-"] },
    sub17_cb2: { ida: [0, 0], vta: ["1", "2"], penales: ["-", "-"] },

    // Semifinales Sub-17
    sub17_sa1: { ida: ["0", "1"], vta: ["2", "0"], penales: ["-", "-"] },
    sub17_sb1: { ida: ["1", "2"], vta: ["1", "1"], penales: ["-", "-"] },

    // Gran Final Sub-17
    sub17_final: { ida: ["1", "0"], vta: ["1", "0"], penales: ["-", "-"] },


    // ====================================================================
    // SUB 20
    // ====================================================================
    sub20_a1: { ida: [0, 2], vta: [1, 2], penales: [0, 0] },
    sub20_a2: { ida: [1, 2], vta: [1, 0], penales: [0, 0] },
    sub20_a3: { ida: [3, 0], vta: [1, 2], penales: [0, 0] },
    sub20_a4: { ida: [2, 0], vta: [1, 3], penales: [0, 0] },
    sub20_b1: { ida: [0, 0], vta: [1, 0], penales: [0, 0] },
    sub20_b2: { ida: [1, 1], vta: [1, 0], penales: [0, 0] },
    sub20_b3: { ida: [0, 1], vta: [2, 1], penales: [0, 0] },
    sub20_b4: { ida: [0, 5], vta: [1, 0], penales: [0, 0] },

    // Cuartos de Final Sub-20
    sub20_ca1: { ida: [1, 1], vta: ["3", "3"], penales: ["3", "1"] },
    sub20_ca2: { ida: [0, 0], vta: ["1", "1"], penales: ["4", "1"] },
    sub20_cb1: { ida: [0, 0], vta: ["3", "0"], penales: ["-", "-"] },
    sub20_cb2: { ida: [0, 1], vta: ["2", "0"], penales: ["-", "-"] },

    // Semifinales Sub-20
    sub20_sa1: { ida: ["0", "1"], vta: ["1", "2"], penales: ["-", "-"] },
    sub20_sb1: { ida: ["0", "1"], vta: ["1", "2"], penales: ["-", "-"] },

    // Gran Final Sub-20
    sub20_final: { ida: ["0", "0"], vta: ["1", "3"], penales: ["-", "-"] }
};

const SPONSORS = [
    { nombre: "DAR+, la tarjeta para comprar", logo: "public/img/sponsors/Dar+.jpg" },
    { nombre: "Municipalidad de Cerrito", logo: "public/img/sponsors/municipalidad.png" },
    { nombre: "YPF El Empalme", logo: "public/img/sponsors/ypf.png" },
    { nombre: "AUTOSERVICIO LA CALABAZA", logo: "public/img/sponsors/lacalabaza.png" },
    { nombre: "Masquito reparaciones", logo: "public/img/sponsors/masquito reparaciones.png" },
    { nombre: "HR-Netcom", logo: "public/img/sponsors/hrnetcom.jpg" },
    { nombre: "Corralon El Rafa", logo: "public/img/sponsors/el rafa.png" },
    { nombre: "Emi Pérez Motos", logo: "public/img/sponsors/emi perez motos.jpg" },
    { nombre: "APAPACHA-Pañalera", logo: "public/img/sponsors/apapacho.png" },
    { nombre: "FARMACIA PALACIOS", logo: "public/img/sponsors/farmacia palacios.jpg" },
    { nombre: "Don Charo AUTOSERVICIO", logo: "public/img/sponsors/doncharro.jpg" },
    { nombre: "Hielos Celestiales", logo: "public/img/sponsors/hielo.png" },
    { nombre: "Daniel Guetti Odontólogo", logo: "public/img/sponsors/DANI_GETTI.jpeg" },
    { nombre: "GM Service", logo: "public/img/sponsors/gm_service.jpeg" },
    { nombre: "Gimnasio HIT", logo: "public/img/sponsors/gimnasio_hit.jpeg" }
];