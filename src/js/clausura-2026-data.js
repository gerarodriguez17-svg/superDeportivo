// DATA Y RESULTADOS DEL TORNEO CLAUSURA 2026

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

const MODO_TORNEO = 'CLAUSURA';

const NORTE_DATA = {
    primera: {
        "1": { partidos: [{ L: "Deportivo Tuyango", V: "Atlético Hernandarias", R: "1-0" }, { L: "Independiente FC", V: "J. Unida de Bovril", R: "1-0" }, { L: "Union Alcaraz", V: "U. Agrarios Cerrito", R: "0-0" }], libre: "Deportivo Bovril" },
        "2": { partidos: [{ L: "Deportivo Bovril", V: "Atlético Hernandarias", R: "0-2" }, { L: "U. Agrarios Cerrito", V: "Deportivo Tuyango", R: "0-1" }, { L: "J. Unida de Bovril", V: "Union Alcaraz", R: "1-1" }], libre: "Independiente FC" },
        "3": { partidos: [{ L: "Union Alcaraz", V: "Independiente FC", R: "4-0" }, { L: "Deportivo Bovril", V: "U. Agrarios Cerrito", R: "1-3" }, { L: "Deportivo Tuyango", V: "J. Unida de Bovril", R: "2-1" }], libre: "Atlético Hernandarias" },
        "4": { partidos: [{ L: "U. Agrarios Cerrito", V: "Atlético Hernandarias", R: "3-1" }, { L: "Independiente FC", V: "Deportivo Tuyango", R: "0-2" }, { L: "J. Unida de Bovril", V: "Deportivo Bovril", R: "0-0" }], libre: "Union Alcaraz" },
        "5": { partidos: [{ L: "Deportivo Bovril", V: "Independiente FC", R: "1-1" }, { L: "Atlético Hernandarias", V: "J. Unida de Bovril", R: "4-0" }, { L: "Deportivo Tuyango", V: "Union Alcaraz", R: "0-0" }], libre: "U. Agrarios Cerrito" },
        "6": { partidos: [{ L: "Independiente FC", V: "Atlético Hernandarias", R: "0-1" }, { L: "J. Unida de Bovril", V: "U. Agrarios Cerrito", R: "0-1" }, { L: "Union Alcaraz", V: "Deportivo Bovril", R: "0-1" }], libre: "Deportivo Tuyango" },
        "7": { partidos: [{ L: "U. Agrarios Cerrito", V: "Independiente FC", R: "5-2" }, { L: "Atlético Hernandarias", V: "Union Alcaraz", R: "3-3" }, { L: "Deportivo Bovril", V: "Deportivo Tuyango", R: "5-1" }], libre: "J. Unida de Bovril" }
    },
    sub20: {
        "1": { partidos: [{ L: "Independiente FC", V: "J. Unida de Bovril", R: "1-0" }, { L: "Deportivo Tuyango", V: "Atlético Hernandarias", R: "1-0" }, { L: "Union Alcaraz", V: "U. Agrarios Cerrito", R: "1-0" }], libre: "Deportivo Bovril" },
        "2": { partidos: [{ L: "Deportivo Bovril", V: "Atlético Hernandarias", R: "1-0" }, { L: "J. Unida de Bovril", V: "Union Alcaraz", R: "1-0" }, { L: "U. Agrarios Cerrito", V: "Deportivo Tuyango", R: "2-2" }], libre: "Independiente FC" },
        "3": { partidos: [{ L: "Union Alcaraz", V: "Independiente FC", R: "0-1" }, { L: "Deportivo Bovril", V: "U. Agrarios Cerrito", R: "0-1" }, { L: "Deportivo Tuyango", V: "J. Unida de Bovril", R: "1-0" }], libre: "Atlético Hernandarias" },
        "4": { partidos: [{ L: "U. Agrarios Cerrito", V: "Atlético Hernandarias", R: "1-1" }, { L: "Independiente FC", V: "Deportivo Tuyango", R: "3-1" }, { L: "J. Unida de Bovril", V: "Deportivo Bovril", R: "0-0" }], libre: "Union Alcaraz" },
        "5": { partidos: [{ L: "Deportivo Bovril", V: "Independiente FC", R: "1-1" }, { L: "Atlético Hernandarias", V: "J. Unida de Bovril", R: "0-0" }, { L: "Deportivo Tuyango", V: "Union Alcaraz", R: "2-1" }], libre: "U. Agrarios Cerrito" },
        "6": { partidos: [{ L: "Independiente FC", V: "Atlético Hernandarias", R: "3-0" }, { L: "J. Unida de Bovril", V: "U. Agrarios Cerrito", R: "0-0" }, { L: "Deportivo Bovril", V: "Union Alcaraz", R: "0-2" }], libre: "Deportivo Tuyango" },
        "7": { partidos: [{ L: "U. Agrarios Cerrito", V: "Independiente FC", R: "0-0" }, { L: "Atlético Hernandarias", V: "Union Alcaraz", R: "0-2" }, { L: "Deportivo Bovril", V: "Deportivo Tuyango", R: "0-0" }], libre: "J. Unida de Bovril" }
    },
    sub17: {
        "1": { partidos: [{ L: "Independiente FC", V: "J. Unida de Bovril", R: "2-1" }, { L: "Deportivo Tuyango", V: "Atlético Hernandarias", R: "2-0" }, { L: "Union Alcaraz", V: "U. Agrarios Cerrito", R: "0-2" }], libre: "Deportivo Bovril" },
        "2": { partidos: [{ L: "J. Unida de Bovril", V: "Union Alcaraz", R: "1-0" }, { L: "U. Agrarios Cerrito", V: "Deportivo Tuyango", R: "1-0" }, { L: "Deportivo Bovril", V: "Atlético Hernandarias", R: "3-0" }], libre: "Independiente FC" },
        "3": { partidos: [{ L: "Union Alcaraz", V: "Independiente FC", R: "0-0" }, { L: "Deportivo Bovril", V: "U. Agrarios Cerrito", R: "1-1" }, { L: "Deportivo Tuyango", V: "J. Unida de Bovril", R: "2-0" }], libre: "Atlético Hernandarias" },
        "4": { partidos: [{ L: "U. Agrarios Cerrito", V: "Atlético Hernandarias", R: "3-1" }, { L: "Independiente FC", V: "Deportivo Tuyango", R: "1-1" }, { L: "J. Unida de Bovril", V: "Deportivo Bovril", R: "0-0" }], libre: "Union Alcaraz" },
        "5": { partidos: [{ L: "Deportivo Bovril", V: "Independiente FC", R: "1-0" }, { L: "Atlético Hernandarias", V: "J. Unida de Bovril", R: "6-0" }, { L: "Deportivo Tuyango", V: "Union Alcaraz", R: "0-1" }], libre: "U. Agrarios Cerrito" },
        "6": { partidos: [{ L: "Independiente FC", V: "Atlético Hernandarias", R: "2-1" }, { L: "J. Unida de Bovril", V: "U. Agrarios Cerrito", R: "0-2" }, { L: "Union Alcaraz", V: "Deportivo Bovril", R: "1-2" }], libre: "Deportivo Tuyango" },
        "7": { partidos: [{ L: "U. Agrarios Cerrito", V: "Independiente FC", R: "2-0" }, { L: "Atlético Hernandarias", V: "Union Alcaraz", R: "1-0" }, { L: "Deportivo Bovril", V: "Deportivo Tuyango", R: "3-1" }], libre: "J. Unida de Bovril" }
    }
};

