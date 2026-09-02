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

const NORTE_DATA = {
    primera: {
        "1": { partidos: [{ L: "Deportivo Tuyango", V: "Atlético Hernandarias", R: "1-0" }, { L: "Independiente FC", V: "J. Unida de Bovril", R: "1-0" }, { L: "Union Alcaraz", V: "U. Agrarios Cerrito", R: "0-0" }], libre: "Deportivo Bovril" },
        "2": { partidos: [{ L: "Atlético Hernandarias", V: "Deportivo Bovril", R: "2-0" }, { L: "U. Agrarios Cerrito", V: "Deportivo Tuyango", R: "0-1" }, { L: "J. Unida de Bovril", V: "Union Alcaraz", R: "1-1" }], libre: "Independiente FC" },
        "3": { partidos: [{ L: "Union Alcaraz", V: "Independiente FC", R: "4-4" }, { L: "Deportivo Bovril", V: "U. Agrarios Cerrito", R: "1-3" }, { L: "Deportivo Tuyango", V: "J. Unida de Bovril", R: "2-1" }], libre: "Atlético Hernandarias" },
        "4": { partidos: [{ L: "U. Agrarios Cerrito", V: "Atlético Hernandarias", R: "" }, { L: "Independiente FC", V: "Deportivo Tuyango", R: "" }, { L: "J. Unida de Bovril", V: "Deportivo Bovril", R: "" }], libre: "Union Alcaraz" },
        "5": { partidos: [{ L: "Deportivo Bovril", V: "Independiente FC", R: "" }, { L: "Atlético Hernandarias", V: "J. Unida de Bovril", R: "" }, { L: "Deportivo Tuyango", V: "Union Alcaraz", R: "" }], libre: "U. Agrarios Cerrito" },
        "6": { partidos: [{ L: "Independiente FC", V: "Atlético Hernandarias", R: "" }, { L: "J. Unida de Bovril", V: "U. Agrarios Cerrito", R: "" }, { L: "Union Alcaraz", V: "Deportivo Bovril", R: "" }], libre: "Deportivo Tuyango" },
        "7": { partidos: [{ L: "U. Agrarios Cerrito", V: "Independiente FC", R: "" }, { L: "Atlético Hernandarias", V: "Union Alcaraz", R: "" }, { L: "Deportivo Bovril", V: "Deportivo Tuyango", R: "" }], libre: "J. Unida de Bovril" }
    },
    sub20: {
        "1": { partidos: [{ L: "Independiente FC", V: "J. Unida de Bovril", R: "1-0" }, { L: "Deportivo Tuyango", V: "Atlético Hernandarias", R: "1-0" }, { L: "Union Alcaraz", V: "U. Agrarios Cerrito", R: "1-0" }], libre: "Deportivo Bovril" },
        "2": { partidos: [{ L: "Atlético Hernandarias", V: "Deportivo Bovril", R: "0-1" }, { L: "J. Unida de Bovril", V: "Union Alcaraz", R: "1-0" }, { L: "U. Agrarios Cerrito", V: "Deportivo Tuyango", R: "2-2" }], libre: "Independiente FC" },
        "3": { partidos: [{ L: "Union Alcaraz", V: "Independiente FC", R: "0-1" }, { L: "Deportivo Bovril", V: "U. Agrarios Cerrito", R: "0-1" }, { L: "Deportivo Tuyango", V: "J. Unida de Bovril", R: "1-0" }], libre: "Atlético Hernandarias" },
        "4": { partidos: [{ L: "U. Agrarios Cerrito", V: "Atlético Hernandarias", R: "" }, { L: "Independiente FC", V: "Deportivo Tuyango", R: "" }, { L: "J. Unida de Bovril", V: "Deportivo Bovril", R: "" }], libre: "Union Alcaraz" },
        "5": { partidos: [{ L: "Deportivo Bovril", V: "Independiente FC", R: "" }, { L: "Atlético Hernandarias", V: "J. Unida de Bovril", R: "" }, { L: "Deportivo Tuyango", V: "Union Alcaraz", R: "" }], libre: "U. Agrarios Cerrito" },
        "6": { partidos: [{ L: "Independiente FC", V: "Atlético Hernandarias", R: "" }, { L: "J. Unida de Bovril", V: "U. Agrarios Cerrito", R: "" }, { L: "Union Alcaraz", V: "Deportivo Bovril", R: "" }], libre: "Deportivo Tuyango" },
        "7": { partidos: [{ L: "U. Agrarios Cerrito", V: "Independiente FC", R: "" }, { L: "Atlético Hernandarias", V: "Union Alcaraz", R: "" }, { L: "Deportivo Bovril", V: "Deportivo Tuyango", R: "" }], libre: "J. Unida de Bovril" }
    },
    sub17: {
        "1": { partidos: [{ L: "Independiente FC", V: "J. Unida de Bovril", R: "2-1" }, { L: "Deportivo Tuyango", V: "Atlético Hernandarias", R: "2-0" }, { L: "Union Alcaraz", V: "U. Agrarios Cerrito", R: "0-2" }], libre: "Deportivo Bovril" },
        "2": { partidos: [{ L: "J. Unida de Bovril", V: "Union Alcaraz", R: "3-0" }, { L: "U. Agrarios Cerrito", V: "Deportivo Tuyango", R: "1-0" }, { L: "Deportivo Bovril", V: "Atlético Hernandarias", R: "3-0" }], libre: "Independiente FC" },
        "3": { partidos: [{ L: "Union Alcaraz", V: "Independiente FC", R: "0-0" }, { L: "Deportivo Bovril", V: "U. Agrarios Cerrito", R: "1-1" }, { L: "Deportivo Tuyango", V: "J. Unida de Bovril", R: "2-0" }], libre: "Atlético Hernandarias" },
        "4": { partidos: [{ L: "U. Agrarios Cerrito", V: "Atlético Hernandarias", R: "" }, { L: "Independiente FC", V: "Deportivo Tuyango", R: "" }, { L: "J. Unida de Bovril", V: "Deportivo Bovril", R: "" }], libre: "Union Alcaraz" },
        "5": { partidos: [{ L: "Deportivo Bovril", V: "Independiente FC", R: "" }, { L: "Atlético Hernandarias", V: "J. Unida de Bovril", R: "" }, { L: "Deportivo Tuyango", V: "Union Alcaraz", R: "" }], libre: "U. Agrarios Cerrito" },
        "6": { partidos: [{ L: "Independiente FC", V: "Atlético Hernandarias", R: "" }, { L: "J. Unida de Bovril", V: "U. Agrarios Cerrito", R: "" }, { L: "Union Alcaraz", V: "Deportivo Bovril", R: "" }], libre: "Deportivo Tuyango" },
        "7": { partidos: [{ L: "U. Agrarios Cerrito", V: "Independiente FC", R: "" }, { L: "Atlético Hernandarias", V: "Union Alcaraz", R: "" }, { L: "Deportivo Bovril", V: "Deportivo Tuyango", R: "" }], libre: "J. Unida de Bovril" }
    }
};

