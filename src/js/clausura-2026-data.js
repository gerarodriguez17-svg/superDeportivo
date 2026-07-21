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
    "Segui FC": "public/public/img/escudos/segui.png",
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

// Datos iniciales en blanco para la Fecha 1 del Clausura
const NORTE_DATA = {
    primera: {
        "1": { partidos: [{ L: "Atlético Hernandarias", V: "Deportivo Tuyango", R: "-" }, { L: "J. Unida de Bovril", V: "Independiente FC", R: "-" }, { L: "U. Agrarios Cerrito", V: "Union Alcaraz", R: "-" }], libre: "Deportivo Bovril" }
    },
    sub20: { "1": { partidos: [], libre: "" } },
    sub17: { "1": { partidos: [], libre: "" } }
};

const CENTRO_DATA = {
    primera: { "1": { partidos: [], libre: "" } },
    sub20: { "1": { partidos: [], libre: "" } },
    sub17: { "1": { partidos: [], libre: "" } }
};

const SUR_DATA = {
    primera: { "1": { partidos: [], libre: "" } },
    sub20: { "1": { partidos: [], libre: "" } },
    sub17: { "1": { partidos: [], libre: "" } }
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