const CENTRO_DATA = {
    primera: {

        "1": { partidos: [{ L: "Segui FC", V: "Atlético Hasenkamp", R: "3-2" }, { L: "Juventud Sarmiento", V: "Litoral María Grande", R: "0-2" }, { L: "Escuela Diego Maradona", V: "Cañadita Central", R: "3-2" }], libre: "Atlético María Grande" },
        "2": { partidos: [{ L: "Atlético Hasenkamp", V: "Atlético María Grande", R: "0-1" }, { L: "Cañadita Central", V: "Segui FC", R: "3-1" }, { L: "Litoral María Grande", V: "Escuela Diego Maradona", R: "1-0" }], libre: "Juventud Sarmiento" },
        "3": { partidos: [{ L: "Escuela Diego Maradona", V: "Juventud Sarmiento", R: "1-1" }, { L: "Atlético María Grande", V: "Cañadita Central", R: "4-0" }, { L: "Segui FC", V: "Litoral María Grande", R: "1-3" }], libre: "Atlético Hasenkamp" },
        "4": { partidos: [{ L: "Cañadita Central", V: "Atlético Hasenkamp", R: "2-1" }, { L: "Juventud Sarmiento", V: "Segui FC", R: "0-5" }, { L: "Litoral María Grande", V: "Atlético María Grande", R: "0-0" }], libre: "Escuela Diego Maradona" },
        "5": { partidos: [{ L: "Atlético María Grande", V: "Juventud Sarmiento", R: "5-1" }, { L: "Atlético Hasenkamp", V: "Litoral María Grande", R: "0-3" }, { L: "Segui FC", V: "Escuela Diego Maradona", R: "0-1" }], libre: "Cañadita Central" },
        "6": { partidos: [{ L: "Juventud Sarmiento", V: "Atlético Hasenkamp", R: "2-0" }, { L: "Litoral María Grande", V: "Cañadita Central", R: "1-0" }, { L: "Escuela Diego Maradona", V: "Atlético María Grande", R: "0-1" }], libre: "Segui FC" },
        "7": { partidos: [{ L: "Cañadita Central", V: "Juventud Sarmiento", R: "4-1" }, { L: "Atlético Hasenkamp", V: "Escuela Diego Maradona", R: "1-1" }, { L: "Atlético María Grande", V: "Segui FC", R: "9-0" }], libre: "Litoral María Grande" }
    },
    sub20: {
        "1": { partidos: [{ L: "Segui FC", V: "Atlético Hasenkamp", R: "0-1" }, { L: "Juventud Sarmiento", V: "Litoral María Grande", R: "1-3" }, { L: "Escuela Diego Maradona", V: "Cañadita Central", R: "0-0" }], libre: "Atlético María Grande" },
        "2": { partidos: [{ L: "Atlético Hasenkamp", V: "Atlético María Grande", R: "1-0" }, { L: "Cañadita Central", V: "Segui FC", R: "2-1" }, { L: "Litoral María Grande", V: "Escuela Diego Maradona", R: "3-0" }], libre: "Juventud Sarmiento" },
        "3": { partidos: [{ L: "Escuela Diego Maradona", V: "Juventud Sarmiento", R: "0-2" }, { L: "Atlético María Grande", V: "Cañadita Central", R: "2-1" }, { L: "Segui FC", V: "Litoral María Grande", R: "0-1" }], libre: "Atlético Hasenkamp" },
        "4": { partidos: [{ L: "Cañadita Central", V: "Atlético Hasenkamp", R: "4-0" }, { L: "Juventud Sarmiento", V: "Segui FC", R: "0-0" }, { L: "Litoral María Grande", V: "Atlético María Grande", R: "1-0" }], libre: "Escuela Diego Maradona" },
        "5": { partidos: [{ L: "Atlético María Grande", V: "Juventud Sarmiento", R: "0-1" }, { L: "Atlético Hasenkamp", V: "Litoral María Grande", R: "1-3" }, { L: "Segui FC", V: "Escuela Diego Maradona", R: "2-0" }], libre: "Cañadita Central" },
        "6": { partidos: [{ L: "Juventud Sarmiento", V: "Atlético Hasenkamp", R: "0-1" }, { L: "Litoral María Grande", V: "Cañadita Central", R: "1-2" }, { L: "Escuela Diego Maradona", V: "Atlético María Grande", R: "1-3" }], libre: "Segui FC" },
        "7": { partidos: [{ L: "Cañadita Central", V: "Juventud Sarmiento", R: "5-1" }, { L: "Atlético Hasenkamp", V: "Escuela Diego Maradona", R: "3-2" }, { L: "Atlético María Grande", V: "Segui FC", R: "3-1" }], libre: "Litoral María Grande" }
    },
    sub17: {
        "1": { partidos: [{ L: "Segui FC", V: "Atlético Hasenkamp", R: "0-7" }, { L: "Juventud Sarmiento", V: "Litoral María Grande", R: "0-4"   }, { L: "Escuela Diego Maradona", V: "Cañadita Central", R: "1-1" }], libre: "Atlético María Grande" },
        "2": { partidos: [{ L: "Atlético Hasenkamp", V: "Atlético María Grande", R: "1-0" }, { L: "Cañadita Central", V: "Segui FC", R: "1-0" }, { L: "Litoral María Grande", V: "Escuela Diego Maradona", R: "4-0" }], libre: "Juventud Sarmiento" },
        "3": { partidos: [{ L: "Escuela Diego Maradona", V: "Juventud Sarmiento", R: "0-2" }, { L: "Atlético María Grande", V: "Cañadita Central", R: "2-0" }, { L: "Segui FC", V: "Litoral María Grande", R: "0-2" }], libre: "Atlético Hasenkamp" },
        "4": { partidos: [{ L: "Cañadita Central", V: "Atlético Hasenkamp", R: "1-5" }, { L: "Juventud Sarmiento", V: "Segui FC", R: "2-0" }, { L: "Litoral María Grande", V: "Atlético María Grande", R: "3-2" }], libre: "Escuela Diego Maradona" },
        "5": { partidos: [{ L: "Atlético María Grande", V: "Juventud Sarmiento", R: "0-1" }, { L: "Atlético Hasenkamp", V: "Litoral María Grande", R: "1-4" }, { L: "Segui FC", V: "Escuela Diego Maradona", R: "2-0" }], libre: "Cañadita Central" },
        "6": { partidos: [{ L: "Juventud Sarmiento", V: "Atlético Hasenkamp", R: "0-1" }, { L: "Litoral María Grande", V: "Cañadita Central", R: "1-0" }, { L: "Escuela Diego Maradona", V: "Atlético María Grande", R: "0-6" }], libre: "Segui FC" },
        "7": { partidos: [{ L: "Cañadita Central", V: "Juventud Sarmiento", R: "0-0" }, { L: "Atlético Hasenkamp", V: "Escuela Diego Maradona", R: "2-0" }, { L: "Atlético María Grande", V: "Segui FC", R: "12-0" }], libre: "Litoral María Grande" }
   }
};