const CENTRO_DATA = {
    primera: {

        "1": { partidos: [{ L: "Segui FC", V: "Atlético Hasenkamp", R: "3-2" }, { L: "Juventud Sarmiento", V: "Litoral María Grande", R: "0-2" }, { L: "Escuela Diego Maradona", V: "Cañadita Central", R: "3-2" }], libre: "Atlético María Grande" },
        "2": { partidos: [{ L: "Atlético Hasenkamp", V: "Atlético María Grande", R: "0-1" }, { L: "Cañadita Central", V: "Segui FC", R: "3-1" }, { L: "Litoral María Grande", V: "Escuela Diego Maradona", R: "1-0" }], libre: "Juventud Sarmiento" },
        "3": { partidos: [{ L: "Escuela Diego Maradona", V: "Juventud Sarmiento", R: "1-1" }, { L: "Atlético María Grande", V: "Cañadita Central", R: "4-0" }, { L: "Segui FC", V: "Litoral María Grande", R: "1-3" }], libre: "Atlético Hasenkamp" },
        "4": { partidos: [{ L: "Cañadita Central", V: "Atlético Hasenkamp", R: "" }, { L: "Juventud Sarmiento", V: "Segui FC", R: "" }, { L: "Litoral María Grande", V: "Atlético María Grande", R: "" }], libre: "Escuela Diego Maradona" },
        "5": { partidos: [{ L: "Atlético María Grande", V: "Juventud Sarmiento", R: "" }, { L: "Atlético Hasenkamp", V: "Litoral María Grande", R: " " }, { L: "Segui FC", V: "Escuela Diego Maradona", R: "" }], libre: "Cañadita Central" },
        "6": { partidos: [{ L: "Juventud Sarmiento", V: "Atlético Hasenkamp", R: "" }, { L: "Litoral María Grande", V: "Cañadita Central", R: "" }, { L: "Escuela Diego Maradona", V: "Atlético María Grande", R: "" }], libre: "Segui FC" },
        "7": { partidos: [{ L: "Cañadita Central", V: "Juventud Sarmiento", R: "" }, { L: "Atlético Hasenkamp", V: "Escuela Diego Maradona", R: "" }, { L: "Atlético María Grande", V: "Segui FC", R: "" }], libre: "Litoral María Grande" }
    },
    sub20: {
        "1": { partidos: [{ L: "Segui FC", V: "Atlético Hasenkamp", R: "0-1" }, { L: "Juventud Sarmiento", V: "Litoral María Grande", R: "1-3" }, { L: "Escuela Diego Maradona", V: "Cañadita Central", R: "0-0" }], libre: "Atlético María Grande" },
        "2": { partidos: [{ L: "Atlético Hasenkamp", V: "Atlético María Grande", R: "1-0" }, { L: "Cañadita Central", V: "Segui FC", R: "2-1" }, { L: "Litoral María Grande", V: "Escuela Diego Maradona", R: "3-0" }], libre: "Juventud Sarmiento" },
        "3": { partidos: [{ L: "Escuela Diego Maradona", V: "Juventud Sarmiento", R: "0-2" }, { L: "Atlético María Grande", V: "Cañadita Central", R: "2-1" }, { L: "Segui FC", V: "Litoral María Grande", R: "0-1" }], libre: "Atlético Hasenkamp" },
        "4": { partidos: [{ L: "Cañadita Central", V: "Atlético Hasenkamp", R: "" }, { L: "Juventud Sarmiento", V: "Segui FC", R: "" }, { L: "Litoral María Grande", V: "Atlético María Grande", R: "" }], libre: "Escuela Diego Maradona" },
        "5": { partidos: [{ L: "Atlético María Grande", V: "Juventud Sarmiento", R: "" }, { L: "Atlético Hasenkamp", V: "Litoral María Grande", R: " " }, { L: "Segui FC", V: "Escuela Diego Maradona", R: "" }], libre: "Cañadita Central" },
        "6": { partidos: [{ L: "Juventud Sarmiento", V: "Atlético Hasenkamp", R: "" }, { L: "Litoral María Grande", V: "Cañadita Central", R: "" }, { L: "Escuela Diego Maradona", V: "Atlético María Grande", R: "" }], libre: "Segui FC" },
        "7": { partidos: [{ L: "Cañadita Central", V: "Juventud Sarmiento", R: "" }, { L: "Atlético Hasenkamp", V: "Escuela Diego Maradona", R: "" }, { L: "Atlético María Grande", V: "Segui FC", R: "" }], libre: "Litoral María Grande" }
    },
    sub17: {
        "1": { partidos: [{ L: "Segui FC", V: "Atlético Hasenkamp", R: "0-7" }, { L: "Juventud Sarmiento", V: "Litoral María Grande", R: "0-4"   }, { L: "Escuela Diego Maradona", V: "Cañadita Central", R: "1-1" }], libre: "Atlético María Grande" },
        "2": { partidos: [{ L: "Atlético Hasenkamp", V: "Atlético María Grande", R: "1-0" }, { L: "Cañadita Central", V: "Segui FC", R: "1-0" }, { L: "Litoral María Grande", V: "Escuela Diego Maradona", R: "4-0" }], libre: "Juventud Sarmiento" },
        "3": { partidos: [{ L: "Escuela Diego Maradona", V: "Juventud Sarmiento", R: "0-2" }, { L: "Atlético María Grande", V: "Cañadita Central", R: "2-0" }, { L: "Segui FC", V: "Litoral María Grande", R: "0-2" }], libre: "Atlético Hasenkamp" },
        "4": { partidos: [{ L: "Cañadita Central", V: "Atlético Hasenkamp", R: "" }, { L: "Juventud Sarmiento", V: "Segui FC", R: "" }, { L: "Litoral María Grande", V: "Atlético María Grande", R: "" }], libre: "Escuela Diego Maradona" },
        "5": { partidos: [{ L: "Atlético María Grande", V: "Juventud Sarmiento", R: "" }, { L: "Atlético Hasenkamp", V: "Litoral María Grande", R: " " }, { L: "Segui FC", V: "Escuela Diego Maradona", R: "" }], libre: "Cañadita Central" },
        "6": { partidos: [{ L: "Juventud Sarmiento", V: "Atlético Hasenkamp", R: "" }, { L: "Litoral María Grande", V: "Cañadita Central", R: "" }, { L: "Escuela Diego Maradona", V: "Atlético María Grande", R: "" }], libre: "Segui FC" },
        "7": { partidos: [{ L: "Cañadita Central", V: "Juventud Sarmiento", R: "" }, { L: "Atlético Hasenkamp", V: "Escuela Diego Maradona", R: "" }, { L: "Atlético María Grande", V: "Segui FC", R: "" }], libre: "Litoral María Grande" }
   }
};

const SUR_DATA = { 
    primera: {
        "1": { partidos: [{ L: "Sarmiento de Crespo", V: "Union de Viale", R: "1-0" }, { L: "Atlético Arsenal", V: "Union de Crespo", R: "2-2" }, { L: "Deportivo Tabossi", V: "Cultural de Crespo", R: "2-0" }], libre: "Viale Football Club" },
        "2": { partidos: [{ L: "Atlético Arsenal", V: "Sarmiento de Crespo", R: "2-0" }, { L: "Viale Football Club", V: "Deportivo Tabossi", R: "2-0" }, { L: "Union de Crespo", V: "Cultural de Crespo", R: "2-1" }], libre: "Union de Viale" },
        "3": { partidos: [{ L: "Cultural de Crespo", V: "Union de Viale", R: "3-0" }, { L: "Sarmiento de Crespo", V: "Viale Football Club", R: "0-4" }, { L: "Deportivo Tabossi", V: "Union de Crespo", R: "0-0" }], libre: "Atlético Arsenal" },
        "4": { partidos: [{ L: "Viale Football Club", V: "Atlético Arsenal", R: "" }, { L: "Union de Viale", V: "Deportivo Tabossi", R: "" }, { L: "Union de Crespo", V: "Sarmiento de Crespo", R: "" }], libre: "Cultural de Crespo" },
        "5": { partidos: [{ L: "Deportivo Tabossi", V: "Atlético Arsenal", R: "" }, { L: "Union de Viale", V: "Union de Crespo", R: "" }, { L: "Cultural de Crespo", V: "Viale Football Club", R: "" }], libre: "Sarmiento de Crespo" },
        "6": { partidos: [{ L: "Union de Viale", V: "Atlético Arsenal", R: "" }, { L: "Union de Crespo", V: "Viale Football Club", R: "" }, { L: "Cultural de Crespo", V: "Sarmiento de Crespo", R: "" }], libre: "Deportivo Tabossi" },
        "7": { partidos: [{ L: "Viale Football Club", V: "Union de Viale", R: "" }, { L: "Atlético Arsenal", V: "Cultural de Crespo", R: "" }, { L: "Sarmiento de Crespo", V: "Deportivo Tabossi", R: "" }], libre: "Union de Crespo" }
        }, 
    sub20: {
        "1": { partidos: [{ L: "Sarmiento de Crespo", V: "Union de Viale", R: "2-1" }, { L: "Atlético Arsenal", V: "Union de Crespo", R: "0-1" }, { L: "Deportivo Tabossi", V: "Cultural de Crespo", R: "2-1" }], libre: "Viale Football Club" },
        "2": { partidos: [{ L: "Atlético Arsenal", V: "Sarmiento de Crespo", R: "2-0" }, { L: "Viale Football Club", V: "Deportivo Tabossi", R: "1-0" }, { L: "Union de Crespo", V: "Cultural de Crespo", R: "2-0" }], libre: "Union de Viale" },
        "3": { partidos: [{ L: "Cultural de Crespo", V: "Union de Viale", R: "4-0" }, { L: "Sarmiento de Crespo", V: "Viale Football Club", R: "2-1" }, { L: "Deportivo Tabossi", V: "Union de Crespo", R: "0-1" }], libre: "Atlético Arsenal" },
        "4": { partidos: [{ L: "Viale Football Club", V: "Atlético Arsenal", R: "" }, { L: "Union de Viale", V: "Deportivo Tabossi", R: "" }, { L: "Union de Crespo", V: "Sarmiento de Crespo", R: "" }], libre: "Cultural de Crespo" },
        "5": { partidos: [{ L: "Deportivo Tabossi", V: "Atlético Arsenal", R: "" }, { L: "Union de Viale", V: "Union de Crespo", R: "" }, { L: "Cultural de Crespo", V: "Viale Football Club", R: "" }], libre: "Sarmiento de Crespo" },
        "6": { partidos: [{ L: "Union de Viale", V: "Atlético Arsenal", R: "" }, { L: "Union de Crespo", V: "Viale Football Club", R: "" }, { L: "Cultural de Crespo", V: "Sarmiento de Crespo", R: "" }], libre: "Deportivo Tabossi" },
        "7": { partidos: [{ L: "Viale Football Club", V: "Union de Viale", R: "" }, { L: "Atlético Arsenal", V: "Cultural de Crespo", R: "" }, { L: "Sarmiento de Crespo", V: "Deportivo Tabossi", R: "" }], libre: "Union de Crespo" }    
        }, 
    sub17: {
        "1": { partidos: [{ L: "Sarmiento de Crespo", V: "Union de Viale", R: "9-0" }, { L: "Atlético Arsenal", V: "Union de Crespo", R: "1-1" }, { L: "Deportivo Tabossi", V: "Cultural de Crespo", R: "0-1" }], libre: "Viale Football Club" },
        "2": { partidos: [{ L: "Atlético Arsenal", V: "Sarmiento de Crespo", R: "3-3" }, { L: "Viale Football Club", V: "Deportivo Tabossi", R: "1-1" }, { L: "Union de Crespo", V: "Cultural de Crespo", R: "3-0" }], libre: "Union de Viale" },
        "3": { partidos: [{ L: "Cultural de Crespo", V: "Union de Viale", R: "" }, { L: "Sarmiento de Crespo", V: "Viale Football Club", R: "" }, { L: "Deportivo Tabossi", V: "Union de Crespo", R: "" }], libre: "Atlético Arsenal" },
        "4": { partidos: [{ L: "Viale Football Club", V: "Atlético Arsenal", R: "" }, { L: "Union de Viale", V: "Deportivo Tabossi", R: "" }, { L: "Union de Crespo", V: "Sarmiento de Crespo", R: "" }], libre: "Cultural de Crespo" },
        "5": { partidos: [{ L: "Deportivo Tabossi", V: "Atlético Arsenal", R: "" }, { L: "Union de Viale", V: "Union de Crespo", R: "" }, { L: "Cultural de Crespo", V: "Viale Football Club", R: "" }], libre: "Sarmiento de Crespo" },
        "6": { partidos: [{ L: "Union de Viale", V: "Atlético Arsenal", R: "" }, { L: "Union de Crespo", V: "Viale Football Club", R: "" }, { L: "Cultural de Crespo", V: "Sarmiento de Crespo", R: "" }], libre: "Deportivo Tabossi" },
        "7": { partidos: [{ L: "Viale Football Club", V: "Union de Viale", R: "" }, { L: "Atlético Arsenal", V: "Cultural de Crespo", R: "" }, { L: "Sarmiento de Crespo", V: "Deportivo Tabossi", R: "" }], libre: "Union de Crespo" }    
        } 

    };

const resultadosPlayoffs = {};

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