const SUR_DATA = { 
    primera: {
        "1": { partidos: [{ L: "Sarmiento de Crespo", V: "Union de Viale", R: "1-0" }, { L: "Atlético Arsenal", V: "Union de Crespo", R: "2-2" }, { L: "Deportivo Tabossi", V: "Cultural de Crespo", R: "2-0" }], libre: "Viale Football Club" },
        "2": { partidos: [{ L: "Atlético Arsenal", V: "Sarmiento de Crespo", R: "2-0" }, { L: "Viale Football Club", V: "Deportivo Tabossi", R: "2-0" }, { L: "Union de Crespo", V: "Cultural de Crespo", R: "2-1" }], libre: "Union de Viale" },
        "3": { partidos: [{ L: "Cultural de Crespo", V: "Union de Viale", R: "3-0" }, { L: "Sarmiento de Crespo", V: "Viale Football Club", R: "0-4" }, { L: "Deportivo Tabossi", V: "Union de Crespo", R: "0-0" }], libre: "Atlético Arsenal" },
        "4": { partidos: [{ L: "Viale Football Club", V: "Atlético Arsenal", R: "3-1" }, { L: "Union de Viale", V: "Deportivo Tabossi", R: "1-2" }, { L: "Union de Crespo", V: "Sarmiento de Crespo", R: "1-1" }], libre: "Cultural de Crespo" },
        "5": { partidos: [{ L: "Deportivo Tabossi", V: "Atlético Arsenal", R: "2-4" }, { L: "Union de Viale", V: "Union de Crespo", R: "1-7" }, { L: "Cultural de Crespo", V: "Viale Football Club", R: "1-2" }], libre: "Sarmiento de Crespo" },
        "6": { partidos: [{ L: "Union de Viale", V: "Atlético Arsenal", R: "0-4" }, { L: "Union de Crespo", V: "Viale Football Club", R: "1-0" }, { L: "Cultural de Crespo", V: "Sarmiento de Crespo", R: "0-0" }], libre: "Deportivo Tabossi" },
        "7": { partidos: [{ L: "Viale Football Club", V: "Union de Viale", R: "6-0" }, { L: "Atlético Arsenal", V: "Cultural de Crespo", R: "0-0" }, { L: "Sarmiento de Crespo", V: "Deportivo Tabossi", R: "3-1" }], libre: "Union de Crespo" }
        }, 
    sub20: {
        "1": { partidos: [{ L: "Sarmiento de Crespo", V: "Union de Viale", R: "2-1" }, { L: "Atlético Arsenal", V: "Union de Crespo", R: "0-1" }, { L: "Deportivo Tabossi", V: "Cultural de Crespo", R: "2-1" }], libre: "Viale Football Club" },
        "2": { partidos: [{ L: "Atlético Arsenal", V: "Sarmiento de Crespo", R: "2-0" }, { L: "Viale Football Club", V: "Deportivo Tabossi", R: "1-0" }, { L: "Union de Crespo", V: "Cultural de Crespo", R: "2-0" }], libre: "Union de Viale" },
        "3": { partidos: [{ L: "Cultural de Crespo", V: "Union de Viale", R: "4-0" }, { L: "Sarmiento de Crespo", V: "Viale Football Club", R: "2-1" }, { L: "Deportivo Tabossi", V: "Union de Crespo", R: "0-1" }], libre: "Atlético Arsenal" },
        "4": { partidos: [{ L: "Viale Football Club", V: "Atlético Arsenal", R: "0-0" }, { L: "Union de Viale", V: "Deportivo Tabossi", R: "1-5" }, { L: "Union de Crespo", V: "Sarmiento de Crespo", R: "2-1" }], libre: "Cultural de Crespo" },
        "5": { partidos: [{ L: "Deportivo Tabossi", V: "Atlético Arsenal", R: "0-1" }, { L: "Union de Viale", V: "Union de Crespo", R: "0-6" }, { L: "Cultural de Crespo", V: "Viale Football Club", R: "3-1" }], libre: "Sarmiento de Crespo" },
        "6": { partidos: [{ L: "Union de Viale", V: "Atlético Arsenal", R: "0-4" }, { L: "Union de Crespo", V: "Viale Football Club", R: "3-2" }, { L: "Cultural de Crespo", V: "Sarmiento de Crespo", R: "2-2" }], libre: "Deportivo Tabossi" },
        "7": { partidos: [{ L: "Viale Football Club", V: "Union de Viale", R: "5-1" }, { L: "Atlético Arsenal", V: "Cultural de Crespo", R: "0-1" }, { L: "Sarmiento de Crespo", V: "Deportivo Tabossi", R: "1-0" }], libre: "Union de Crespo" }    
        }, 
    sub17: {
        "1": { partidos: [{ L: "Sarmiento de Crespo", V: "Union de Viale", R: "9-0" }, { L: "Atlético Arsenal", V: "Union de Crespo", R: "1-1" }, { L: "Deportivo Tabossi", V: "Cultural de Crespo", R: "0-1" }], libre: "Viale Football Club" },
        "2": { partidos: [{ L: "Atlético Arsenal", V: "Sarmiento de Crespo", R: "3-3" }, { L: "Viale Football Club", V: "Deportivo Tabossi", R: "1-1" }, { L: "Union de Crespo", V: "Cultural de Crespo", R: "3-0" }], libre: "Union de Viale" },
        "3": { partidos: [{ L: "Cultural de Crespo", V: "Union de Viale", R: "8-0" }, { L: "Sarmiento de Crespo", V: "Viale Football Club", R: "1-2" }, { L: "Deportivo Tabossi", V: "Union de Crespo", R: "0-3" }], libre: "Atlético Arsenal" },
        "4": { partidos: [{ L: "Viale Football Club", V: "Atlético Arsenal", R: "0-0" }, { L: "Union de Viale", V: "Deportivo Tabossi", R: "0-3" }, { L: "Union de Crespo", V: "Sarmiento de Crespo", R: "2-0" }], libre: "Cultural de Crespo" },
        "5": { partidos: [{ L: "Deportivo Tabossi", V: "Atlético Arsenal", R: "1-1" }, { L: "Union de Viale", V: "Union de Crespo", R: "0-7" }, { L: "Cultural de Crespo", V: "Viale Football Club", R: "0-0" }], libre: "Sarmiento de Crespo" },
        "6": { partidos: [{ L: "Union de Viale", V: "Atlético Arsenal", R: "0-7" }, { L: "Union de Crespo", V: "Viale Football Club", R: "2-0" }, { L: "Cultural de Crespo", V: "Sarmiento de Crespo", R: "2-1" }], libre: "Deportivo Tabossi" },
        "7": { partidos: [{ L: "Viale Football Club", V: "Union de Viale", R: "8-0" }, { L: "Atlético Arsenal", V: "Cultural de Crespo", R: "1-1" }, { L: "Sarmiento de Crespo", V: "Deportivo Tabossi", R: "0-0" }], libre: "Union de Crespo" }    
        } 

    };

const resultadosPlayoffs = {
    // ====================================================================
    // PRIMERA DIVISIÓN
    // ====================================================================
    
    // --- OCTAVOS DE FINAL ---
    // LADO A
    a1: { ida: ["5", "0"], vta: ["-", "-"], penales: ["-", "-"] }, // Juegan: 1º AT. MG. vs 16º CULT. CRESPO de la Tabla General
    a2: { ida: ["3", "3"], vta: ["-", "-"], penales: ["-", "-"] }, // Juegan: 7º ATL ARSENAL vs 10º  DEP BOVRIL de la Tabla General
    a3: { ida: ["0", "2"], vta: ["-", "-"], penales: ["-", "-"] }, // Juegan: 5º TUYANGO vs 12º SAR CRESPO de la Tabla General
    a4: { ida: ["1", "2"], vta: ["-", "-"], penales: ["-", "-"] }, // Juegan: 3º CUAC vs 14º TABOSSI de la Tabla General
    
    // LADO B
    b1: { ida: ["5", "0"], vta: ["-", "-"], penales: ["-", "-"] }, // Juegan: 2º VIALE vs 15º SEGUI de la Tabla General
    b2: { ida: ["0", "1"], vta: ["-", "-"], penales: ["-", "-"] }, // Juegan: 8º ATL HERNAND vs 9º CAÑADITA de la Tabla General
    b3: { ida: ["2", "1"], vta: ["-", "-"], penales: ["-", "-"] }, // Juegan: 6º UNION CRESPO vs 11º MARADONA de la Tabla General
    b4: { ida: ["5", "0"], vta: ["-", "-"], penales: ["-", "-"] }, // Juegan: 4º LITORAL MG vs 13º UNION ALCARAZ de la Tabla General

    // --- CUARTOS DE FINAL ---
    ca1: { ida: ["-", "-"], vta: ["-", "-"], penales: ["-", "-"] }, // Juegan: Ganador a1 vs Ganador a2
    ca2: { ida: ["-", "-"], vta: ["-", "-"], penales: ["-", "-"] }, // Juegan: Ganador a3 vs Ganador a4
    cb1: { ida: ["-", "-"], vta: ["-", "-"], penales: ["-", "-"] }, // Juegan: Ganador b1 vs Ganador b2
    cb2: { ida: ["-", "-"], vta: ["-", "-"], penales: ["-", "-"] }, // Juegan: Ganador b3 vs Ganador b4

    // --- SEMIFINALES ---
    sa1: { ida: ["-", "-"], vta: ["-", "-"], penales: ["-", "-"] }, // Juegan: Ganador ca1 vs Ganador ca2 (Finalista Lado A)
    sb1: { ida: ["-", "-"], vta: ["-", "-"], penales: ["-", "-"] }, // Juegan: Ganador cb1 vs Ganador cb2 (Finalista Lado B)

    // --- GRAN FINAL ---
    final: { ida: ["-", "-"], vta: ["-", "-"], penales: ["-", "-"] }, // Juegan: Ganador sa1 vs Ganador sb1


    // ====================================================================
    // SUB 17
    // ====================================================================
    
    // --- OCTAVOS DE FINAL ---
    sub17_a1: { ida: ["2", "1"], vta: ["-", "-"], penales: ["-", "-"] }, // 1º LITORAL vs 16º SARM CRESPO
    sub17_a2: { ida: ["0", "1"], vta: ["-", "-"], penales: ["-", "-"] }, // 7º SARMIENTO vs 10º ATL MG
    sub17_a3: { ida: ["1", "2"], vta: ["-", "-"], penales: ["-", "-"] }, // 5º BOVRIL vs 12º TUYANGO 
    sub17_a4: { ida: ["1", "0"], vta: ["-", "-"], penales: ["-", "-"] }, // 3º CUAC vs 14º TABOSSI
    
    sub17_b1: { ida: ["3", "0"], vta: ["-", "-"], penales: ["-", "-"] }, // 2º UNION CRESPO vs 15º CAÑADITA 
    sub17_b2: { ida: ["2", "0"], vta: ["-", "-"], penales: ["-", "-"] }, // 8º VIALE vs 9º INDEPENDIENTE
    sub17_b3: { ida: ["1", "0"], vta: ["-", "-"], penales: ["-", "-"] }, // 6º CULTURAL CRESPO vs 11º ATL ARSENAL 
    sub17_b4: { ida: ["3", "2"], vta: ["-", "-"], penales: ["-", "-"] }, // 4º ATL ARSENAL vs 13º ATL HERNANDARIAS

    // --- CUARTOS DE FINAL ---
    sub17_ca1: { ida: ["-", "-"], vta: ["-", "-"], penales: ["-", "-"] }, // Ganador a1 vs Ganador a2
    sub17_ca2: { ida: ["-", "-"], vta: ["-", "-"], penales: ["-", "-"] }, // Ganador a3 vs Ganador a4
    sub17_cb1: { ida: ["-", "-"], vta: ["-", "-"], penales: ["-", "-"] }, // Ganador b1 vs Ganador b2
    sub17_cb2: { ida: ["-", "-"], vta: ["-", "-"], penales: ["-", "-"] }, // Ganador b3 vs Ganador b4

    // --- SEMIFINALES ---
    sub17_sa1: { ida: ["-", "-"], vta: ["-", "-"], penales: ["-", "-"] }, // Ganador ca1 vs Ganador ca2
    sub17_sb1: { ida: ["-", "-"], vta: ["-", "-"], penales: ["-", "-"] }, // Ganador cb1 vs Ganador cb2

    // --- GRAN FINAL ---
    sub17_final: { ida: ["-", "-"], vta: ["-", "-"], penales: ["-", "-"] }, // Ganador sa1 vs Ganador sb1


    // ====================================================================
    // SUB 20
    // ====================================================================
    
    // --- OCTAVOS DE FINAL ---
    sub20_a1: { ida: ["4", "0"], vta: ["-", "-"], penales: ["-", "-"] }, // 1º UNION  vs 16º TABOSSI
    sub20_a2: { ida: ["4", "1"], vta: ["-", "-"], penales: ["-", "-"] }, // 7º ATL HASENK vs 10º SAR CRESPO
    sub20_a3: { ida: ["1", "2"], vta: ["-", "-"], penales: ["-", "-"] }, // 5º TUYANGO vs 12º CUAC
    sub20_a4: { ida: ["1", "0"], vta: ["-", "-"], penales: ["-", "-"] }, // 3º INDEPENDIENTE vs 14º JUV SARMIENTO
    
    sub20_b1: { ida: ["0", "0"], vta: ["-", "-"], penales: ["-", "-"] }, // 2º LITRORAL MG vs 15º BOVRIL
    sub20_b2: { ida: ["4", "0"], vta: ["-", "-"], penales: ["-", "-"] }, // 8º CULT CRESPO vs 9º UNION ALCARAZ
    sub20_b3: { ida: ["1", "0"], vta: ["-", "-"], penales: ["-", "-"] }, // 6º ATL ARSENAL vs 11º ATL MG
    sub20_b4: { ida: ["0", "1"], vta: ["-", "-"], penales: ["-", "-"] }, // 4º CAÑADITA vs 13º VIALE

    // --- CUARTOS DE FINAL ---
    sub20_ca1: { ida: ["-", "-"], vta: ["-", "-"], penales: ["-", "-"] }, // Ganador a1 vs Ganador a2
    sub20_ca2: { ida: ["-", "-"], vta: ["-", "-"], penales: ["-", "-"] }, // Ganador a3 vs Ganador a4
    sub20_cb1: { ida: ["-", "-"], vta: ["-", "-"], penales: ["-", "-"] }, // Ganador b1 vs Ganador b2
    sub20_cb2: { ida: ["-", "-"], vta: ["-", "-"], penales: ["-", "-"] }, // Ganador b3 vs Ganador b4

    // --- SEMIFINALES ---
    sub20_sa1: { ida: ["-", "-"], vta: ["-", "-"], penales: ["-", "-"] }, // Ganador ca1 vs Ganador ca2
    sub20_sb1: { ida: ["-", "-"], vta: ["-", "-"], penales: ["-", "-"] }, // Ganador cb1 vs Ganador cb2

    // --- GRAN FINAL ---
    sub20_final: { ida: ["-", "-"], vta: ["-", "-"], penales: ["-", "-"] }  // Ganador sa1 vs Ganador sb1
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